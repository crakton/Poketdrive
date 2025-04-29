import React, { useState, useEffect, useRef, useCallback } from "react";
import {
	FlatList,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

import { useUserService } from "@hooks/useUserService";
import { useAppDispatch } from "@redux/store";
import { IMessage } from "@redux/features/chatSlice";
import { ChatHeader } from "@components/Chat/ChatHeader";
import { EmptyChat } from "@components/Chat/EmptyChat";
import MessageBubble from "@components/Chat/MessageBubble";
import ChatInput from "@components/Chat/ChatInput";
import PageLoader from "@components/ui/PageLoader";
import { useChat } from "@hooks/useChat";

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

	// Get chat context
	const {
		conversations,
		isConnected,
		currentUserId,
		sendMessage: contextSendMessage,
		createChat: contextCreateChat,
		deleteMessage: contextDeleteMessage,
		sendTypingStatus: contextSendTypingStatus,
		typingUsers,
		loadingHistory,
		setActiveConversation,
	} = useChat();

	const conversation = conversations.find((c) => c.id === conversationId);
	const [newMessage, setNewMessage] = useState("");
	const [offlineMode, setOfflineMode] = useState(!isConnected);
	const [initializing, setInitializing] = useState(false);
	// Track if a message was just sent to prevent duplicates
	const [justSentMessage, setJustSentMessage] = useState(false);
	const flatListRef = useRef<FlatList<IMessage>>(null);

	// Fetch user data for displaying in chat
	const { useGetUser } = useUserService();
	const { data: recipientData } = useGetUser(recipientId);

	// Check if this specific user is typing (robust check with logging)
	const isTyping =
		typingUsers && recipientId ? !!typingUsers[recipientId] : false;

	// Debug logging for typing
	useEffect(() => {
		console.log(`Is ${recipientId} typing? ${isTyping}`, typingUsers);
	}, [recipientId, isTyping, typingUsers]);

	// Set active conversation when entering the screen
	useEffect(() => {
		if (conversationId && recipientId) {
			setActiveConversation(conversationId, recipientId);
		}
	}, [conversationId, recipientId, setActiveConversation]);

	// Update offline mode when connection status changes
	useEffect(() => {
		setOfflineMode(!isConnected);
	}, [isConnected]);

	// Cleanup typing status when leaving
	useEffect(() => {
		return () => {
			// Send "stopped typing" indicator when leaving
			if (isConnected && recipientId && conversationId) {
				contextSendTypingStatus(recipientId, conversationId, false);
			}
		};
	}, [isConnected, recipientId, conversationId, contextSendTypingStatus]);

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
	}, [
		navigation,
		recipientId,
		recipientName,
		isTyping,
		isConnected,
		recipientPhoneNumber,
	]);

	// Send a message
	const handleSendMessage = useCallback(() => {
		if (newMessage.trim() === "" || !currentUserId || justSentMessage) return;

		// Set flag to prevent duplicate sends
		setJustSentMessage(true);

		try {
			// Check if this is a new conversation that needs to be created first
			const conversationExists = conversations.some(
				(c) => c.id === conversationId
			);

			if (!conversationExists && !initializing) {
				setInitializing(true);

				// Create the chat first
				const newConversation = contextCreateChat(
					recipientId,
					newMessage.trim()
				);

				if (newConversation) {
					// Clear message input
					setNewMessage("");
					setInitializing(false);
				}
			} else {
				// Send message in existing conversation
				const messageData = contextSendMessage(
					conversationId,
					recipientId,
					newMessage.trim()
				);

				if (messageData) {
					setNewMessage("");
				}
			}
		} catch (error) {
			console.error("Error sending message:", error);
		} finally {
			// Reset flag after a delay
			setTimeout(() => setJustSentMessage(false), 500);
		}
	}, [
		newMessage,
		currentUserId,
		conversationId,
		recipientId,
		conversations,
		initializing,
		contextSendMessage,
		contextCreateChat,
		justSentMessage,
	]);

	// Delete a message
	const handleDelete = useCallback(
		(messageId: string) => {
			contextDeleteMessage(messageId, conversationId);
		},
		[contextDeleteMessage, conversationId]
	);

	// Handle typing indicator
	const handleInputChange = useCallback(
		(text: string) => {
			setNewMessage(text);

			// Send typing indicator
			if (isConnected && recipientId && conversationId) {
				contextSendTypingStatus(recipientId, conversationId, text.length > 0);
			}
		},
		[isConnected, recipientId, conversationId, contextSendTypingStatus]
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

	if (loadingHistory && !conversation?.messages?.length) {
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
					onSend={handleSendMessage}
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
