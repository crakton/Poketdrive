import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

interface PassengerSelectorProps {
	passengers: number;
	onDecrease: () => void;
	onIncrease: () => void;
	maxPassengers?: number;
}

const PassengerSelector = ({
	passengers,
	onDecrease,
	onIncrease,
	maxPassengers = 8,
}: PassengerSelectorProps) => {
	return (
		<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
			<View style={tw`flex-row items-center justify-between`}>
				<View style={tw`flex-row items-center`}>
					<Ionicons
						name="people-outline"
						size={20}
						color="#999"
						style={tw`mr-2`}
					/>
					<Text style={tw`text-base`}>Passengers</Text>
				</View>

				<View style={tw`flex-row items-center`}>
					<TouchableOpacity
						style={tw`h-8 w-8 bg-gray-100 rounded-full items-center justify-center`}
						onPress={onDecrease}
					>
						<Text style={tw`text-lg font-medium`}>−</Text>
					</TouchableOpacity>

					<Text style={tw`mx-4 text-base`}>{passengers}</Text>

					<TouchableOpacity
						style={tw`h-8 w-8 bg-gray-100 rounded-full items-center justify-center`}
						onPress={onIncrease}
					>
						<Text style={tw`text-lg font-medium`}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default PassengerSelector;
