import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { FlatList } from "react-native";

import { EFlightStatus } from "../../types/airline";
import { useAppDispatch, useAppSelector } from "@redux/store";

const FlightSearchScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { findFlights } = useAppSelector((state) => state.flights);
	const dispatch = useAppDispatch();

	const renderFlight = ({ item }: { item: (typeof findFlights)[0] }) => (
		<TouchableOpacity
			onPress={() => {
				setTimeout(() => {
					console.log("After setting flight details (delayed check):", item);
					navigation.navigate("FlightDetails", item);
				}, 100);
			}}
			style={tw`rounded-lg overflow-hidden`}
		>
			<ImageBackground
				source={{ uri: item.airline.image }}
				style={tw`w-full h-40 flex-col flex justify-between`}
				resizeMode="cover"
			>
				<TouchableOpacity
					style={tw`relative self-end bg-[#e9e9e9] bg-opacity-70 top-3 right-3 p-1 rounded-full`}
				>
					<Ionicons name={"open-outline"} size={14} color={"white"} />
				</TouchableOpacity>
				<View style={tw`p-3 flex-row gap-2 items-center mb-1`}>
					<View
						style={tw`bg-[#e9e9e9c9] p-1 flex-row items-center rounded-full`}
					>
						<Ionicons name="star" size={16} color="#FFD700" />
						{/* <Text style={tw`ml-1`}>{}</Text> */}
					</View>
					<View
						style={tw`bg-[#e9e9e9c9] p-1 flex-row items-center rounded-full`}
					>
						<Text style={tw`text-gray-500 text-xs`}>
							Airfield:{" "}
							{item.departure.name.length > 9
								? item.departure.name.slice(0, 9) + "..."
								: item.departure.name}
						</Text>
					</View>
					<View
						style={tw`bg-[#e9e9e9c9] p-1 flex-row items-center rounded-full`}
					>
						<Text style={tw`text-gray-500 text-xs`}>
							Passengers: {item.airline.fleetSize}
						</Text>
					</View>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View
				style={tw`flex-row items-center px-4 py-2 border-b border-gray-200`}
			>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="#000" />
				</TouchableOpacity>
				<View
					style={tw`flex-1 ml-3 mr-10 flex-row items-center p-2 bg-gray-100 rounded-lg`}
				>
					<Text style={tw`flex-1 text-gray-700`}>
						{findFlights[0]?.departure.city} to{" "}
						{findFlights[0]?.destination.city}
					</Text>
					<AntDesign name="swap" size={20} color="#000" />
				</View>
			</View>

			<Text style={tw`px-4 py-2 text-lg font-medium`}>Search results</Text>
			<FlatList
				contentContainerStyle={tw`p-4 gap-3`}
				data={findFlights}
				renderItem={renderFlight}
				keyExtractor={(_, id) => id.toString()}
			/>
		</SafeAreaView>
	);
};

export default FlightSearchScreen;
