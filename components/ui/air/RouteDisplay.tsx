import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

export interface IRoute {
	name: string;
	icon: keyof typeof Ionicons.glyphMap;
}

const RouteDisplay = ({ routes }: { routes: IRoute[] }) => {
	return (
		<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
			<Text style={tw`text-base font-medium mb-3`}>Flight route</Text>
			<View style={tw`bg-gray-50 p-4 rounded-lg`}>
				{routes.map((stop, index) => (
					<View
						key={stop.name}
						style={tw`flex-row items-center mb-4 last:mb-0`}
					>
						<View
							style={tw`mr-2 rounded-full ${
								index === 0 ? "bg-orange-100" : "bg-gray-200"
							} p-2`}
						>
							<Ionicons
								name={stop.icon}
								size={16}
								color={index === 0 ? "#FF5722" : "#666"}
							/>
						</View>
						<Text>{stop.name}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

export default RouteDisplay;
