import React, { useState, useEffect, useRef, useCallback } from "react";
import {
	FlatList,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Alert,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

import { useUserService } from "@hooks/useUserService";
import { useAppDispatch, useAppSelector } from "@redux/store";
import chatSocketService from "@services/chatService";
import {
	addConversation,
	addMessage,
	IMessage,
	markConversationAsRead,
	removeMessage,
	setConnectionStatus,
	updateConversationMessages,
} from "@redux/features/chatSlice";
import { ChatHeader } from "@components/Chat/ChatHeader";
import { EmptyChat } from "@components/Chat/EmptyChat";
import MessageBubble from "@components/Chat/MessageBubble";
import ChatInput from "@components/Chat/ChatInput";
import PageLoader from "@components/ui/PageLoader";

const MessageScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	// Add default values to prevent undefined errors
	const params = route.params as {
		conversationId?: string;
		recipientId?: string;
		recipientName?: string;
		recipientPhoneNumber?: string;
	};
	const conversationId = params.conversationId || "";
	const recipientId = params.recipientId || "";
	const recipientName = params.recipientName || "User";
	const recipientPhoneNumber = params.recipientPhoneNumber || "";

	const { conversations, isConnected, currentUserId } = useAppSelector(
		(state) => state.chat
	);

	const conversation = conversations.find((c) => c.id === conversationId);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(!conversation);
	const [offlineMode, setOfflineMode] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [initializing, setInitializing] = useState(false);
	const [incomingMessageTrigger, setIncomingMessageTrigger] = useState(0);
	// Track if a message was just sent to prevent duplicates
	const [justSentMessage, setJustSentMessage] = useState(false);
	const flatListRef = useRef<FlatList<IMessage>>(null);

	// Keep track of message IDs that are already processed to prevent duplicates
	const processedMessageIdsRef = useRef(new Set());

	// Fetch user data for displaying in chat
	const { useGetUser } = useUserService();
	const { data: recipientData } = useGetUser(recipientId);

	// 1. Socket connection setup
	useEffect(() => {
		if (!currentUserId) return;

		let isMounted = true;

		// Check if socket is connected, connect if not
		const socket = chatSocketService.getSocket();
		if (!socket || !socket.connected) {
			try {
				chatSocketService.connect(currentUserId);
				setTimeout(() => {
					if (!isMounted) return;

					const reconnected = chatSocketService.isConnected();
					dispatch(setConnectionStatus(reconnected));
					if (!reconnected) {
						setOfflineMode(true);
						Alert.alert(
							"Connection Issue",
							"Unable to connect to the chat server. Some features may be limited."
						);
					}
				}, 1000);
			} catch (error) {
				console.error("Failed to connect to socket:", error);
				setOfflineMode(true);
			}
		} else {
			dispatch(setConnectionStatus(true));
		}

		return () => {
			isMounted = false;
		};
	}, [currentUserId, dispatch]);

	// 2. Conversation initialization
	useEffect(() => {
		if (!currentUserId || !conversationId || !recipientId) return;

		// Mark conversation as read when opening the screen
		dispatch(markConversationAsRead(conversationId));

		// Request conversation history for this recipient
		chatSocketService.requestConversationHistory(recipientId);

		// Clear processed message IDs when conversation changes
		processedMessageIdsRef.current = new Set();

		// Set initial loading state
		setLoading(true);

		// Fallback timer to prevent indefinite loading
		const loadingTimer = setTimeout(() => {
			setLoading(false);
		}, 3000);

		return () => {
			clearTimeout(loadingTimer);
		};
	}, [currentUserId, conversationId, recipientId, dispatch]);

	// 3. Typing indicator cleanup
	useEffect(() => {
		return () => {
			// Send "stopped typing" indicator when leaving
			if (isConnected && recipientId && conversationId) {
				chatSocketService.sendTypingStatus(recipientId, conversationId, false);
			}
		};
	}, [isConnected, recipientId, conversationId]);

	// 4. New messages subscription
	useEffect(() => {
		const messageHandler = (messageData: IMessage) => {
			// Parse message from socket format
			const parsedMessage = chatSocketService.parseMessage(messageData);

			if (!parsedMessage) return;

			// Generate a consistent ID for checking duplicates
			const messageId =
				parsedMessage.id ||
				`${parsedMessage.sender_id}-${parsedMessage.timestamp}`;

			// Skip if we've already processed this message
			if (processedMessageIdsRef.current.has(messageId)) {
				return;
			}

			// IMPORTANT: For sent messages, make sure we're not duplicating
			// what we've already added optimistically
			if (parsedMessage.sender_id === currentUserId) {
				// This is our own message coming back from the server
				// Just mark it as processed but don't add it again
				processedMessageIdsRef.current.add(messageId);
				return;
			}

			// Add to processed set
			processedMessageIdsRef.current.add(messageId);

			if (
				parsedMessage &&
				(parsedMessage.conversationId === conversationId ||
					parsedMessage.sender_id === recipientId ||
					parsedMessage.recipient_id === recipientId)
			) {
				dispatch(
					addMessage({
						conversationId: parsedMessage.conversationId || conversationId,
						message: parsedMessage,
					})
				);

				// Force the component to update for incoming messages
				setIncomingMessageTrigger((prev) => prev + 1);

				// Mark as read if it's a new message from the other person
				if (parsedMessage.sender_id === recipientId) {
					dispatch(markConversationAsRead(conversationId));
				}
			}
		};

		// Register message handler
		const messageUnsubscribe =
			chatSocketService.subscribeToMessages(messageHandler);

		return () => {
			if (messageUnsubscribe) messageUnsubscribe();
		};
	}, [conversationId, dispatch, recipientId, currentUserId]);

	// 5. Typing indicators subscription
	useEffect(() => {
		const typingHandler = (data: any) => {
			console.log("Typing indicator received:", data); // Debugging

			// Use a more robust check for the typing data
			if (data && data.chatId === conversationId && data.from === recipientId) {
				// Force immediate update for the typing indicator
				setTimeout(() => {
					setIsTyping(!!data.isTyping);
				}, 0);
			}
		};

		// Register typing handler
		const typingUnsubscribe =
			chatSocketService.subscribeToTypingIndicators(typingHandler);

		return () => {
			if (typingUnsubscribe) typingUnsubscribe();
		};
	}, [conversationId, recipientId]);
	// 6. Message deletion subscription
	useEffect(() => {
		const deleteHandler = (data: any) => {
			if (data.chatId === conversationId && data.messageId) {
				dispatch(
					removeMessage({
						conversationId,
						messageId: data.messageId,
					})
				);
			}
		};

		// Register delete handler
		const deleteUnsubscribe =
			chatSocketService.subscribeToMessageDeletion(deleteHandler);

		return () => {
			if (deleteUnsubscribe) deleteUnsubscribe();
		};
	}, [conversationId, dispatch]);

	// 7. Conversation history subscription
	useEffect(() => {
		const historyHandler = (messages: IMessage[]) => {
			if (messages.length > 0) {
				// Add all message IDs to the processed set
				messages.forEach((msg) => {
					const msgId = msg.id || `${msg.sender_id}-${msg.timestamp}`;
					processedMessageIdsRef.current.add(msgId);
				});

				// Update conversation with history messages
				dispatch(
					updateConversationMessages({
						conversationId,
						messages,
					})
				);
			}
			setLoading(false);
		};

		// Register history handler
		const historyUnsubscribe =
			chatSocketService.subscribeToConversationHistory(historyHandler);

		return () => {
			if (historyUnsubscribe) historyUnsubscribe();
		};
	}, [conversationId, dispatch]);

	// 8. Error handling subscription
	useEffect(() => {
		const errorHandler = (error: Error) => {
			console.error("Chat error:", error);
			Alert.alert(
				"Chat Error",
				"There was an issue with the chat service. Please try again."
			);
		};

		// Register error handler
		const errorUnsubscribe = chatSocketService.subscribeToErrors(errorHandler);

		return () => {
			if (errorUnsubscribe) errorUnsubscribe();
		};
	}, []);
	// Scroll to bottom when messages change
	useEffect(() => {
		if (flatListRef.current && conversation?.messages?.length) {
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true });
			}, 100);
		}
	}, [conversation?.messages?.length]);

	// Set header with user info
	useEffect(() => {
		navigation.setOptions({
			header: () => (
				<ChatHeader
					phoneNumber={recipientPhoneNumber}
					recipientName={recipientName}
					recipientId={recipientId}
					isOnline={isConnected}
					isTyping={isTyping}
					navigation={navigation}
				/>
			),
		});
	}, [navigation, recipientId, recipientName, isTyping, isConnected]);

	// Send a message
	const sendMessage = useCallback(() => {
		if (newMessage.trim() === "" || !currentUserId || justSentMessage) return;

		// Set flag to prevent duplicate sends
		setJustSentMessage(true);

		if (!isConnected) {
			Alert.alert(
				"Offline Mode",
				"You're currently offline. Messages will be sent when connection is restored."
			);
			setNewMessage("");
			// Reset flag after a short delay
			setTimeout(() => setJustSentMessage(false), 500);
			return;
		}

		// Check if this is a new conversation that needs to be created first
		const conversationExists = conversations.some(
			(c) => c.id === conversationId
		);

		if (!conversationExists && !initializing) {
			setInitializing(true);

			// Create the chat first
			const newConversation = chatSocketService.createChat(
				recipientId,
				newMessage.trim()
			);

			if (newConversation) {
				// Add conversation to store
				dispatch(addConversation(newConversation));

				// Clear message input
				setNewMessage("");
				setInitializing(false);

				// Reset flag after a delay
				setTimeout(() => setJustSentMessage(false), 500);
			}
		} else {
			// Normal message in existing conversation
			const messageData = chatSocketService.sendMessage(
				conversationId,
				recipientId,
				newMessage.trim()
			);

			if (messageData) {
				// Generate ID for tracking
				const msgId =
					messageData.id || `${messageData.sender_id}-${messageData.timestamp}`;
				processedMessageIdsRef.current.add(msgId);

				// Add message to the store with optimistic update
				dispatch(
					addMessage({
						conversationId,
						message: messageData as IMessage,
					})
				);
				setNewMessage("");

				// Reset flag after a delay
				setTimeout(() => setJustSentMessage(false), 500);
			}
		}
	}, [
		newMessage,
		currentUserId,
		isConnected,
		conversationId,
		recipientId,
		conversations,
		initializing,
		dispatch,
		justSentMessage,
	]);

	// Delete a message
	const handleDelete = useCallback(
		(messageId: string) => {
			if (!isConnected) {
				Alert.alert("Error", "Cannot delete messages while offline");
				return;
			}

			chatSocketService.deleteMessage(messageId, conversationId);
		},
		[isConnected, conversationId]
	);

	// Handle typing indicator
	const handleInputChange = useCallback(
		(text: string) => {
			setNewMessage(text);

			// Send typing indicator
			if (isConnected && recipientId && conversationId) {
				chatSocketService.sendTypingStatus(
					recipientId,
					conversationId,
					text.length > 0
				);
			}
		},
		[isConnected, recipientId, conversationId]
	);

	// Show a meaningful message if we don't have proper conversation parameters
	if (!recipientId) {
		return (
			<SafeAreaView style={tw`flex-1 justify-center items-center bg-gray-100`}>
				<Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
				<Text style={tw`text-gray-500 mt-4 text-center`}>
					No recipient selected
				</Text>
				<TouchableOpacity
					style={tw`mt-4 bg-orange-500 px-6 py-3 rounded-full`}
					onPress={() => navigation.goBack()}
				>
					<Text style={tw`text-white font-bold`}>Go back</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	if (loading) {
		return (
			<SafeAreaView style={tw`flex-1 justify-center items-center bg-gray-100`}>
				<PageLoader />
			</SafeAreaView>
		);
	}

	// Messages to display
	const messages = conversation?.messages || [];

	return (
		<SafeAreaView style={tw`flex-1 bg-gray-100`}>
			<KeyboardAvoidingView
				style={tw`flex-1`}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				<ChatHeader
					phoneNumber={recipientData?.phoneNumber}
					isOnline={isConnected}
					isTyping={isTyping}
					recipientName={recipientName}
					recipientId={recipientId}
					navigation={navigation}
				/>
				{messages.length === 0 ? (
					<EmptyChat offlineMode={offlineMode} />
				) : (
					<FlatList
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
						data={messages}
						keyExtractor={(item, index) => item.id || `msg-${index}`}
						ref={flatListRef}
						contentContainerStyle={tw`flex-grow p-2`}
						renderItem={({ item }) => (
							<MessageBubble
								message={item}
								isCurrentUser={item.sender_id === currentUserId}
								onDelete={handleDelete}
							/>
						)}
					/>
				)}

				<ChatInput
					value={newMessage}
					onChangeText={handleInputChange}
					onSend={sendMessage}
					disabled={initializing}
					initializing={initializing}
					offlineMode={offlineMode}
					isConnected={isConnected}
					isTyping={isTyping}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default MessageScreen;
