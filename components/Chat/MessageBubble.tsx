import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

interface Message {
	id: string;
	message: string;
	timestamp: string | number | Date;
}

interface MessageBubbleProps {
	message: Message;
	isCurrentUser: boolean;
	onDelete: (id: string) => void;
}

const MessageBubble = ({
	message,
	isCurrentUser,
	onDelete,
}: MessageBubbleProps) => {
	const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<View
			style={[
				tw`my-1 mx-1 max-w-[80%]`,
				isCurrentUser ? tw`self-end` : tw`self-start`,
			]}
		>
			<View
				style={[
					tw`px-4 py-2 rounded-3xl`,
					isCurrentUser
						? tw`bg-white rounded-tr-none`
						: tw`bg-black text-white rounded-tl-none`,
				]}
			>
				<Text
					style={[
						tw`text-base`,
						isCurrentUser ? tw`text-black` : tw`text-white`,
					]}
				>
					{message.message}
				</Text>
			</View>
			<View
				style={[
					tw`flex-row items-center mt-1 px-2`,
					isCurrentUser ? tw`justify-end` : tw`justify-start`,
				]}
			>
				<Text style={tw`text-xs text-gray-500`}>{formattedTime}</Text>
				{isCurrentUser && (
					<TouchableOpacity
						onPress={() => onDelete(message.id)}
						style={tw`ml-2`}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<Ionicons name="trash-outline" size={12} color="#999" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default memo(MessageBubble);
