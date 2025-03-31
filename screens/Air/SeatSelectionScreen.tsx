import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import tw from "twrnc";
import Svg, { Path } from "react-native-svg";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useAirContext } from "../../hooks/air/useAirContext";
import ContinueButton from "../../components/ui/ContinueButton";

const SeatSelectionScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { selectedSeat, setSelectedSeat } = useAirContext();

	// Seat layout data matching the image exactly
	const [seatRows] = React.useState([
		[
			{ id: "1A", status: "available", isSelected: false },
			{ id: "1B", status: "available", isSelected: false },
			null,
			{ id: "1C", status: "available", isSelected: false },
			{ id: "1D", status: "available", isSelected: false },
		],
		[
			{ id: "2A", status: "available", isSelected: false },
			{ id: "2B", status: "available", isSelected: false },
			null,
			{ id: "2C", status: "available", isSelected: false },
			{ id: "2D", status: "available", isSelected: false },
		],
	]);

	const handleSeatSelect = (
		seat: { id: string; status: string; isSelected: boolean },
		rowIndex: number,
		seatIndex: number
	) => {
		if (seat.status !== "available") return;

		// Create a deep copy of the seat rows
		const updatedSeatRows = JSON.parse(JSON.stringify(seatRows));

		// First, reset any previously selected seat
		updatedSeatRows.forEach((row: any[], r: number) => {
			row.forEach((s: any, s_idx: number) => {
				if (s && s.isSelected && !(r === rowIndex && s_idx === seatIndex)) {
					s.isSelected = false;
				}
			});
		});

		// Toggle the clicked seat
		updatedSeatRows[rowIndex][seatIndex].isSelected =
			!updatedSeatRows[rowIndex][seatIndex].isSelected;

		if (updatedSeatRows[rowIndex][seatIndex].isSelected) {
			setSelectedSeat(updatedSeatRows[rowIndex][seatIndex].id);
		} else {
			setSelectedSeat("");
		}
	};

	console.log("selected");

	const handleSelectPress = () => {
		navigation.navigate("PassengerDetails");
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
							{row.map((seat, seatIndex) =>
								seat ? (
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
										onPress={() => handleSeatSelect(seat, rowIndex, seatIndex)}
									>
										<Text
											style={[
												tw`font-medium text-center`,
												{ color: getTextColor(seat.status) },
											]}
										>
											{seat.id}
										</Text>
									</TouchableOpacity>
								) : (
									<View
										key={`space-${rowIndex}-${seatIndex}`}
										style={tw`w-14 mx-2`}
									/>
								)
							)}
						</View>
					))}
				</View>

				{/* Select button */}
				<View style={tw`mt-auto mb-6`}>
					<ContinueButton
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
