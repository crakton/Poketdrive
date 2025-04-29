import { baseUrl } from "@utils/constant";
import { io, Socket } from "socket.io-client";
import { IMessage, IConversation } from "../redux/features/chatSlice";

class ChatSocketService {
	private socket: Socket | null = null;
	private userId: string | null = null;
	private readonly BASE_URL = baseUrl;
	private typingTimeout: NodeJS.Timeout | null = null;
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 5;

	constructor() {
		this.socket = null;
	}

	connect(userId: string, token: string = "") {
		this.userId = userId;

		// Reset reconnect attempts
		this.reconnectAttempts = 0;
		// Actual url
		const URL = this.BASE_URL.split("/api")[0];
		console.log("Socket server at:", URL);

		// Disconnect existing socket before creating a new one
		if (this.socket && this.socket.connected) {
			this.socket.disconnect();
		}

		// Connect to the actual socket server with the proper URL
		this.socket = io(URL, {
			transports: ["websocket"],
			forceNew: true,
			reconnection: true,
			reconnectionAttempts: this.maxReconnectAttempts,
			reconnectionDelay: 1000,
			auth: {
				token,
			},
		});

		// Add connection event listeners
		this.socket.on("connect", () => {
			console.log("Socket connected:", this.socket?.id);
			// Register the user with the server
			this.socket?.emit("join", { userId: this.userId });
		});

		this.socket.on("connect_error", (error) => {
			console.error("Socket connection error:", error);
			this.reconnectAttempts++;

			if (this.reconnectAttempts >= this.maxReconnectAttempts) {
				console.error("Max reconnection attempts reached");
			}
		});

		this.socket.on("disconnect", (reason) => {
			console.log("Socket disconnected:", reason);
		});

		return this.socket;
	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
		}
	}

	// Send a message to another user
	sendMessage(conversationId: string, recipientId: string, content: string) {
		if (!this.socket || !this.socket.connected) {
			console.warn("Socket not connected. Cannot send message.");
			return null;
		}

		// Generate a temporary ID for local tracking
		const tempId = `local-${Date.now()}`;

		// Structure message data according to the working example
		this.socket.emit("chat:message", {
			from: this.userId,
			to: recipientId,
			message: content,
			chatId: conversationId,
			_id: tempId, // Include ID for tracking
		});

		// Return local representation of the message for optimistic UI updates
		return {
			id: tempId,
			conversationId,
			sender_id: this.userId,
			recipient_id: recipientId,
			message: content,
			timestamp: new Date().toISOString(),
			read: false,
		};
	}

	// Create a new chat with an initial message
	createChat(recipientId: string, initialMessage: string) {
		if (!this.socket || !this.socket.connected || !this.userId) {
			console.warn("Socket not connected. Cannot create chat.");
			return null;
		}

		// Generate consistent chat ID similar to the HTML example
		const chatId = [this.userId, recipientId].sort().join("_");

		// Match the working example's structure
		this.socket.emit("chat:create", {
			participants: [this.userId, recipientId],
			initialMessage: {
				from: this.userId,
				message: initialMessage,
			},
		});

		// Return local representation for optimistic UI updates
		return {
			id: chatId,
			participants: [this.userId, recipientId],
			lastMessage: {
				id: `temp-${Date.now()}`,
				sender_id: this.userId,
				recipient_id: recipientId,
				message: initialMessage,
				timestamp: new Date().toISOString(),
				read: false,
			},
			unreadCount: 0,
			messages: [],
		};
	}

	// Request conversation history
	requestConversationHistory(recipientId: string) {
		if (!this.socket || !this.socket.connected || !this.userId) {
			console.warn("Socket not connected. Cannot request history.");
			return;
		}

		this.socket.emit("chat:history", {
			userId1: this.userId,
			userId2: recipientId,
		});
	}

	// Request all conversations
	requestConversations() {
		if (!this.socket || !this.socket.connected) {
			console.warn("Socket not connected. Cannot request conversations.");
			return;
		}

		// The working example loads chats on connection
		this.socket.emit("get_conversations");
	}

	// Send typing indicator
	sendTypingStatus(
		recipientId: string,
		conversationId: string,
		isTyping: boolean
	) {
		if (!this.socket || !this.socket.connected || !this.userId) {
			return;
		}

		// Clear previous timeout
		if (this.typingTimeout) {
			clearTimeout(this.typingTimeout);
			this.typingTimeout = null;
		}

		this.socket.emit("chat:typing", {
			from: this.userId,
			to: recipientId,
			chatId: conversationId,
			isTyping,
		});

		// Set timeout to automatically send "stopped typing" after delay
		if (isTyping) {
			this.typingTimeout = setTimeout(() => {
				if (this.socket && this.socket.connected) {
					this.socket.emit("chat:typing", {
						from: this.userId,
						to: recipientId,
						chatId: conversationId,
						isTyping: false,
					});
				}
				this.typingTimeout = null;
			}, 800);
		}
	}

	// Delete a message
	deleteMessage(messageId: string, conversationId: string) {
		if (!this.socket || !this.socket.connected) {
			console.warn("Socket not connected. Cannot delete message.");
			return;
		}

		this.socket.emit("chat:delete", {
			messageId,
			chatId: conversationId,
		});
	}

	// Parse a message from socket format to our app format
	parseMessage(messageData: any): IMessage | null {
		try {
			return {
				id: messageData._id || messageData.id || `server-${Date.now()}`,
				conversationId: messageData.conversationId || messageData.chatId,
				sender_id: messageData.from || messageData.sender_id,
				recipient_id: messageData.to || messageData.recipient_id,
				message: messageData.message,
				timestamp:
					messageData.timestamp ||
					messageData.createdAt ||
					new Date().toISOString(),
				read: false,
			};
		} catch (error) {
			console.error("Error parsing message:", error);
			return null;
		}
	}

	// Parse a conversation from socket format to our app format
	parseConversation(convoData: any): IConversation | null {
		try {
			if (!convoData || !convoData.participants) {
				return null;
			}

			const otherParticipant = convoData.participants.find(
				(id: string) => id !== this.userId
			);

			return {
				id: convoData.id || convoData.participants.sort().join("_"),
				participants: convoData.participants,
				lastMessage: convoData.lastMessage
					? this.parseMessage({
							...convoData.lastMessage,
							conversationId:
								convoData.id || convoData.participants.sort().join("_"),
					  })
					: null,
				unreadCount: convoData.unreadCount || 0,
				messages: [],
			};
		} catch (error) {
			console.error("Error parsing conversation:", error);
			return null;
		}
	}

	// Subscribe to new messages with unsubscribe capability
	subscribeToMessages(callback: (message: IMessage) => void) {
		if (!this.socket) return () => {};

		// Function to handle messages from either event
		const handleMessage = (messageData: any) => {
			const parsedMessage = this.parseMessage(messageData);
			if (parsedMessage) callback(parsedMessage);
		};

		// Listen for new messages and message sent confirmations
		this.socket.on("chat:message", handleMessage);
		this.socket.on("chat:message:sent", handleMessage);

		// Return unsubscribe function
		return () => {
			if (this.socket) {
				this.socket.off("chat:message", handleMessage);
				this.socket.off("chat:message:sent", handleMessage);
			}
		};
	}

	// Subscribe to typing indicators with unsubscribe capability
	subscribeToTypingIndicators(callback: (data: any) => void) {
		if (!this.socket) return () => {};

		this.socket.on("chat:typing", callback);

		return () => {
			if (this.socket) {
				this.socket.off("chat:typing", callback);
			}
		};
	}

	// Subscribe to conversation creation with unsubscribe capability
	subscribeToNewConversations(callback: (conversation: IConversation) => void) {
		if (!this.socket) return () => {};

		const handleNewConvo = (convoData: any) => {
			const parsedConvo = this.parseConversation(convoData);
			if (parsedConvo) callback(parsedConvo);
		};

		this.socket.on("chat:create:success", handleNewConvo);
		this.socket.on("chat:new", handleNewConvo);

		return () => {
			if (this.socket) {
				this.socket.off("chat:create:success", handleNewConvo);
				this.socket.off("chat:new", handleNewConvo);
			}
		};
	}

	// Subscribe to all conversations with unsubscribe capability
	subscribeToConversations(callback: (conversations: IConversation[]) => void) {
		if (!this.socket) return () => {};

		const handleConversations = (convosData: any) => {
			const parsedConvos = convosData
				.map((convo: any) => this.parseConversation(convo))
				.filter(Boolean);
			callback(parsedConvos);
		};

		this.socket.on("conversations_updated", handleConversations);

		return () => {
			if (this.socket) {
				this.socket.off("conversations_updated", handleConversations);
			}
		};
	}

	// Subscribe to conversation history with unsubscribe capability
	subscribeToConversationHistory(callback: (history: IMessage[]) => void) {
		if (!this.socket) return () => {};

		const handleHistory = (historyData: any) => {
			const parsedMessages = historyData
				.map((msg: any) => this.parseMessage(msg))
				.filter(Boolean);
			callback(parsedMessages);
		};

		this.socket.on("chat:history", handleHistory);

		return () => {
			if (this.socket) {
				this.socket.off("chat:history", handleHistory);
			}
		};
	}

	// Subscribe to message deletion events with unsubscribe capability
	subscribeToMessageDeletion(callback: (data: any) => void) {
		if (!this.socket) return () => {};

		this.socket.on("chat:delete", callback);

		return () => {
			if (this.socket) {
				this.socket.off("chat:delete", callback);
			}
		};
	}

	// Subscribe to errors with unsubscribe capability
	subscribeToErrors(callback: (error: any) => void) {
		if (!this.socket) return () => {};

		this.socket.on("chat:error", callback);

		return () => {
			if (this.socket) {
				this.socket.off("chat:error", callback);
			}
		};
	}

	// Check if socket is connected
	isConnected() {
		return this.socket?.connected || false;
	}

	// Get the socket instance
	getSocket() {
		return this.socket;
	}
}

export type TChatParams = {
	conversationId: string;
	recipientId: string;
	recipientName: string;
};

const chatSocketService = new ChatSocketService();
export default chatSocketService;
