import React, { useState, useEffect, useRef } from "react";
import {
	FlatList,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Image,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
	addMessage,
	IMessage,
	markConversationAsRead,
	setConnectionStatus,
} from "../../redux/features/chatSlice";
import chatSocketService, { TChatParams } from "../../services/chatService";

const MessageScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	// Add default values to prevent undefined errors
	const params = (route.params as TChatParams) || ({} as TChatParams);
	const conversationId = params.conversationId || "";
	const recipientId = params.recipientId || "";
	const recipientName = params.recipientName || "User";

	const { conversations, isConnected } = useAppSelector((state) => state.chat);
	const conversation = conversations.find((c) => c.id === conversationId);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(!conversation);
	const [offlineMode, setOfflineMode] = useState(false);
	const flatListRef = useRef<FlatList>(null);

	// Check socket connection at start
	useEffect(() => {
		const socket = chatSocketService.getSocket();
		const isSocketConnected = socket?.connected || false;

		if (!isSocketConnected) {
			// Try to connect if not already connected
			try {
				chatSocketService.connect("user1", "");
				setTimeout(() => {
					const reconnected = chatSocketService.isConnected();
					dispatch(setConnectionStatus(reconnected));
					if (!reconnected) {
						setOfflineMode(true);
						setLoading(false);
						Alert.alert(
							"Connection Issue",
							"Unable to connect to the chat server. Some features may be limited.",
							[{ text: "OK" }]
						);
					}
				}, 2000); // Give it some time to connect
			} catch (error) {
				console.error("Failed to connect to socket:", error);
				setOfflineMode(true);
				setLoading(false);
			}
		} else {
			dispatch(setConnectionStatus(true));
		}
	}, [dispatch]);

	useEffect(() => {
		if (!conversationId) {
			setLoading(false);
			return;
		}

		// Mark conversation as read when screen opens
		dispatch(markConversationAsRead(conversationId));

		// Set up header
		navigation.setOptions({
			headerTitle: () => (
				<View style={tw`flex-row items-center`}>
					<Image
						source={{
							uri: recipientId
								? `https://randomuser.me/api/portraits/men/${
										parseInt(recipientId.replace("user", "") || "0") + 30
								  }.jpg`
								: "https://randomuser.me/api/portraits/men/30.jpg",
						}}
						style={tw`w-8 h-8 rounded-full mr-2`}
					/>
					<Text style={tw`font-bold`}>{recipientName}</Text>
					{!isConnected && (
						<View style={tw`ml-2 px-2 py-1 bg-yellow-100 rounded`}>
							<Text style={tw`text-xs text-yellow-800`}>Offline</Text>
						</View>
					)}
				</View>
			),
		});

		// Subscribe to new messages
		const socket = chatSocketService.getSocket();
		if (socket && socket.connected) {
			socket.on("receive_message", (messageData) => {
				const { data } = messageData;
				if (data && data.conversationId === conversationId) {
					// Transform to match your local message structure if needed
					const message = {
						id: data.id || `server-${Date.now()}`,
						conversationId: data.conversationId,
						sender_id: data.senderId,
						recipient_id: data.recipientId,
						message: data.content,
						timestamp: data.timestamp || new Date().toISOString(),
						read: false,
					};

					dispatch(addMessage({ conversationId, message }));
					dispatch(markConversationAsRead(conversationId));
				}
			});

			if (!conversation && !offlineMode) {
				chatSocketService.requestConversation(conversationId);

				socket.once("conversation_data", () => {
					setLoading(false);
				});

				// Fallback in case we don't get conversation data
				setTimeout(() => {
					setLoading(false);
				}, 3000);
			} else {
				setLoading(false);
			}
		} else {
			// If no socket connection, still show the UI with what we have
			setLoading(false);
		}

		return () => {
			if (socket) {
				socket.off("receive_message");
			}
		};
	}, [conversationId, dispatch, isConnected, offlineMode]);

	useEffect(() => {
		// Scroll to bottom when messages change
		if (flatListRef.current && conversation?.messages?.length) {
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true });
			}, 100);
		}
	}, [conversation?.messages?.length]);

	const sendMessage = () => {
		if (newMessage.trim() === "" || !conversationId || !recipientId) return;

		if (!isConnected) {
			Alert.alert(
				"Offline Mode",
				"You're currently offline. Messages will be sent when connection is restored.",
				[{ text: "OK" }]
			);
			// You could store messages locally to send later
			// This is simplified for now
			setNewMessage("");
			return;
		}

		const messageData = chatSocketService.sendMessage(
			conversationId,
			recipientId,
			newMessage.trim()
		);

		if (messageData) {
			const formattedMessage = {
				...messageData,
				id: `temp-${Date.now()}`,
				read: false,
				message: messageData.message, // Make sure this matches your IMessage type
			};

			dispatch(
				addMessage({ conversationId, message: formattedMessage as IMessage })
			);
			setNewMessage("");
		}
	};

	// Show a meaningful message if we don't have proper conversation parameters
	if (!conversationId || !recipientId) {
		return (
			<SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
				<Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
				<Text style={tw`text-gray-500 mt-4 text-center`}>
					No conversation selected
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
			<SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
				<ActivityIndicator size="large" color="#F05A22" />
			</SafeAreaView>
		);
	}

	// Placeholder messages when no conversation data available
	const messages = conversation?.messages || [];
	const emptyMessageView = (
		<View style={tw`flex-1 justify-center items-center p-4`}>
			<Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
			<Text style={tw`text-gray-500 mt-4 text-center`}>
				{offlineMode
					? "You're offline. Connect to see messages."
					: "No messages yet. Start the conversation!"}
			</Text>
		</View>
	);

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<KeyboardAvoidingView
				style={tw`flex-1`}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				{messages.length === 0 ? (
					emptyMessageView
				) : (
					<FlatList
						data={messages}
						keyExtractor={(item, index) => item.id || `msg-${index}`}
						ref={flatListRef}
						contentContainerStyle={tw`flex-grow p-2`}
						renderItem={({ item }) => {
							const isCurrentUser = item.sender_id === "user1"; // Adjust based on your auth
							return (
								<View
									style={[
										tw`my-1 mx-2 p-3 rounded-xl max-w-[80%]`,
										isCurrentUser
											? tw`bg-orange-100 self-end`
											: tw`bg-gray-100 self-start`,
									]}
								>
									<Text style={tw`text-base`}>{item.message}</Text>
									<Text style={tw`text-xs text-gray-500 mt-1 text-right`}>
										{new Date(item.timestamp).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
										{isCurrentUser && (
											<Ionicons
												name={item.read ? "checkmark-done" : "checkmark"}
												size={12}
												color={item.read ? "#4CAF50" : "#999"}
												style={tw`ml-1`}
											/>
										)}
									</Text>
								</View>
							);
						}}
					/>
				)}

				<View
					style={tw`flex-row items-center border-t border-gray-200 py-2 px-4 bg-white`}
				>
					<TouchableOpacity style={tw`mr-2`}>
						<Ionicons name="happy-outline" size={24} color="#666" />
					</TouchableOpacity>

					<View
						style={tw`flex-row items-center flex-1 bg-gray-100 rounded-full px-3`}
					>
						<TouchableOpacity style={tw`mr-2`}>
							<Ionicons name="camera-outline" size={24} color="#666" />
						</TouchableOpacity>

						<TextInput
							style={tw`flex-1 py-2`}
							placeholder={
								offlineMode
									? "Offline mode - messages will be queued"
									: "Type a message..."
							}
							value={newMessage}
							onChangeText={setNewMessage}
							multiline
							numberOfLines={4}
						/>

						<TouchableOpacity
							style={tw`ml-2 ${
								newMessage.trim() && (!offlineMode || isConnected)
									? "opacity-100"
									: "opacity-50"
							}`}
							onPress={sendMessage}
							disabled={!newMessage.trim()}
						>
							<Ionicons
								name="send"
								size={24}
								color="#F05A22"
								style={{ transform: [{ rotate: "-45deg" }] }}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default MessageScreen;
