import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	ReactNode,
	useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { IUser } from "../../types/user";
import {
	IConversation,
	IMessage,
	setCurrentUserId,
	setConnectionStatus,
	addMessage,
	markConversationAsRead,
	updateConversationMessages,
	removeMessage,
	addConversation,
	setConversations,
} from "@redux/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import chatSocketService from "@services/chatService";

export interface ChatContextType {
	isConnected: boolean;
	currentUserId: string | null;
	userData: IUser | null;
	connectionError: boolean;
	conversations: IConversation[];
	typingUsers: Record<string, boolean>;
	loadingHistory: boolean;
	activeConversationId: string | null;
	activeRecipientId: string | null;
	connectToChat: (userId: string, token?: string) => void;
	disconnectFromChat: () => void;
	sendMessage: (
		conversationId: string,
		recipientId: string,
		content: string
	) => IMessage | null;
	createChat: (
		recipientId: string,
		initialMessage: string
	) => IConversation | null;
	requestConversationHistory: (recipientId: string) => void;
	requestConversations: () => void;
	sendTypingStatus: (
		recipientId: string,
		conversationId: string,
		isTyping: boolean
	) => void;
	deleteMessage: (messageId: string, conversationId: string) => void;
	retryConnection: () => void;
	setActiveConversation: (conversationId: string, recipientId: string) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
	undefined
);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const dispatch = useAppDispatch();
	const { conversations, isConnected, currentUserId } = useAppSelector(
		(state) => state.chat
	);
	const [userData, setUserData] = useState<IUser | null>(null);
	const [token, setToken] = useState<string>("");
	const [connectionError, setConnectionError] = useState(false);
	const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
	const [loadingHistory, setLoadingHistory] = useState(false);
	const [activeConversationId, setActiveConversationId] = useState<
		string | null
	>(null);
	const [activeRecipientId, setActiveRecipientId] = useState<string | null>(
		null
	);

	// Change to Map to better handle message tracking with IDs
	const processedMessageIdsRef = useRef(new Map<string, boolean>());
	const pendingMessagesRef = useRef(new Map<string, IMessage>());

	// Initialize context with user data from AsyncStorage
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const tokenValue = await AsyncStorage.getItem("token");
				const userDataStr = await AsyncStorage.getItem("userData");

				if (userDataStr) {
					const parsedUserData = JSON.parse(userDataStr);
					setUserData(parsedUserData);
					dispatch(setCurrentUserId(parsedUserData.id));
				}

				if (tokenValue) {
					setToken(tokenValue);
				}
			} catch (e) {
				console.log("Error fetching user data:", e);
			}
		};

		fetchUserData();
	}, [dispatch]);

	// Connect to chat service
	const connectToChat = useCallback(
		(userId: string, token = "") => {
			const socket = chatSocketService.connect(userId, token);

			socket.once("connect", () => {
				dispatch(setConnectionStatus(true));
				setConnectionError(false);
				chatSocketService.requestConversations();
			});

			// Check connection status after a delay
			setTimeout(() => {
				const connected = chatSocketService.isConnected();
				dispatch(setConnectionStatus(connected));
				if (!connected) {
					setConnectionError(true);
				}
			}, 3000);

			return socket;
		},
		[dispatch]
	);

	// Set active conversation
	const setActiveConversation = useCallback(
		(conversationId: string, recipientId: string) => {
			setActiveConversationId(conversationId);
			setActiveRecipientId(recipientId);
			dispatch(markConversationAsRead(conversationId));

			// Request history automatically when setting active conversation
			if (recipientId) {
				setLoadingHistory(true);
				chatSocketService.requestConversationHistory(recipientId);
			}
		},
		[dispatch]
	);

	// Handle new messages - FIXED to properly handle both sent and received messages
	const handleNewMessage = useCallback(
		(messageData: IMessage) => {
			const parsedMessage = chatSocketService.parseMessage(messageData);

			if (!parsedMessage) return;

			// Generate a consistent ID for checking duplicates
			const messageId =
				parsedMessage.id ||
				`${parsedMessage.sender_id}-${parsedMessage.timestamp}`;

			console.log("Received message event:", messageId, parsedMessage);

			// If this is a confirmation of our own sent message
			if (parsedMessage.sender_id === currentUserId) {
				// Check if we have a temporary message we should update
				if (pendingMessagesRef.current.has(messageId)) {
					// We've already added this message optimistically, just mark it processed
					processedMessageIdsRef.current.set(messageId, true);
					pendingMessagesRef.current.delete(messageId);
					return;
				}

				// If the message ID starts with 'local-', it might be a temp ID that needs updating
				const matchingTempId = Array.from(
					pendingMessagesRef.current.keys()
				).find((tempId) => {
					const tempMessage = pendingMessagesRef.current.get(tempId);
					return (
						tempMessage &&
						tempMessage.sender_id === parsedMessage.sender_id &&
						tempMessage.message === parsedMessage.message &&
						Math.abs(
							new Date(tempMessage.timestamp).getTime() -
								new Date(parsedMessage.timestamp).getTime()
						) < 10000
					); // Within 10 seconds
				});

				if (matchingTempId) {
					// The server sent back our message with a new ID
					pendingMessagesRef.current.delete(matchingTempId);
					processedMessageIdsRef.current.set(messageId, true);
					console.log(
						"Updated temp message ID:",
						matchingTempId,
						"to",
						messageId
					);

					// Update the message in redux with the new ID
					dispatch(
						removeMessage({
							conversationId: parsedMessage.conversationId || "",
							messageId: matchingTempId,
						})
					);

					dispatch(
						addMessage({
							conversationId: parsedMessage.conversationId || "",
							message: parsedMessage,
						})
					);
					return;
				}
			}

			// Skip if we've already processed this message
			if (processedMessageIdsRef.current.has(messageId)) {
				return;
			}

			// Add to processed set and dispatch to store
			processedMessageIdsRef.current.set(messageId, true);

			console.log("Adding new message to conversation:", messageId);

			dispatch(
				addMessage({
					conversationId: parsedMessage.conversationId || "",
					message: parsedMessage,
				})
			);

			// Mark as read if we're currently viewing this conversation
			if (
				parsedMessage.sender_id !== currentUserId &&
				parsedMessage.conversationId === activeConversationId
			) {
				dispatch(markConversationAsRead(parsedMessage.conversationId || ""));
			}
		},
		[currentUserId, dispatch, activeConversationId]
	);

	// Handle typing indicators
	const handleTypingIndicator = useCallback((data: any) => {
		console.log("Typing indicator received:", data);

		// Handle different possible field names in typing events
		const userId = data.from || data.userId;

		if (data && userId) {
			setTypingUsers((prev) => {
				const newState = { ...prev };
				newState[userId] = !!data.isTyping;
				console.log("Updated typing state:", newState);
				return newState;
			});
		}
	}, []);

	// Handle conversation history
	const handleConversationHistory = useCallback(
		(messages: IMessage[]) => {
			console.log(
				"Received conversation history, messages count:",
				messages.length
			);

			if (messages.length > 0) {
				// Add all message IDs to the processed set
				messages.forEach((msg) => {
					const msgId = msg.id || `${msg.sender_id}-${msg.timestamp}`;
					processedMessageIdsRef.current.set(msgId, true);
				});

				const conversationId = messages[0].conversationId || "";

				// Update conversation with history messages
				dispatch(
					updateConversationMessages({
						conversationId,
						messages,
					})
				);

				// Reset loading state
				setLoadingHistory(false);
			} else {
				// Even with no messages, we still need to reset loading
				setLoadingHistory(false);
			}
		},
		[dispatch]
	);

	// Handle message deletion
	const handleMessageDeletion = useCallback(
		(data: any) => {
			console.log("Message deletion event:", data);

			if (data.chatId && data.messageId) {
				dispatch(
					removeMessage({
						conversationId: data.chatId,
						messageId: data.messageId,
					})
				);

				// Also remove from processed messages
				processedMessageIdsRef.current.delete(data.messageId);
			}
		},
		[dispatch]
	);

	// Handle new conversations
	const handleNewConversation = useCallback(
		(conversation: IConversation) => {
			console.log("New conversation:", conversation);
			dispatch(addConversation(conversation));
		},
		[dispatch]
	);

	// Handle all conversations
	const handleAllConversations = useCallback(
		(allConversations: IConversation[]) => {
			console.log("All conversations received:", allConversations.length);

			// Process any messages in these conversations
			allConversations.forEach((convo) => {
				if (convo.lastMessage) {
					const msgId =
						convo.lastMessage.id ||
						`${convo.lastMessage.sender_id}-${convo.lastMessage.timestamp}`;
					processedMessageIdsRef.current.set(msgId, true);
				}
			});

			dispatch(setConversations(allConversations));
		},
		[dispatch]
	);

	// Handle errors
	const handleErrors = useCallback((error: Error) => {
		console.error("Chat error:", error);
		Alert.alert(
			"Chat Error",
			"There was an issue with the chat service. Please try again."
		);
	}, []);

	// Set up socket event listeners
	useEffect(() => {
		console.log("Setting up socket event listeners");

		// Only set up listeners if we're connected and have an active user
		if (!currentUserId || !chatSocketService.isConnected()) return;

		// Register all handlers
		const messageUnsubscribe =
			chatSocketService.subscribeToMessages(handleNewMessage);

		const typingUnsubscribe = chatSocketService.subscribeToTypingIndicators(
			handleTypingIndicator
		);

		const historyUnsubscribe = chatSocketService.subscribeToConversationHistory(
			handleConversationHistory
		);

		const deleteUnsubscribe = chatSocketService.subscribeToMessageDeletion(
			handleMessageDeletion
		);

		const newConvoUnsubscribe = chatSocketService.subscribeToNewConversations(
			handleNewConversation
		);

		const convoListUnsubscribe = chatSocketService.subscribeToConversations(
			handleAllConversations
		);

		const errorUnsubscribe = chatSocketService.subscribeToErrors(handleErrors);

		// Return cleanup function
		return () => {
			console.log("Cleaning up socket event listeners");
			if (messageUnsubscribe) messageUnsubscribe();
			if (typingUnsubscribe) typingUnsubscribe();
			if (historyUnsubscribe) historyUnsubscribe();
			if (deleteUnsubscribe) deleteUnsubscribe();
			if (newConvoUnsubscribe) newConvoUnsubscribe();
			if (convoListUnsubscribe) convoListUnsubscribe();
			if (errorUnsubscribe) errorUnsubscribe();
		};
	}, [
		currentUserId,
		handleNewMessage,
		handleTypingIndicator,
		handleConversationHistory,
		handleMessageDeletion,
		handleNewConversation,
		handleAllConversations,
		handleErrors,
	]);

	// Auto-connect when we have user data
	useEffect(() => {
		if (userData?.id && !chatSocketService.isConnected()) {
			console.log("Auto-connecting with user ID:", userData.id);
			connectToChat(userData.id, token);
		}

		// Cleanup on unmount
		return () => {
			chatSocketService.disconnect();
		};
	}, [userData, token, connectToChat]);

	const disconnectFromChat = useCallback(() => {
		chatSocketService.disconnect();
		dispatch(setConnectionStatus(false));
	}, [dispatch]);

	const sendMessage = useCallback(
		(conversationId: string, recipientId: string, content: string) => {
			const messageData = chatSocketService.sendMessage(
				conversationId,
				recipientId,
				content
			);

			if (messageData) {
				// Ensure sender_id is a string
				const validatedMessage = {
					...messageData,
					sender_id: messageData.sender_id || currentUserId || "",
					status: "sending", // Add status for UI feedback
				};

				// Generate ID for tracking
				const msgId =
					validatedMessage.id ||
					`${validatedMessage.sender_id}-${validatedMessage.timestamp}`;

				// Store in both maps for tracking
				processedMessageIdsRef.current.set(msgId, true);
				pendingMessagesRef.current.set(msgId, validatedMessage as IMessage);

				// Add message to the store with optimistic update
				dispatch(
					addMessage({
						conversationId,
						message: validatedMessage as IMessage,
					})
				);

				return validatedMessage as IMessage;
			}

			return null;
		},
		[dispatch, currentUserId]
	);

	const createChat = useCallback(
		(recipientId: string, initialMessage: string) => {
			const newConversation = chatSocketService.createChat(
				recipientId,
				initialMessage
			);

			if (newConversation && newConversation.lastMessage) {
				// Track the initial message
				const msgId =
					newConversation.lastMessage.id ||
					`${newConversation.lastMessage.sender_id}-${newConversation.lastMessage.timestamp}`;
				processedMessageIdsRef.current.set(msgId, true);
				pendingMessagesRef.current.set(msgId, newConversation.lastMessage);

				dispatch(addConversation(newConversation));

				// Set this as active conversation
				setActiveConversationId(newConversation.id);
				setActiveRecipientId(recipientId);
			}

			return newConversation;
		},
		[dispatch]
	);

	const requestConversationHistory = useCallback((recipientId: string) => {
		console.log("Requesting conversation history for recipient:", recipientId);
		setLoadingHistory(true);
		chatSocketService.requestConversationHistory(recipientId);
	}, []);

	const requestConversations = useCallback(() => {
		console.log("Requesting all conversations");
		chatSocketService.requestConversations();
	}, []);

	const sendTypingStatus = useCallback(
		(recipientId: string, conversationId: string, isTyping: boolean) => {
			chatSocketService.sendTypingStatus(recipientId, conversationId, isTyping);
		},
		[]
	);

	const deleteMessage = useCallback(
		(messageId: string, conversationId: string) => {
			// Optimistic delete from UI first
			dispatch(
				removeMessage({
					conversationId,
					messageId,
				})
			);

			// Remove from tracking maps
			processedMessageIdsRef.current.delete(messageId);
			pendingMessagesRef.current.delete(messageId);

			// Tell server to delete
			chatSocketService.deleteMessage(messageId, conversationId);
		},
		[dispatch]
	);

	const retryConnection = useCallback(() => {
		if (!userData?.id) return;

		chatSocketService.disconnect();

		setTimeout(() => {
			connectToChat(userData.id, token);
		}, 1000);
	}, [userData, token, connectToChat]);

	const value = {
		isConnected,
		currentUserId,
		userData,
		connectionError,
		conversations,
		typingUsers,
		loadingHistory,
		activeConversationId,
		activeRecipientId,
		connectToChat,
		disconnectFromChat,
		sendMessage,
		createChat,
		requestConversationHistory,
		requestConversations,
		sendTypingStatus,
		deleteMessage,
		retryConnection,
		setActiveConversation,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
