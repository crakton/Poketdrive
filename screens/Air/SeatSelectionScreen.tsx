import React, { useMemo, useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import tw from "twrnc";
import Svg, { Path } from "react-native-svg";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useAirContext } from "../../hooks/air/useAirContext";
import ContinueButton from "../../components/ui/ContinueButton";
import { IBookingData, IFlight, ISearchFlight } from "../../types/airline";
import CustomButton from "../../components/ui/CustomButton";

const SeatSelectionScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { selectedSeat, setSelectedSeat } = useAirContext(); // From context
	const bookingData = useRoute().params as IBookingData;

	// Get available schedule based on selected index
	const availableSchedule =
		bookingData.selectedFlight.availableSchedules[bookingData.scheduledIndex];
	const seats = availableSchedule.availableSeats;

	const [seatRows, setSeatRows] = useState<any[][]>([]);

	// Only process seat layout if this is a shared flight
	useEffect(() => {
		if (bookingData.isSharedFlight) {
			// Your existing seat organization code
			const newSeatRows: any[][] = [];
			let currentRow: any[] = [];
			seats.forEach((seat, index) => {
				currentRow.push({ ...seat, isSelected: false });
				if ((index + 1) % 4 === 0) {
					newSeatRows.push(currentRow);
					currentRow = [];
				}
			});
			if (currentRow.length > 0) {
				newSeatRows.push(currentRow);
			}
			setSeatRows(newSeatRows);
		} else {
			setSeatRows([]);
		}
	}, [seats, bookingData.isSharedFlight]);

	const handleSeatSelect = (seat, rowIndex, seatIndex) => {
		if (!bookingData.isSharedFlight) return; // Ignore if not a shared flight
		const updatedRows = [...seatRows];
		updatedRows[rowIndex][seatIndex].isSelected =
			!updatedRows[rowIndex][seatIndex].isSelected;
		setSeatRows(updatedRows);
		const selectedSeat = updatedRows[rowIndex][seatIndex].isSelected
			? updatedRows[rowIndex][seatIndex].id
			: null;
		setSelectedSeat(selectedSeat); // Update context with selected seat
		// Update booking data with selected seat
		bookingData.selectedSeatId = selectedSeat;
	};

	const handleSelectPress = () => {
		// Pass the updated booking data to the next screen
		navigation.navigate("PassengerDetails", bookingData);
	};

	const getBackgroundColor = (status: string) => {
		switch (status) {
			case "emergency":
				return "#E5E5E5"; // Light gray for emergency
			case "reserved":
				return "#333333"; // Dark for reserved
			default:
				return "#F1F4F9"; // Light blue-gray for available
		}
	};

	const getTextColor = (status: string) => {
		return status === "selected" ? "white" : "black";
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
							{row.map((seat, seatIndex) => {
								if (bookingData?.isSharedFlight) {
									return (
										<TouchableOpacity
											key={`seat-${rowIndex}-${seatIndex}`}
											style={[
												tw`w-14 h-14 mx-2 rounded-md items-center justify-center`,
												{
													backgroundColor: seat.isSelected
														? "#FF713B"
														: getBackgroundColor(seat.status),
												},
											]}
											onPress={() =>
												handleSeatSelect(seat, rowIndex, seatIndex)
											}
										>
											<Text
												style={[
													tw`font-medium text-center`,
													{ color: getTextColor(seat.status) },
												]}
											>
												{seats[seatIndex]}
											</Text>
										</TouchableOpacity>
									);
								} else {
									return (
										<View
											key={`space-${rowIndex}-${seatIndex}`}
											style={tw`w-14 h-14 mx-2 rounded-md items-center justify-center bg-gray-400`}
										>
											<Text>{seat}</Text>
										</View>
									);
								}
							})}
						</View>
					))}
				</View>

				{/* Select button */}
				<View style={tw`mt-auto mb-6`}>
					<CustomButton
						text="Select"
						onPress={handleSelectPress}
						disabled={false}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SeatSelectionScreen;
