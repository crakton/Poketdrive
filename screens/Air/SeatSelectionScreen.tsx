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

	const [seatRows, setSeatRows] = useState<any[][]>([]);

	useEffect(() => {
		const newSeatRows: any[][] = [];
		let currentRow: any[] = [];

		seats.forEach((seat, index) => {
			const seatStatus =
				!bookingData.isTour && seat.status !== "emergency"
					? "reserved"
					: seat.status;

			const seatLabel =
				seat.label ||
				`${Math.floor(index / 4) + 1}${String.fromCharCode(65 + (index % 4))}`;

			const seatWithId = {
				...seat,
				id: seat.id || seatLabel, // ✅ Ensure unique ID
				label: seatLabel,
				isSelected: false,
				status: seatStatus,
			};

			currentRow.push(seatWithId);

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
		if (seat.status === "reserved" || seat.status === "emergency") {
			return;
		}

		const updatedRows = seatRows.map((row) =>
			row.map((s) => ({ ...s, isSelected: false }))
		);

		updatedRows[rowIndex][seatIndex].isSelected = true;

		setSeatRows(updatedRows);
		setSelectedSeatId(seat.id);
	};

	const handleSelectPress = () => {
		const updatedBookingData = {
			...bookingData,
			selectedSeat: selectedSeatId,
		};

		navigation.navigate("PassengerDetails", updatedBookingData);
	};

	const getBackgroundColor = (seat: any) => {
		if (seat.isSelected) return "#FF713B";

		switch (seat.status) {
			case "emergency":
				return "#E5E5E5";
			case "reserved":
				return "#333333";
			default:
				return "#F1F4F9";
		}
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
					{seatRows.map((row, rowIndex) => (
						<View
							key={`row-${rowIndex}`}
							style={tw`flex-row justify-center mb-4`}
						>
							{row.map((seat, seatIndex) => (
								<TouchableOpacity
									key={`seat-${seat.id}`}
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
										{seat.label}
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
