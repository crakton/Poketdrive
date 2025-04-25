import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

export const EmptyChat = ({ offlineMode }: { offlineMode: boolean }) => {
	return (
		<View style={tw`flex-1 justify-center items-center p-4`}>
			<Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
			<Text style={tw`text-gray-500 mt-4 text-center`}>
				{offlineMode
					? "You're offline. Connect to see messages."
					: "No messages yet. Start the conversation!"}
			</Text>
		</View>
	);
};
