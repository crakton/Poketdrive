import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

interface InfoCardProps {
	title: string;
	children: React.ReactNode;
}

const InfoCard = ({ title, children }: InfoCardProps) => {
	return (
		<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
			<Text style={tw`text-base font-medium mb-3`}>{title}</Text>
			<View style={tw`bg-gray-50 p-4 rounded-lg`}>{children}</View>
		</View>
	);
};

export default InfoCard;
