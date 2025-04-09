// screens/ChatListScreen.tsx
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import chatSocketService from "../../services/chatService";
import {
	markConversationAsRead,
	setActiveConversation,
	setConnectionStatus,
	setConversations,
} from "../../redux/features/chatSlice";

const ChatListScreen = () => {
	const navigation = useNavigation<NavigationProp<any>>();
	const dispatch = useAppDispatch();
	const { conversations, isConnected } = useAppSelector((state) => state.chat);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Connect to socket with user ID (use actual user ID from auth state)
		const socket = chatSocketService.connect(
			"user1",
			"YOUR_SOCKET_IO_ENDPOINT"
		);

		// Listen for connection events
		socket.on("connect", () => {
			dispatch(setConnectionStatus(true));
		});

		socket.on("disconnect", () => {
			dispatch(setConnectionStatus(false));
		});

		// Subscribe to conversations
		chatSocketService.subscribeToConversations((updatedConversations) => {
			dispatch(setConversations(updatedConversations));
			setLoading(false);
		});

		// Fetch initial conversations
		socket.emit("get_conversations");

		return () => {
			chatSocketService.disconnect();
		};
	}, [dispatch]);

	const navigateToChat = (
		conversationId: string,
		recipientId: string,
		recipientName: string
	) => {
		dispatch(setActiveConversation(conversationId));
		dispatch(markConversationAsRead(conversationId));
		navigation.navigate("Messages", {
			conversationId,
			recipientId,
			recipientName,
		});
	};

	const formatTimestamp = (timestamp: string) => {
		const date = new Date(timestamp);
		const today = new Date();

		if (date.toDateString() === today.toDateString()) {
			return date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});
		}

		return date.toLocaleDateString([], { month: "short", day: "numeric" });
	};

	const renderConversationItem = ({ item }: { item: any }) => {
		const lastMessage = item.lastMessage || {
			message: "No messages yet",
			timestamp: new Date().toISOString(),
		};
		const recipientId = item.participants.find((id: string) => id !== "user1"); // Assume current user is user1
		const recipientName = "User " + recipientId; // In real app, get from user profiles

		return (
			<TouchableOpacity
				style={tw`flex-row p-4 border-b border-gray-100`}
				onPress={() => navigateToChat(item.id, recipientId, recipientName)}
			>
				<Image
					source={{
						uri: `https://randomuser.me/api/portraits/men/${
							parseInt(recipientId.replace("user", "")) + 30
						}.jpg`,
					}}
					style={tw`w-12 h-12 rounded-full mr-3`}
				/>

				<View style={tw`flex-1 justify-center`}>
					<View style={tw`flex-row justify-between items-center`}>
						<Text style={tw`font-bold text-base`}>{recipientName}</Text>
						<Text style={tw`text-gray-500 text-xs`}>
							{formatTimestamp(lastMessage.timestamp)}
						</Text>
					</View>

					<View style={tw`flex-row justify-between items-center mt-1`}>
						<Text
							numberOfLines={1}
							style={tw`text-gray-600 flex-1 pr-2 ${
								item.unreadCount > 0 ? "font-semibold" : ""
							}`}
						>
							{lastMessage.message}
						</Text>

						{item.unreadCount > 0 && (
							<View
								style={tw`bg-red-500 rounded-full h-5 min-w-5 items-center justify-center px-1`}
							>
								<Text style={tw`text-white text-xs font-bold`}>
									{item.unreadCount}
								</Text>
							</View>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
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
			<View
				style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}
			>
				<Text style={tw`text-xl font-bold`}>Messages</Text>
				<TouchableOpacity>
					<Ionicons name="create-outline" size={24} color="#F05A22" />
				</TouchableOpacity>
			</View>

			{!isConnected && (
				<View style={tw`bg-yellow-100 p-2`}>
					<Text style={tw`text-yellow-800 text-center`}>
						Connecting to chat server...
					</Text>
				</View>
			)}

			{conversations.length === 0 ? (
				<View style={tw`flex-1 justify-center items-center p-4`}>
					<Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
					<Text style={tw`text-gray-500 mt-4 text-center`}>
						No conversations yet
					</Text>
					<TouchableOpacity
						style={tw`mt-4 bg-orange-500 px-6 py-3 rounded-full`}
						onPress={() => navigation.navigate("Contacts")} // Navigate to contacts screen
					>
						<Text style={tw`text-white font-bold`}>Start a conversation</Text>
					</TouchableOpacity>
				</View>
			) : (
				<FlatList
					data={conversations}
					keyExtractor={(item) => item.id}
					renderItem={renderConversationItem}
					contentContainerStyle={conversations.length === 0 ? tw`flex-1` : {}}
				/>
			)}
		</SafeAreaView>
	);
};
