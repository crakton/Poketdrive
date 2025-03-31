import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	Image,
} from "react-native";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAirContext } from "../../hooks/air/useAirContext";
import { RootStackParamList } from "../../types";
import { ScrollView } from "react-native";
import ContinueButton from "../../components/ui/ContinueButton";

const TicketConfirmationScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { passengerDetails } = useAirContext();

	const flightDetails = {
		flightNumber: "Jet Marc - 001",
		departureTime: "5.50",
		departureCode: "LAG",
		departureAirport: "Murtala International",
		arrivalTime: "7.30",
		arrivalCode: "ABJ",
		arrivalAirport: "Murtala International",
	};

	const handleDownload = () => {
		// Handle ticket download functionality
		// This would typically save the ticket locally or share it
	};

	const handleBookAnother = () => {
		// Navigate back to the home screen or flight search
		navigation.reset({
			index: 0,
			routes: [{ name: "AirTabBar" }],
		});
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />
			<ScrollView contentContainerStyle={tw`flex-grow`} style={tw`flex-1 p-4`}>
				<View style={tw`items-center mb-4`}>
					<View style={tw`w-16 h-16 rounded-full overflow-hidden bg-gray-200`}>
						<Image
							source={{ uri: "https://via.placeholder.com/200" }}
							style={tw`w-full h-full`}
						/>
					</View>
				</View>

				<View style={tw`mb-6`}>
					<Text style={tw`text-lg font-bold text-center mb-4`}>
						{flightDetails.flightNumber}
					</Text>

					<View style={tw`flex-row justify-between items-center mb-6`}>
						<View style={tw`items-start`}>
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
								<View style={tw`mx-2 bg-pink-500 p-2 rounded-full`}>
									<Ionicons name="airplane" size={16} color="white" />
								</View>
								<View style={tw`flex-1 h-px bg-gray-300`}></View>
							</View>
						</View>

						<View style={tw`items-end`}>
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
							<View style={tw`border border-gray-300 rounded-md p-3`}></View>
						</View>
						<View style={tw`flex-1 mx-2`}>
							<Text style={tw`text-sm text-gray-500 mb-1`}>Time</Text>
							<View style={tw`border border-gray-300 rounded-md p-3`}></View>
						</View>
					</View>

					<View style={tw`flex-row mb-4`}>
						<View style={tw`flex-1 mr-2`}>
							<Text style={tw`text-sm text-gray-500 mb-1`}>Flight</Text>
							<View style={tw`rounded-md p-3`}>
								<Text>{flightDetails.flightNumber}</Text>
							</View>
						</View>
						<View style={tw`flex-1 mx-2`}>
							<Text style={tw`text-sm text-gray-500 mb-1`}>Gate</Text>
							<View style={tw`rounded-md p-3`}></View>
						</View>
						<View style={tw`flex-1 ml-2`}>
							<Text style={tw`text-sm text-gray-500 mb-1`}>Seat</Text>
							<View style={tw`rounded-md p-3`}></View>
						</View>
					</View>

					<View style={tw`items-center my-6`}>
						<View
							style={tw`w-48 h-48 bg-white border border-gray-200 rounded-lg items-center justify-center`}
						>
							{/* QR Code placeholder */}
							<View style={tw`w-40 h-40 bg-gray-100`}></View>
						</View>
					</View>
				</View>

				<View style={tw`flex-1`}></View>

				<ContinueButton
					text="Download"
					onPress={handleDownload}
					disabled={false}
				/>
				<TouchableOpacity onPress={handleBookAnother}>
					<Text style={tw`text-pink-500 font-medium text-center`}>
						Book another flight
					</Text>
				</TouchableOpacity>

				<View style={tw`h-20`} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default TicketConfirmationScreen;
