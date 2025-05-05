import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

const BookButton = ({
	onPress,
	text = "Book",
}: {
	onPress: () => void;
	text?: string;
}) => {
	return (
		<View
			style={tw`absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200`}
		>
			<TouchableOpacity
				style={tw`bg-[#FF6633] py-3 rounded-lg items-center`}
				onPress={onPress}
			>
				<Text style={tw`text-white font-bold text-base`}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BookButton;
