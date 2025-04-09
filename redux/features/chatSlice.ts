import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types
export interface IMessage {
	id: string;
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

// Initial state
const initialState = {
	conversations: [] as IConversation[],
	activeConversationId: null as string | null,
	isConnected: false,
};

// Create slice
const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setConversations: (state, action: PayloadAction<IConversation[]>) => {
			state.conversations = action.payload;
		},
		addConversation: (state, action: PayloadAction<IConversation>) => {
			state.conversations.push(action.payload);
		},
		setActiveConversation: (state, action: PayloadAction<string | null>) => {
			state.activeConversationId = action.payload;
		},
		addMessage: (
			state,
			action: PayloadAction<{ conversationId: string; message: IMessage }>
		) => {
			const { conversationId, message } = action.payload;
			const conversation = state.conversations.find(
				(c) => c.id === conversationId
			);
			if (conversation) {
				conversation.messages.push(message);
				conversation.lastMessage = message;

				// If not the active conversation, increment unread count
				if (state.activeConversationId !== conversationId) {
					conversation.unreadCount += 1;
				}
			}
		},
		markConversationAsRead: (state, action: PayloadAction<string>) => {
			const conversation = state.conversations.find(
				(c) => c.id === action.payload
			);
			if (conversation) {
				conversation.unreadCount = 0;
				conversation.messages.forEach((msg) => {
					if (msg.recipient_id === "currentUserId") {
						// Replace with actual current user ID
						msg.read = true;
					}
				});
			}
		},
		setConnectionStatus: (state, action: PayloadAction<boolean>) => {
			state.isConnected = action.payload;
		},
	},
});

export const {
	setConversations,
	addConversation,
	setActiveConversation,
	addMessage,
	markConversationAsRead,
	setConnectionStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
