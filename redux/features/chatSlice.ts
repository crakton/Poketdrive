import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types
export interface IMessage {
	id: string;
	conversationId?: string;
	sender_id: string;
	recipient_id: string;
	message: string;
	timestamp: string;
	read: boolean;
}

export interface IConversation {
	id: string;
	participants: string[];
	lastMessage: IMessage | null;
	unreadCount: number;
	messages: IMessage[];
}

interface ChatState {
	conversations: IConversation[];
	activeConversationId: string | null;
	isConnected: boolean;
	loadingConversations: boolean;
	currentUserId: string | null;
}

// Initial state
const initialState: ChatState = {
	conversations: [],
	activeConversationId: null,
	isConnected: false,
	loadingConversations: false,
	currentUserId: null,
};

// Create slice
const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setCurrentUserId: (state, action: PayloadAction<string>) => {
			state.currentUserId = action.payload;
		},
		setLoadingConversations: (state, action: PayloadAction<boolean>) => {
			state.loadingConversations = action.payload;
		},
		setConversations: (state, action: PayloadAction<IConversation[]>) => {
			state.conversations = action.payload;
		},
		addConversation: (state, action: PayloadAction<IConversation>) => {
			const conversationExists = state.conversations.some(
				(c) => c.id === action.payload.id
			);

			if (!conversationExists) {
				state.conversations.push(action.payload);
			}
		},
		setActiveConversation: (state, action: PayloadAction<string | null>) => {
			state.activeConversationId = action.payload;

			// Mark as read when setting active conversation
			if (action.payload) {
				const conversation = state.conversations.find(
					(c) => c.id === action.payload
				);
				if (conversation) {
					conversation.unreadCount = 0;
				}
			}
		},
		updateConversationMessages: (
			state,
			action: PayloadAction<{ conversationId: string; messages: IMessage[] }>
		) => {
			const { conversationId, messages } = action.payload;
			const conversation = state.conversations.find(
				(c) => c.id === conversationId
			);

			if (conversation) {
				conversation.messages = messages;
				if (messages.length > 0) {
					conversation.lastMessage = messages[messages.length - 1];
				}
			}
		},
		addMessage: (
			state,
			action: PayloadAction<{ conversationId: string; message: IMessage }>
		) => {
			const { conversationId, message } = action.payload;
			const conversation = state.conversations.find(
				(c) => c.id === conversationId
			);

			// If conversation exists
			if (conversation) {
				// Check if message already exists
				const messageExists = conversation.messages.some(
					(m) => m.id === message.id
				);

				if (!messageExists) {
					// Add message
					conversation.messages.push(message);
					conversation.lastMessage = message;

					// Increment unread count if not current user's message and not active conversation
					if (
						message.sender_id !== state.currentUserId &&
						state.activeConversationId !== conversationId
					) {
						conversation.unreadCount += 1;
					}
				}
			} else {
				// Create new conversation if it doesn't exist yet
				// This helps with real-time updates when receiving messages for new conversations
				const otherUserId =
					message.sender_id === state.currentUserId
						? message.recipient_id
						: message.sender_id;

				state.conversations.push({
					id: conversationId,
					participants: [state.currentUserId || "", otherUserId],
					lastMessage: message,
					unreadCount: message.sender_id !== state.currentUserId ? 1 : 0,
					messages: [message],
				});
			}
		},
		markConversationAsRead: (state, action: PayloadAction<string>) => {
			const conversation = state.conversations.find(
				(c) => c.id === action.payload
			);

			if (conversation) {
				conversation.unreadCount = 0;
				conversation.messages.forEach((msg) => {
					if (msg.recipient_id === state.currentUserId) {
						msg.read = true;
					}
				});
			}
		},
		setConnectionStatus: (state, action: PayloadAction<boolean>) => {
			state.isConnected = action.payload;
		},
		removeMessage: (
			state,
			action: PayloadAction<{ conversationId: string; messageId: string }>
		) => {
			const { conversationId, messageId } = action.payload;
			const conversation = state.conversations.find(
				(c) => c.id === conversationId
			);

			if (conversation) {
				// Remove message
				conversation.messages = conversation.messages.filter(
					(msg) => msg.id !== messageId
				);

				// Update last message if needed
				if (conversation.messages.length > 0) {
					conversation.lastMessage =
						conversation.messages[conversation.messages.length - 1];
				} else {
					conversation.lastMessage = null;
				}
			}
		},
	},
});

export const {
	setCurrentUserId,
	setLoadingConversations,
	setConversations,
	addConversation,
	setActiveConversation,
	addMessage,
	updateConversationMessages,
	markConversationAsRead,
	setConnectionStatus,
	removeMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
