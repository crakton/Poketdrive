import { io, Socket } from "socket.io-client";

class ChatSocketService {
	private socket: Socket | null = null;
	private userId: string | null = null;
	private readonly BASE_URL = "https://urideserver-fgfm.onrender.com/api/v1";

	constructor() {
		this.socket = null;
	}

	connect(userId: string, token: string = "") {
		this.userId = userId;

		// Connect to the actual socket server with the proper URL and query parameters
		this.socket = io(`${this.BASE_URL}/socket.io`, {
			query: {
				EIO: 4,
				transport: "websocket",
			},
			transports: ["websocket"],
			forceNew: true,
			reconnection: true,
			reconnectionAttempts: 5,
			auth: {
				token,
			},
		});

		// Add connection event listeners
		this.socket.on("connect", () => {
			console.log("Socket connected:", this.socket?.id);
		});

		this.socket.on("connect_error", (error) => {
			console.error("Socket connection error:", error);
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

	sendMessage(conversationId: string, receiverId: string, content: string) {
		if (!this.socket || !this.socket.connected) {
			console.warn("Socket not connected. Cannot send message.");
			return null;
		}

		// Match the format shown in your Postman screenshot
		const messageData = {
			event: "send_message",
			data: {
				receiverId,
				content,
			},
		};

		// Emit the message event
		this.socket.emit("send_message", messageData);

		// Return local representation of the message for optimistic UI updates
		return {
			id: `local-${Date.now()}`,
			conversationId,
			sender_id: this.userId,
			recipient_id: receiverId,
			message: content,
			timestamp: new Date().toISOString(),
		};
	}

	subscribeToMessages(callback: (message: any) => void) {
		if (!this.socket) return;

		// Listen for new messages
		this.socket.on("receive_message", (message) => {
			console.log("Received message:", message);
			callback(message);
		});
	}

	subscribeToConversations(callback: (conversations: any) => void) {
		if (!this.socket) return;

		// Listen for conversation updates
		this.socket.on("conversations_updated", (conversations) => {
			console.log("Conversations updated:", conversations);
			callback(conversations);
		});

		// You might also need to listen for individual conversation updates
		this.socket.on("conversation_updated", (conversation) => {
			console.log("Conversation updated:", conversation);
			// You'll need to handle this based on your state management approach
		});
	}

	// Method to request conversations from the server
	requestConversations() {
		if (!this.socket || !this.socket.connected) {
			console.warn("Socket not connected. Cannot request conversations.");
			return;
		}

		this.socket.emit("get_conversations");
	}

	// Method to get a specific conversation
	requestConversation(conversationId: string) {
		if (!this.socket || !this.socket.connected) {
			console.warn("Socket not connected. Cannot request conversation.");
			return;
		}

		this.socket.emit("get_conversation", { conversationId });
	}

	getSocket() {
		return this.socket;
	}

	isConnected() {
		return this.socket?.connected || false;
	}
}

export type TChatParams = {
	conversationId: string;
	recipientId: string;
	recipientName: string;
};

const chatSocketService = new ChatSocketService();
export default chatSocketService;
