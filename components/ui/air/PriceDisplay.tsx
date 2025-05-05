import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const PriceDisplay = ({
	price,
	currency = "₦",
}: {
	price: number;
	currency?: string;
}) => {
	return (
		<View style={tw`py-4 px-5`}>
			<Text style={tw`text-base font-medium mb-2`}>Ticket price</Text>
			<Text style={tw`text-xl font-bold text-center mt-4 bg-gray-100 p-3`}>
				{currency}
				{price.toLocaleString()}
			</Text>
		</View>
	);
};

export default PriceDisplay;
