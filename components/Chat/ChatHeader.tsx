// components/ChatHeader.jsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

interface ChatHeaderProps {
	recipientName: string;
	recipientId: string;
	isOnline: boolean;
	isTyping: boolean;
	phoneNumber: string;
	navigation: any;
}

export const ChatHeader = ({
	recipientName,
	recipientId,
	isOnline,
	isTyping,
	phoneNumber,
	navigation,
}: ChatHeaderProps) => {
	// Generate avatar from ID (or use actual avatar if available)
	const avatarUrl = recipientId
		? `https://randomuser.me/api/portraits/men/${
				(parseInt(recipientId.replace(/\D/g, "") || "0") % 70) + 1
		  }.jpg`
		: "https://randomuser.me/api/portraits/men/1.jpg";
	const handlePhoneCall = () => {
		const phoneUrl = `tel:${phoneNumber}`;
		Linking.openURL(phoneUrl);
	};
	return (
		<View
			style={tw`flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200`}
		>
			<TouchableOpacity
				style={tw`flex-row items-center`}
				onPress={() => navigation.goBack()}
			>
				<Ionicons name="chevron-back" size={24} color="#000" />
				<Image
					source={{ uri: avatarUrl }}
					style={tw`w-10 h-10 rounded-full ml-2`}
				/>
				<View style={tw`ml-3`}>
					<Text style={tw`font-bold text-base`}>{recipientName}</Text>
					<View style={tw`flex-row items-center`}>
						{isOnline && (
							<View style={tw`w-2 h-2 rounded-full bg-green-500 mr-1`} />
						)}
						<Text style={tw`text-sm text-gray-500`}>
							{isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}
						</Text>
					</View>
				</View>
			</TouchableOpacity>

			<TouchableOpacity style={tw`p-2`} onPress={handlePhoneCall}>
				<Ionicons name="call" size={22} color="#000" />
			</TouchableOpacity>
		</View>
	);
};
