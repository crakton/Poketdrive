import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FlatList } from "react-native";

import { EFlightStatus } from "../../types/airline";

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
			style={tw`px-4 py-2`}
		>
			<ImageBackground
				source={{ uri: item?.airline?.image }}
				style={tw`w-full h-40 rounded-lg flex flex-col justify-between overflow-hidden`}
				resizeMode="cover"
			>
				<View style={tw`flex-row items-center gap-1 self-end p-3`}>
					{/* <Octicons
						name="dot"
						size={16}
						color={item.status === EFlightStatus.open ? "#FF6633" : "#000"}
					/> */}
					<Text
						style={tw`text-xs font-medium ${
							item.status === EFlightStatus.open
								? "text-[#FF6633]"
								: "text-gray-700"
						}`}
					>
						{item.status.toLocaleUpperCase()}
					</Text>
				</View>
				<View
					style={tw`flex-row  items-center justify-between px-4 py-2 bg-white`}
				>
					<Text>{item?.departure.name}</Text>
					<Text>Carriage: {item?.availableSchedules[0].totalSeats}</Text>
				</View>
			</ImageBackground>
			<View style={tw`mt-3 flex-row justify-between items-center`}>
				<TouchableOpacity
					style={tw`bg-[#FF6633] px-6 py-2 rounded-full`}
					onPress={() => navigation.navigate("FlightBooking")}
				>
					<Text
						style={[tw`text-white font-medium`, { fontFamily: "Poppins-Bold" }]}
					>
						Book
					</Text>
				</TouchableOpacity>
				{item?.availableSchedules[0].jetShare && (
					<View>
						<Text style={tw`text-gray-700`}>Share</Text>
					</View>
				)}
			</View>
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
