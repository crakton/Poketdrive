import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useChat } from "@hooks/useChat";

interface ChatHeaderProps {
	recipientName: string;
	recipientId: string;
	phoneNumber?: string;
	navigation: any;
	isTyping?: boolean;
	isOnline?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
	recipientName,
	recipientId,
	phoneNumber,
	navigation,
	isTyping = false,
	isOnline = false,
}) => {
	// Generate avatar URL based on recipient ID
	const avatarUrl = recipientId
		? `https://randomuser.me/api/portraits/men/${
				(parseInt(recipientId.replace(/\D/g, "") || "0") % 70) + 1
		  }.jpg`
		: "https://randomuser.me/api/portraits/men/1.jpg";

	return (
		<View
			style={tw`flex-row items-center px-3 py-1 bg-white border-b border-gray-200`}
		>
			<TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
				<Ionicons name="chevron-back" size={24} color="#FF6633" />
			</TouchableOpacity>

			<Image
				source={{ uri: avatarUrl }}
				style={tw`w-10 h-10 rounded-full mr-3`}
			/>

			<View style={tw`flex-1`}>
				<Text style={tw`font-bold text-[16px]`}>{recipientName}</Text>

				{isTyping ? (
					<View style={tw`flex-row items-center`}>
						<Text style={tw`text-green-600 text-sm mr-1`}>typing</Text>
						<View style={tw`flex-row items-center`}>
							<View
								style={[
									tw`w-1.5 h-1.5 bg-green-600 rounded-full mr-0.5`,
									{ opacity: 0.6 },
								]}
							/>
							<View
								style={[
									tw`w-1.5 h-1.5 bg-green-600 rounded-full mr-0.5`,
									{ opacity: 0.8 },
								]}
							/>
							<View
								style={[
									tw`w-1.5 h-1.5 bg-green-600 rounded-full`,
									{ opacity: 1 },
								]}
							/>
						</View>
					</View>
				) : (
					<Text style={tw`text-gray-500 text-[10px]`}>
						{isOnline ? "Online" : "Offline"}
						{phoneNumber ? ` • ${phoneNumber}` : ""}
					</Text>
				)}
			</View>

			<TouchableOpacity
				onPress={() => {
					Linking.openURL(`tel:${phoneNumber}`);
				}}
				style={tw`p-2`}
			>
				<Ionicons name="call-outline" size={20} color="#333" />
			</TouchableOpacity>
		</View>
	);
};
