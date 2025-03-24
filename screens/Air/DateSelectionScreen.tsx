import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
} from "react-native";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const DateSelectionScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [selectedDate, setSelectedDate] = useState<string | null>("24");

	// Current month data
	const currentMonth = {
		name: "July 2022",
		days: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
		startDay: 0, // Monday
	};

	// Next month data
	const nextMonth = {
		name: "August 2022",
		days: Array.from({ length: 21 }, (_, i) => (i + 1).toString()),
		startDay: 0, // Monday
	};

	const handleDateSelect = (date: string) => {
		setSelectedDate(date);
	};

	const handleApply = () => {
		// Navigate to the next screen with the selected date
		navigation.navigate("SeatSelectionScreen");
	};

	const renderCalendar = (month: {
		name: string;
		days: string[];
		startDay: number;
	}) => {
		const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

		return (
			<View style={tw`mb-6`}>
				<Text style={tw`text-lg font-semibold mb-2`}>{month.name}</Text>

				{/* Days of week header */}
				<View style={tw`flex-row justify-between mb-2`}>
					{daysOfWeek.map((day, index) => (
						<Text key={index} style={tw`text-xs text-gray-500 w-9 text-center`}>
							{day}
						</Text>
					))}
				</View>

				{/* Calendar grid */}
				<View style={tw`flex-row flex-wrap`}>
					{/* Empty spaces for starting day offset */}
					{Array.from({ length: month.startDay }).map((_, index) => (
						<View key={`empty-${index}`} style={tw`w-9 h-9 m-0.5`} />
					))}

					{/* Actual days */}
					{month.days.map((day) => (
						<TouchableOpacity
							key={`${month.name}-${day}`}
							style={tw`w-9 h-9 items-center justify-center m-0.5 rounded-md ${
								selectedDate === day ? "bg-orange-500" : "bg-transparent"
							}`}
							onPress={() => handleDateSelect(day)}
						>
							<Text
								style={tw`${
									selectedDate === day ? "text-white" : "text-black"
								}`}
							>
								{day}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />
			<View style={tw`flex-1 p-4`}>
				<View style={tw`flex-row justify-between items-center mb-6`}>
					<Text style={tw`text-2xl font-bold`}>Select a date</Text>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Text style={tw`text-2xl`}>×</Text>
					</TouchableOpacity>
				</View>

				<ScrollView showsVerticalScrollIndicator={false}>
					{renderCalendar(currentMonth)}
					{renderCalendar(nextMonth)}
				</ScrollView>

				<TouchableOpacity
					style={tw`bg-orange-500 rounded-md py-4 items-center mt-4`}
					onPress={handleApply}
				>
					<Text style={tw`text-white font-medium text-lg`}>Apply</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default DateSelectionScreen;
