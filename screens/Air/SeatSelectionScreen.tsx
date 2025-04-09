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

	// Get available schedule based on selected index
	const availableSchedule =
		bookingData.selectedFlight.availableSchedules[bookingData.scheduledIndex];
	const seats = availableSchedule.availableSeats;

	const [seatRows, setSeatRows] = useState<any[][]>([]);

	// Process seat layout for both shared and non-shared flights
	useEffect(() => {
		// Organize seats into rows
		const newSeatRows: any[][] = [];
		let currentRow: any[] = [];

		seats.forEach((seat, index) => {
			// For non-shared flights, mark all seats as reserved except emergency ones
			const seatStatus =
				!bookingData.isTour && seat.status !== "emergency"
					? "reserved"
					: seat.status;

			currentRow.push({
				...seat,
				isSelected: false,
				status: seatStatus,
			});

			if ((index + 1) % 4 === 0) {
				newSeatRows.push(currentRow);
				currentRow = [];
			}
		});

		if (currentRow.length > 0) {
			newSeatRows.push(currentRow);
		}

		setSeatRows(newSeatRows);
	}, [seats, bookingData.isTour]);

	const handleSeatSelect = (seat: any, rowIndex: number, seatIndex: number) => {
		// Don't allow selection if seat is reserved or emergency
		if (seat.status === "reserved" || seat.status === "emergency") {
			return;
		}

		// Create a new copy of seat rows
		const updatedRows = [...seatRows];

		// Deselect all seats first (to ensure only one is selected)
		updatedRows.forEach((row) => {
			row.forEach((s) => {
				s.isSelected = false;
			});
		});

		// Then select the clicked seat
		updatedRows[rowIndex][seatIndex].isSelected = true;

		// Update state
		setSeatRows(updatedRows);
		setSelectedSeatId(seat.id);
	};

	const handleSelectPress = () => {
		// Add selected seat to booking data
		const updatedBookingData = {
			...bookingData,
			selectedSeat: selectedSeatId,
		};

		// Navigate to next screen with updated booking data
		navigation.navigate("PassengerDetails", updatedBookingData);
	};

	const getBackgroundColor = (seat: any) => {
		if (seat.isSelected) {
			return "#FF713B"; // Orange for selected
		}

		switch (seat.status) {
			case "emergency":
				return "#E5E5E5"; // Light gray for emergency
			case "reserved":
				return "#333333"; // Dark for reserved
			default:
				return "#F1F4F9"; // Light blue-gray for available
		}
	};

	const getTextColor = (seat: any) => {
		if (seat.isSelected) {
			return "white";
		}
		return seat.status === "reserved" ? "white" : "black";
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View style={tw`flex-1 px-5 pt-4`}>
				{/* Legend */}
				<View style={tw`flex-row justify-center mb-8`}>
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
					{seatRows.map((row, rowIndex) => (
						<View
							key={`row-${rowIndex}`}
							style={tw`flex-row justify-center mb-4`}
						>
							{row.map((seat, seatIndex) => (
								<TouchableOpacity
									key={`seat-${rowIndex}-${seatIndex}`}
									style={[
										tw`w-14 h-14 mx-2 rounded-md items-center justify-center`,
										{ backgroundColor: getBackgroundColor(seat) },
									]}
									onPress={() => handleSeatSelect(seat, rowIndex, seatIndex)}
									disabled={
										seat.status === "reserved" || seat.status === "emergency"
									}
								>
									<Text
										style={[
											tw`font-medium text-center`,
											{ color: getTextColor(seat) },
										]}
									>
										{seat.label ||
											`${rowIndex + 1}${String.fromCharCode(65 + seatIndex)}`}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					))}
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
