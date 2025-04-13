import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	StyleSheet,
	ActivityIndicator,
	Alert,
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
import { set } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@../../types/user";

const ChatListScreen = () => {
	const navigation = useNavigation<NavigationProp<any>>();
	const dispatch = useAppDispatch();
	const { conversations, isConnected } = useAppSelector((state) => state.chat);
	const [loading, setLoading] = useState(true);
	const [connectionError, setConnectionError] = useState(false);
	const [userData, setUser] = useState<IUser>();
	const [token, setToken] = useState<string>();

	// fetch user from asncy storage
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem("userData");

				if (jsonValue !== null) {
					const parsedData = JSON.parse(jsonValue);
					setUser(parsedData as IUser);
					setToken((await AsyncStorage.getItem("token")) ?? "");
				}
			} catch (e) {
				console.log("Error fetching user data:", e);
			}
		};
	}, []);

	useEffect(() => {
		let socketConnectTimeout: NodeJS.Timeout;
		// Connect to socket with user ID (use actual user ID from auth state)
		try {
			const socket = chatSocketService.connect(userData?.id ?? "user1", token);

			// Listen for connection events
			socket.on("connect", () => {
				dispatch(setConnectionStatus(true));
				setConnectionError(false);
			});

			socket.on("disconnect", () => {
				dispatch(setConnectionStatus(false));
			});

			socket.on("connect_error", (error) => {
				console.error("Socket connection error:", error);
				setConnectionError(true);

				// Still proceed with UI even if connection fails
				socketConnectTimeout = setTimeout(() => {
					setLoading(false);
				}, 3000);
			});

			// Subscribe to conversations
			chatSocketService.subscribeToConversations((updatedConversations) => {
				dispatch(setConversations(updatedConversations));
				setLoading(false);
			});

			// Fetch initial conversations
			chatSocketService.requestConversations();

			// Set a timeout to show UI even if server doesn't respond
			socketConnectTimeout = setTimeout(() => {
				if (loading) {
					setLoading(false);
				}
			}, 5000);
		} catch (error) {
			console.error("Failed to initialize socket:", error);
			setConnectionError(true);
			setLoading(false);
		}

		return () => {
			clearTimeout(socketConnectTimeout);
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
						uri: recipientId
							? `https://randomuser.me/api/portraits/men/${
									parseInt(recipientId.replace("user", "") || "0") + 30
							  }.jpg`
							: "https://randomuser.me/api/portraits/men/30.jpg",
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
						{connectionError
							? "Unable to connect to chat server. Some features may be limited."
							: "Connecting to chat server..."}
					</Text>
				</View>
			)}

			{conversations.length === 0 ? (
				<View style={tw`flex-1 justify-center items-center p-4`}>
					<Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
					<Text style={tw`text-gray-500 mt-4 text-center`}>
						{connectionError
							? "Unable to load conversations. Please check your connection."
							: "No conversations yet"}
					</Text>
					<TouchableOpacity
						style={tw`mt-4 bg-orange-500 px-6 py-3 rounded-full`}
						onPress={() => {
							if (connectionError) {
								// Try to reconnect
								setLoading(true);
								chatSocketService.disconnect();
								const socket = chatSocketService.connect("user1", "");
								setTimeout(() => {
									const connected = chatSocketService.isConnected();
									dispatch(setConnectionStatus(connected));
									if (!connected) {
										Alert.alert(
											"Connection Issue",
											"Still unable to connect. Please try again later.",
											[{ text: "OK" }]
										);
									}
									setLoading(false);
								}, 2000);
							} else {
								navigation.navigate("Contacts");
							}
						}}
					>
						<Text style={tw`text-white font-bold`}>
							{connectionError ? "Retry Connection" : "Start a conversation"}
						</Text>
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

export default ChatListScreen;
