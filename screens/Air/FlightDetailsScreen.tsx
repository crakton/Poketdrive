import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from "react-native";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../types";
import { useAirContext } from "../../hooks/air/useAirContext";

const FlightDetailsScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { selectedSeat, setFlightDetails } = useAirContext();

	const flightDetails = {
		flightNumber: "Jet Marc - 001",
		departureTime: "5.50",
		departureCode: "LAG",
		departureAirport: "Murtala International",
		arrivalTime: "7.30",
		arrivalCode: "ABJ",
		arrivalAirport: "Murtala International",
		price: "N23000",
	};

	const handleConfirm = () => {
		// Navigate to passenger details screen
		setFlightDetails(flightDetails);
		navigation.navigate("PassengerDetailsScreen");
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />
			<View style={tw`flex-1 p-4`}>
				<View style={tw`flex-row items-center mb-6`}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={tw`mr-4`}
					>
						<Ionicons name="arrow-back" size={24} color="black" />
					</TouchableOpacity>
					<Text style={tw`text-2xl font-bold`}>Flight details</Text>
				</View>

				<View style={tw`bg-white rounded-xl p-4 shadow-md mb-6`}>
					<Text style={tw`text-lg font-bold text-center mb-4`}>
						{flightDetails.flightNumber}
					</Text>

					<View style={tw`flex-row justify-between items-center mb-6`}>
						<View style={tw`items-center`}>
							<Text style={tw`text-xl font-bold`}>
								{flightDetails.departureTime}
							</Text>
							<Text style={tw`text-lg font-bold`}>
								{flightDetails.departureCode}
							</Text>
							<Text style={tw`text-sm text-gray-500`}>
								{flightDetails.departureAirport}
							</Text>
						</View>

						<View style={tw`flex-1 items-center`}>
							<View style={tw`flex-row items-center w-full`}>
								<View style={tw`flex-1 h-px bg-gray-300`}></View>
								<View style={tw`mx-2 bg-orange-500 p-2 rounded-full`}>
									<Ionicons name="airplane" size={16} color="white" />
								</View>
								<View style={tw`flex-1 h-px bg-gray-300`}></View>
							</View>
						</View>

						<View style={tw`items-center`}>
							<Text style={tw`text-xl font-bold`}>
								{flightDetails.arrivalTime}
							</Text>
							<Text style={tw`text-lg font-bold`}>
								{flightDetails.arrivalCode}
							</Text>
							<Text style={tw`text-sm text-gray-500`}>
								{flightDetails.arrivalAirport}
							</Text>
						</View>
					</View>

					<View style={tw`flex-row mb-4`}>
						<View style={tw`flex-1 mr-2`}>
							<Text style={tw`text-sm text-gray-500 mb-1`}>Date</Text>
							<TouchableOpacity
								style={tw`border border-gray-300 rounded-md p-3 flex-row items-center`}
							>
								<Ionicons name="calendar-outline" size={20} color="gray" />
							</TouchableOpacity>
						</View>
						<View style={tw`flex-1 ml-2`}>
							<Text style={tw`text-sm text-gray-500 mb-1`}>Time</Text>
							<TouchableOpacity
								style={tw`border border-gray-300 rounded-md p-3 flex-row items-center`}
							>
								<Ionicons name="time-outline" size={20} color="gray" />
							</TouchableOpacity>
						</View>
					</View>

					<Text style={tw`text-xl font-bold text-center mt-4`}>
						Price {flightDetails.price}
					</Text>
				</View>

				<View style={tw`flex-1`}></View>

				<View style={tw`flex-row`}>
					<TouchableOpacity
						style={tw`flex-1 border border-orange-500 rounded-md py-4 items-center mr-2`}
						onPress={handleCancel}
					>
						<Text style={tw`text-orange-500 font-medium text-lg`}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw`flex-1 bg-orange-500 rounded-md py-4 items-center ml-2`}
						onPress={handleConfirm}
					>
						<Text style={tw`text-white font-medium text-lg`}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default FlightDetailsScreen;
