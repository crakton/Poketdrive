// ChatListScreen.tsx - Simplified version that uses centralized ChatContext
import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	Modal,
	SafeAreaView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { IUser } from "../../types/user";
import PageLoader from "@components/ui/PageLoader";
import { useUserService } from "@hooks/useUserService";
import { useChat } from "@hooks/useChat";

const ChatListScreen = () => {
	const navigation = useNavigation<NavigationProp<any>>();

	// Use chat context
	const {
		isConnected,
		userData,
		conversations,
		connectionError,
		retryConnection,
		requestConversations,
		setActiveConversation,
	} = useChat();

	const [userModalVisible, setUserModalVisible] = useState(false);

	// Fetch users
	const { useGetUsers } = useUserService();
	const { data: users, isLoading: loadingUsers } = useGetUsers();

	// Request conversations when component mounts or when connection status changes
	useEffect(() => {
		if (isConnected) {
			requestConversations();
		}
	}, [isConnected, requestConversations]);

	// Navigate to chat screen and set active conversation
	const navigateToChat = useCallback(
		(conversationId: string, recipientId: string, recipientName: string) => {
			// Set the active conversation in chat context
			setActiveConversation(conversationId, recipientId);

			// Navigate to message screen
			navigation.navigate("Message", {
				conversationId,
				recipientId,
				recipientName,
			});
		},
		[navigation, setActiveConversation]
	);

	// Initialize chat with selected user
	const initiateChat = useCallback(
		(recipientId: string, recipientName: string) => {
			if (!userData?.id) return;

			// Use existing conversation if it exists
			const existingConversation = conversations.find((c) =>
				c.participants.includes(recipientId)
			);

			if (existingConversation) {
				navigateToChat(existingConversation.id, recipientId, recipientName);
			} else {
				// For new chats, we'll create the conversationId in the format user1_user2 (sorted)
				const participants = [userData.id, recipientId].sort();
				const conversationId = participants.join("_");

				// Navigate to the chat screen, the actual chat creation will happen there
				navigateToChat(conversationId, recipientId, recipientName);
			}

			setUserModalVisible(false);
		},
		[userData, conversations, navigateToChat]
	);

	// Format timestamp for display
	const formatTimestamp = useCallback((timestamp: string) => {
		const date = new Date(timestamp);
		const today = new Date();

		if (date.toDateString() === today.toDateString()) {
			return date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});
		}

		return date.toLocaleDateString([], { month: "short", day: "numeric" });
	}, []);

	// Render individual conversation item
	const renderConversationItem = ({ item }: { item: any }) => {
		const lastMessage = item.lastMessage || {
			message: "No messages yet",
			timestamp: new Date().toISOString(),
		};

		const recipientId = item.participants.find(
			(id: string) => id !== userData?.id
		);

		// Find the user info from the users list
		const recipientUser =
			users !== undefined &&
			users!.results.find((user: IUser) => user.id === recipientId);
		const recipientName = recipientUser!.firstName || `User ${recipientId}`;

		// Generate avatar URL based on recipient ID
		const avatarUrl = recipientId
			? `https://randomuser.me/api/portraits/men/${
					(parseInt(recipientId.replace(/\D/g, "") || "0") % 70) + 1
			  }.jpg`
			: "https://randomuser.me/api/portraits/men/1.jpg";

		return (
			<TouchableOpacity
				style={tw`flex-row item p-4 border-b border-gray-100`}
				onPress={() => navigateToChat(item.id, recipientId, recipientName)}
			>
				<Image
					source={{ uri: avatarUrl }}
					style={tw`w-12 h-12 rounded-full mr-3`}
				/>
				<View style={tw`flex-1`}>
					<Text style={tw`font-bold`}>{recipientName}</Text>
					<Text style={tw`text-[#ff6633] text-xs`}>
						{lastMessage.message.length > 30
							? `${lastMessage.message.slice(0, 30)}...`
							: lastMessage.message}
					</Text>
					<Text style={tw`text-gray-400 text-[10px]`}>
						{formatTimestamp(lastMessage.timestamp)}
					</Text>
				</View>
				<View style={tw`ml-2`}>
					{!item.read ? (
						<Ionicons
							name="checkmark-outline"
							size={12}
							color="#FF4533"
							style={tw`absolute top-0 right-0`}
						/>
					) : (
						<Ionicons
							name="checkmark-done-outline"
							size={12}
							color="#FF4533"
							style={tw`absolute top-0 right-0`}
						/>
					)}
					{item.unreadCount > 0 && (
						<View
							style={tw`bg-[#ff6633] rounded-full w-4 h-4 items-center justify-center absolute top-0 right-0`}
						>
							<Text style={tw`text-white text-center text-xs`}>
								{item.unreadCount > 99 ? "99+" : item.unreadCount}
							</Text>
						</View>
					)}

					{recipientUser.role !== "passenger" && (
						<>
							<Text style={tw`text-gray-400 mt-5 text-[10px]`}>
								{recipientUser.carName}
							</Text>
							<Text style={tw`text-gray-400 text-[10px]`}>
								{recipientUser.carNumber}
							</Text>
						</>
					)}
				</View>
			</TouchableOpacity>
		);
	};

	// Render a user item for the user selection modal
	const renderUserItem = ({ item }: { item: IUser }) => {
		// Skip rendering current user
		if (item.id === userData?.id) return null;

		const avatarUrl = `https://randomuser.me/api/portraits/men/${
			(parseInt(item.id.replace(/\D/g, "") || "0") % 70) + 1
		}.jpg`;

		return (
			<TouchableOpacity
				style={tw`flex-row items-center p-4 border-b border-gray-100`}
				onPress={() =>
					initiateChat(item.id, item.firstName || `User ${item.id}`)
				}
			>
				<Image
					source={{ uri: avatarUrl }}
					style={tw`w-12 h-12 rounded-full mr-3`}
				/>
				<View>
					<Text style={tw`font-bold`}>
						{item.firstName || `User ${item.id}`}
					</Text>
					<Text style={tw`text-gray-500 text-sm`}>
						{item.email || "No email"}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	if (loadingUsers) {
		return (
			<SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
				<PageLoader />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View
				style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}
			>
				<Text style={tw`text-xl font-bold`}>Messages</Text>
				<View style={tw`flex-row`}>
					{!isConnected && (
						<View style={tw`bg-yellow-100 rounded-full px-3 py-1 mr-2`}>
							<Text style={tw`text-yellow-800 text-xs`}>Offline</Text>
						</View>
					)}
				</View>
			</View>

			{conversations.length === 0 ? (
				<View style={tw`flex-1 justify-center items-center p-4`}>
					<Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
					<Text style={tw`text-gray-500 mt-4 text-center`}>
						{connectionError
							? "Unable to load conversations. Please check your connection."
							: "No conversations yet. Start chatting!"}
					</Text>
					{userData !== null && userData.role === "driver" && (
						<TouchableOpacity
							style={tw`mt-4 bg-orange-500 px-6 py-3 rounded-full`}
							onPress={() => {
								if (connectionError) {
									retryConnection();
								} else {
									setUserModalVisible(true);
								}
							}}
						>
							<Text style={tw`text-white font-bold`}>
								{connectionError ? "Retry Connection" : "Start a conversation"}
							</Text>
						</TouchableOpacity>
					)}
				</View>
			) : (
				<FlatList
					data={conversations}
					keyExtractor={(item) => item.id}
					renderItem={renderConversationItem}
				/>
			)}

			{/* FAB for new chat */}
			{userData?.role === "driver" && (
				<TouchableOpacity
					style={tw`absolute bottom-6 right-6 bg-orange-500 w-14 h-14 rounded-full items-center justify-center shadow-lg`}
					onPress={() => setUserModalVisible(true)}
				>
					<Ionicons name="chatbubble-ellipses" size={24} color="white" />
				</TouchableOpacity>
			)}

			{/* User selection modal */}
			<Modal
				visible={userModalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setUserModalVisible(false)}
			>
				<View style={tw`flex-1 bg-black bg-opacity-50`}>
					<SafeAreaView style={tw`flex-1 mt-16`}>
						<View style={tw`bg-white rounded-t-3xl flex-1`}>
							<View
								style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}
							>
								<Text style={tw`text-xl font-bold`}>Select a User</Text>
								<TouchableOpacity
									onPress={() => setUserModalVisible(false)}
									style={tw`p-2`}
								>
									<AntDesign name="close" size={24} color="#333" />
								</TouchableOpacity>
							</View>

							{loadingUsers ? (
								<View style={tw`flex-1 justify-center items-center`}>
									<PageLoader />
								</View>
							) : (
								<FlatList
									data={users.results || []}
									keyExtractor={(item) => item.id}
									renderItem={renderUserItem}
									ListEmptyComponent={
										<View style={tw`p-4 items-center justify-center`}>
											<Text style={tw`text-gray-500`}>No users available</Text>
										</View>
									}
								/>
							)}
						</View>
					</SafeAreaView>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default ChatListScreen;
