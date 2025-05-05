import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";

interface HeaderImageProps {
	imageUrl: string;
	onBack: () => void;
	rating?: number;
}

const HeaderImage = ({ imageUrl, onBack, rating }: HeaderImageProps) => {
	return (
		<View style={tw`relative`}>
			<Image
				source={{ uri: imageUrl }}
				style={tw`w-full h-56`}
				resizeMode="cover"
			/>
			<TouchableOpacity
				style={tw`absolute top-4 left-4 bg-white rounded-full p-2`}
				onPress={onBack}
			>
				<AntDesign name="arrowleft" size={24} color="#000" />
			</TouchableOpacity>

			{rating && (
				<View
					style={tw`absolute top-4 right-4 bg-white rounded-full py-1 px-3 flex-row items-center`}
				>
					<AntDesign name="star" size={16} color="#FFD700" />
					<Text style={tw`ml-1`}>{rating}</Text>
				</View>
			)}
		</View>
	);
};

export default HeaderImage;
