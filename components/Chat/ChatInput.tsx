import React, { memo } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

interface ChatInputProps {
	value: string;
	onChangeText: (text: string) => void;
	onSend: () => void;
	disabled: boolean;
	initializing: boolean;
	offlineMode: boolean;
	isConnected: boolean;
	isTyping: boolean;
}

const ChatInput = ({
	value,
	onChangeText,
	onSend,
	disabled,
	initializing,
	offlineMode,
	isConnected,
	isTyping,
}: ChatInputProps) => {
	return (
		<View style={tw`flex-row items-center py-2 px-3 bg-white`}>
			<TouchableOpacity style={tw`mx-1`}>
				<Ionicons name="happy-outline" size={24} color="#666" />
			</TouchableOpacity>

			<View
				style={tw`flex-row items-center flex-1 bg-gray-100 rounded-full px-3 mx-1`}
			>
				<TextInput
					style={tw`flex-1 py-2`}
					placeholder={
						offlineMode
							? "Offline mode - messages will be queued"
							: initializing
							? "Creating conversation..."
							: "Type Message"
					}
					value={value}
					onChangeText={onChangeText}
					multiline
					numberOfLines={1}
					editable={!initializing}
				/>
			</View>

			<TouchableOpacity
				style={tw`mx-2 ${
					value.trim() && (!offlineMode || isConnected) && !initializing
						? "opacity-100"
						: "opacity-50"
				}`}
				onPress={onSend}
				disabled={!value.trim() || initializing || disabled}
			>
				{initializing ? (
					<ActivityIndicator size="small" color="#F05A22" />
				) : (
					<Ionicons name="send" size={24} color="#F05A22" />
				)}
			</TouchableOpacity>
		</View>
	);
};

export default memo(ChatInput);
