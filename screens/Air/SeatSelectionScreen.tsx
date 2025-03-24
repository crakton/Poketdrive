import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from "react-native";
import tw from "twrnc";
import Svg, { Polygon } from "react-native-svg";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useAirContext } from "../../hooks/air/useAirContext";

const SeatSelectionScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { selectedSeat, setSelectedSeat } = useAirContext();

	// Seat layout data
	const rows = [
		["1A", "1A", null, "1A", "1B"],
		["1A", "1A", null, "1A", "1B"],
	];

	const handleSeatSelect = (seat: string) => {
		setSelectedSeat(seat);
	};

	const handleConfirm = () => {
		// Navigate to the next screen with the selected seat
		navigation.navigate("FlightDetailsScreen");
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />
			<View style={tw`flex-1 p-4`}>
				<Text style={tw`text-2xl font-bold mb-6`}>Choose Seat</Text>

				{/* Legend */}
				<View style={tw`flex-row mb-8`}>
					<View style={tw`flex-row items-center mr-4`}>
						<View style={tw`w-3 h-3 rounded-full bg-orange-500 mr-2`}></View>
						<Text style={tw`text-sm`}>Selected</Text>
					</View>
					<View style={tw`flex-row items-center mr-4`}>
						<View style={tw`w-3 h-3 rounded-full bg-gray-300 mr-2`}></View>
						<Text style={tw`text-sm`}>Emergency Exit</Text>
					</View>
					<View style={tw`flex-row items-center`}>
						<View style={tw`w-3 h-3 rounded-full bg-gray-800 mr-2`}></View>
						<Text style={tw`text-sm`}>Reserved</Text>
					</View>
				</View>

				{/* Aircraft nose illustration */}
				<View style={tw`items-center mb-8`}>
					<Svg height="48" width="128">
						<Polygon points="25.6,0 102.4,0 128,48 0,48" fill="gray" />
					</Svg>
				</View>
			</View>

			{/* Seat grid */}
			<View style={tw`mb-8`}>
				{rows.map((row, rowIndex) => (
					<View
						key={`row-${rowIndex}`}
						style={tw`flex-row justify-center mb-4`}
					>
						{row.map((seat, seatIndex) =>
							seat ? (
								<TouchableOpacity
									key={`${rowIndex}-${seatIndex}`}
									style={tw`w-10 h-10 m-1 rounded-md items-center justify-center ${
										selectedSeat === seat ? "bg-orange-500" : "bg-gray-100"
									}`}
									onPress={() => handleSeatSelect(seat)}
								>
									<Text
										style={tw`${
											selectedSeat === seat ? "text-white" : "text-black"
										}`}
									>
										{seat}
									</Text>
								</TouchableOpacity>
							) : (
								<View
									key={`space-${rowIndex}-${seatIndex}`}
									style={tw`w-10 h-10 m-1`}
								/>
							)
						)}
					</View>
				))}
			</View>

			<View style={tw`flex-1`}></View>

			{/* Confirm button */}
			<TouchableOpacity
				style={tw`bg-orange-500 rounded-md py-4 items-center`}
				onPress={handleConfirm}
			>
				<Text style={tw`text-white font-medium text-lg`}>Select</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default SeatSelectionScreen;
