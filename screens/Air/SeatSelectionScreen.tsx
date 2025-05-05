import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import tw from "twrnc";
import Svg, { Path } from "react-native-svg";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { IBookingData } from "../../types/airline";
import CustomButton from "@components/ui/CustomButton";

const SeatSelectionScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const bookingData = useRoute().params as IBookingData;
	const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);

	const availableSchedule =
		bookingData.selectedFlight.availableSchedules[bookingData.scheduledIndex];
	const seats = availableSchedule.availableSeats;

	const handleSeatSelect = (seat: string) => {
		setSelectedSeatId(seat);
	};

	const handleSelectPress = () => {
		const updatedBookingData = {
			...bookingData,
			selectedSeat: selectedSeatId,
		};

		navigation.navigate("PassengerDetails", updatedBookingData);
	};

	const getBackgroundColor = (seat: any) => {
		if (!bookingData.isTour) return "#4B5563";
		if (seat === selectedSeatId) return "#FF713B";
		return "#E5E5E5";
	};

	const getTextColor = (seat: any) =>
		seat.isSelected || seat.status === "reserved" ? "white" : "black";

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View style={tw`flex-1 px-5 pt-4`}>
				{/* Legend */}
				<View style={tw`flex-row justify-center mb-8 px-3`}>
					<View style={tw`flex-row items-center mr-5`}>
						<View style={tw`w-4 h-4 rounded-full bg-orange-500 mr-2`} />
						<Text>Selected</Text>
					</View>
					<View style={tw`flex-row items-center mr-5`}>
						<View style={tw`w-4 h-4 rounded-full bg-gray-200 mr-2`} />
						<Text>Emergency Exit</Text>
					</View>
					<View style={tw`flex-row items-center`}>
						<View style={tw`w-4 h-4 rounded-full bg-gray-800 mr-2`} />
						<Text>Reserved</Text>
					</View>
				</View>

				{/* Aircraft nose */}
				<View style={tw`items-center mb-10`}>
					<Svg height="120" width="180" viewBox="0 0 180 120">
						<Path
							d="M30,20 L150,20 L170,70 L150,120 L30,120 L10,70 Z"
							fill="#E5E5E5"
						/>
					</Svg>
				</View>

				{/* Seat layout */}
				<View style={tw`flex-1`}>
					{/* first row */}
					<View style={tw`flex-row justify-center mb-4`}>
						{seats.slice(0, 4).map((seat, index) => (
							<TouchableOpacity
								key={index}
								style={tw`w-12 h-12 rounded-lg items-center justify-center mx-2`}
								onPress={() => handleSeatSelect(seat)}
							>
								<View
									style={[
										tw`w-full h-full rounded-lg items-center justify-center`,
										{
											backgroundColor: getBackgroundColor(seat),
										},
									]}
								>
									<Text
										style={{
											color: getTextColor(seat),
											fontWeight: "bold",
										}}
									>
										{seat}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
					{/* second row */}
					<View style={tw`flex-row justify-center mb-4`}>
						{seats.slice(4, seats.length).map((seat, index) => (
							<TouchableOpacity
								key={index}
								style={tw`w-12 h-12 rounded-lg items-center justify-center mx-2`}
								onPress={() => handleSeatSelect(seat)}
							>
								<View
									style={[
										tw`w-full h-full rounded-lg items-center justify-center`,
										{
											backgroundColor: getBackgroundColor(seat),
										},
									]}
								>
									<Text
										style={{
											color: getTextColor(seat),
											fontWeight: "bold",
										}}
									>
										{seat}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* Select button */}
				<View style={tw`mt-auto mb-6`}>
					<CustomButton
						text="Select"
						onPress={handleSelectPress}
						disabled={bookingData.isTour && selectedSeatId === null}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SeatSelectionScreen;
