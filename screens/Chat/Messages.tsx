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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
	addMessage,
	IMessage,
	markConversationAsRead,
} from "../../redux/features/chatSlice";
import chatSocketService from "../../services/chatService";

const MessageScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const { conversationId, recipientId, recipientName } = route.params as any;

	const conversations = useAppSelector((state) => state.chat.conversations);
	const conversation = conversations.find((c) => c.id === conversationId);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(!conversation);
	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		// Mark conversation as read when screen opens
		dispatch(markConversationAsRead(conversationId));

		// Set up header
		navigation.setOptions({
			headerTitle: () => (
				<View style={tw`flex-row items-center`}>
					<Image
						source={{
							uri: `https://randomuser.me/api/portraits/men/${
								parseInt(recipientId.replace("user", "")) + 30
							}.jpg`,
						}}
						style={tw`w-8 h-8 rounded-full mr-2`}
					/>
					<Text style={tw`font-bold`}>{recipientName}</Text>
				</View>
			),
		});

		// Subscribe to new messages
		const socket = chatSocketService.getSocket();
		if (socket) {
			socket.on("receive_message", (message) => {
				if (message.conversationId === conversationId) {
					dispatch(addMessage({ conversationId, message }));
					dispatch(markConversationAsRead(conversationId));
				}
			});

			if (!conversation) {
				socket.emit("get_conversation", { conversationId });
				socket.once("conversation_data", () => {
					setLoading(false);
				});
			}
		}

		return () => {
			if (socket) {
				socket.off("receive_message");
			}
		};
	}, [conversationId, dispatch]);

	useEffect(() => {
		// Scroll to bottom when messages change
		if (flatListRef.current && conversation?.messages.length) {
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true });
			}, 100);
		}
	}, [conversation?.messages.length]);

	const sendMessage = () => {
		if (newMessage.trim() === "") return;

		const messageData = chatSocketService.sendMessage(
			conversationId,
			recipientId,
			newMessage.trim()
		);
		if (messageData) {
			const formattedMessage = {
				id: `temp-${Date.now()}`,
				...messageData,
				read: false,
			};

			dispatch(
				addMessage({ conversationId, message: formattedMessage as IMessage })
			);
			setNewMessage("");
		}
	};

	if (loading) {
		return (
			<SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
				<ActivityIndicator size="large" color="#F05A22" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<KeyboardAvoidingView
				style={tw`flex-1`}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				<FlatList
					data={conversation?.messages || []}
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
							placeholder="Type a message..."
							value={newMessage}
							onChangeText={setNewMessage}
							multiline
							numberOfLines={4}
						/>

						<TouchableOpacity
							style={tw`ml-2 ${
								newMessage.trim() ? "opacity-100" : "opacity-50"
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
