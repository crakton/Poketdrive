import React, { useMemo } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
} from "react-native";
import tw from "twrnc";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../types";
import { IBookingData } from "../../types/airline";
import CustomButton from "@components/ui/CustomButton";

const FlightBookingScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const bookingData = useRoute().params as IBookingData;

	console.log("bookingData", bookingData);

	// Get available schedule based on selected index
	const availableSchedule =
		bookingData.selectedFlight.availableSchedules[bookingData.scheduledIndex];

	// Calculate price (more straightforward)
	const totalPrice = bookingData.selectedFlight.fixedPrice;

	const handleConfirm = () => {
		// Pass the entire booking data object forward
		navigation.navigate("SelectSeat", bookingData);
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<ScrollView contentContainerStyle={tw`flex-grow`} style={tw`flex-1 p-4`}>
				<View style={tw`bg-white rounded-xl shadow-md mb-6`}>
					<View style={tw`py-3`}>
						<Text style={tw`text-lg font-bold text-center mb-4`}>
							{bookingData.flight.airline.name} -{" "}
							{bookingData.flight.flightNumber}
						</Text>
					</View>
					<View style={tw`border border-gray-100 border-b-1 `} />
					<View style={tw`flex-row justify-between p-3 items-center mb-6`}>
						<View style={tw`items-start`}>
							<Text style={tw`text-xl font-bold`}>
								{availableSchedule.departureTime.toString()}
							</Text>
							<Text style={tw`text-lg font-bold`}>
								{bookingData.selectedFlight.departure.code}
							</Text>
							<Text style={tw`text-sm text-gray-500`}>
								{bookingData.selectedFlight.airline.name}
							</Text>
						</View>

						<View style={tw`flex-1 items-center`}>
							<View style={tw`flex-row gap-3 items-center w-full`}>
								<View style={tw`flex-1 h-px bg-gray-300`}></View>
								<View style={tw` bg-orange-500 p-2 rounded-full`}>
									<Ionicons name="airplane" size={16} color="white" />
								</View>
								<View style={tw`flex-1 h-px bg-gray-300`}></View>
							</View>
						</View>

						<View style={tw`items-end`}>
							<Text style={tw`text-xl font-bold`}>
								{availableSchedule.arrivalTime.toString()}
							</Text>
							<Text style={tw`text-lg font-bold`}>
								{bookingData.selectedFlight.destination.code}
							</Text>
							<Text style={tw`text-sm text-gray-500`}>
								{bookingData.selectedFlight.airline.name}
							</Text>
						</View>
					</View>
					<View style={tw`border border-gray-100 border-b-1 `} />
					<View style={tw`flex-row mb-4 p-3`}>
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

					<View style={tw`py-4`}>
						<Text style={tw`text-xl font-bold text-center mt-4`}>
							Price: {totalPrice.toLocaleString("en-US")}
						</Text>
					</View>
				</View>

				<View style={tw`flex-1`}></View>

				<View style={tw`flex-row gap-3`}>
					<CustomButton
						style={tw`flex-1`}
						text="Cancel"
						variant="outlined"
						onPress={handleCancel}
					/>
					<CustomButton
						style={tw`flex-1`}
						text="Confirm"
						onPress={handleConfirm}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default FlightBookingScreen;
