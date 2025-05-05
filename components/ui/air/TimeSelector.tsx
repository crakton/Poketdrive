import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";

interface TimeSelectorProps {
	timeOptions: string[];
	selectedTime: string;
	onSelectTime: (index: number, time: string) => void;
}

const TimeSelector = ({
	timeOptions,
	selectedTime,
	onSelectTime,
}: TimeSelectorProps) => {
	return (
		<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
			<Text style={tw`text-base font-medium mb-3`}>Departure time</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={tw`gap-2`}
			>
				{timeOptions.map((time, idx) => (
					<TouchableOpacity
						key={time.toString()}
						style={tw`px-6 py-2 rounded-md ${
							selectedTime === time ? "bg-[#FF6633]" : "bg-gray-100"
						}`}
						onPress={() => onSelectTime(idx, time.toString())}
					>
						<Text
							style={tw`${
								selectedTime === time ? "text-white" : "text-black"
							} text-center`}
						>
							{time.toString()}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

export default TimeSelector;
