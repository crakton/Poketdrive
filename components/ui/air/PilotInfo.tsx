import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";
import tw from "twrnc";

interface PilotProps {
	name: string;
	rating: number;
	airplane: string;
	hoursFlown: number;
	license: string;
}

const PilotInfo = ({ pilot }: { pilot: PilotProps }) => {
	const { name, rating, airplane, hoursFlown, license } = pilot;

	return (
		<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
			<Text style={tw`text-base font-medium mb-3`}>Pilot information</Text>
			<View style={tw`flex-row items-center mb-3`}>
				<Avatar
					size={40}
					title={name
						.split(" ")
						.map((n) => n[0])
						.join("")}
				/>
				<View style={tw`ml-3`}>
					<Text style={tw`font-medium`}>{name}</Text>
					<View style={tw`flex-row items-center`}>
						{Array(5)
							.fill(0)
							.map((_, star) => (
								<Ionicons key={star} name="star" size={14} color="#FFD700" />
							))}
						<Text style={tw`ml-1`}>{rating}</Text>
					</View>
				</View>
			</View>

			<View style={tw`flex-row mb-2`}>
				<View style={tw`bg-gray-50 p-2 rounded-lg mr-2 flex-1`}>
					<Text style={tw`text-gray-500 text-xs`}>Airplane</Text>
					<Text>{airplane}</Text>
				</View>
				<View style={tw`bg-gray-50 p-2 rounded-lg flex-1`}>
					<Text style={tw`text-gray-500 text-xs`}>Hours flown</Text>
					<Text>{hoursFlown}</Text>
				</View>
			</View>

			<View style={tw`bg-gray-50 p-2 rounded-lg`}>
				<Text style={tw`text-gray-500 text-xs`}>License</Text>
				<Text>{license}</Text>
			</View>
		</View>
	);
};

export default PilotInfo;
