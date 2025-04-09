import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

class ChatSocketService {
	private socket: Socket | null = null;
	private userId: string | null = null;

	constructor() {
		this.socket = null;
	}

	connect(userId: string, serverUrl: string) {
		this.userId = userId;
		this.socket = io(serverUrl, {
			query: { userId },
			transports: ["websocket"],
		});

		return this.socket;
	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
		}
	}

	sendMessage(conversationId: string, recipientId: string, message: string) {
		if (!this.socket) return;

		const messageData = {
			conversationId,
			sender_id: this.userId,
			recipient_id: recipientId,
			message,
			timestamp: new Date().toISOString(),
		};

		this.socket.emit("send_message", messageData);
		return messageData;
	}

	subscribeToMessages(callback: (message: any) => void) {
		if (!this.socket) return;

		this.socket.on("receive_message", (message) => {
			callback(message);
		});
	}

	subscribeToConversations(callback: (conversations: any) => void) {
		if (!this.socket) return;

		this.socket.on("conversations_updated", (conversations) => {
			callback(conversations);
		});
	}

	getSocket() {
		return this.socket;
	}
}

const chatSocketService = new ChatSocketService();
export default chatSocketService;
