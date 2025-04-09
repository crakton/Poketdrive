import PageLoader from "@components/ui/PageLoader";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { findFlights } from "@redux/features/flightSllice";
import { useAppDispatch } from "@redux/store";
import AirService from "@services/airService";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import {
	Platform,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../types";

const TravelsScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [passengers, setPassengers] = useState(1);
	const [fromLocation, setFromLocation] = useState("");
	const [toLocation, setToLocation] = useState("");
	// Date picker states
	const [departureDate, setDepartureDate] = useState<Date | null>(null);
	const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
	const [showDeparturePicker, setShowDeparturePicker] = useState(false);
	const [showArrivalPicker, setShowArrivalPicker] = useState(false);

	const handleDecreasePassenger = useCallback(() => {
		if (passengers > 1) {
			setPassengers(passengers - 1);
		}
	}, [passengers]);

	const handleIncreasePassenger = useCallback(() => {
		if (passengers < 8) {
			setPassengers(passengers + 1);
		}
		return;
	}, [passengers]);

	const handleSwapLocations = useCallback(() => {
		const tempFrom = fromLocation;
		setFromLocation(toLocation);
		setToLocation(tempFrom);
	}, [fromLocation, toLocation]);

	const onChangeDepartureDate = useCallback(
		(selectedDate: Date | undefined) => {
			const currentDate = selectedDate || new Date();
			setShowDeparturePicker(Platform.OS === "ios");
			setDepartureDate(currentDate);
		},
		[]
	);

	const onChangeArrivalDate = useCallback((selectedDate: Date | undefined) => {
		const currentDate = selectedDate || new Date();
		setShowArrivalPicker(Platform.OS === "ios");
		setArrivalDate(currentDate);
	}, []);

	const showDepartureMode = useCallback(() => {
		setShowDeparturePicker(true);
	}, []);

	const showArrivalMode = useCallback(() => {
		setShowArrivalPicker(true);
	}, []);

	const formatDate = useCallback((date: Date | null) => {
		if (!date) return "Select Date";
		return date.toLocaleDateString();
	}, []);

	const airServices = new AirService(useQueryClient());

	/* handle fetching of flighs before routing to search result screen */
	const handleFindFlight = useCallback(async () => {
		if (fromLocation === "" || toLocation === "") {
			return;
		}
		try {
			setIsLoading(true);
			const data = await airServices.findFlights({
				departureCity: fromLocation.trim(),
				destinationCity: toLocation.trim(),
			});

			dispatch(findFlights(data));
			navigation.navigate("FlightSearch");
		} catch (error) {
			const e = error as AxiosError;
			Toast.show({
				text1: "Search failed",
				type: "error",
				text2: e?.response?.data.message as string,
			});
		} finally {
			setIsLoading(false);
		}
	}, [fromLocation, toLocation]);

	return (
		<SafeAreaView style={tw`flex-1 bg-gray-100`}>
			{isLoading && <PageLoader />}
			<ScrollView style={tw`flex-grow pt-3`}>
				<View style={tw`p-4`}>
					<Text style={tw`text-2xl`}>
						<Text style={tw`font-bold text-orange-500`}>Jet Share</Text>
						<Text style={tw`font-bold text-blue-900`}> option</Text>
					</Text>
					<Text style={tw`font-bold text-blue-900 text-2xl`}>
						now available!
					</Text>

					{/* Location selection */}
					<View
						style={tw`mt-4 flex-1 flex-row items-center justify-between bg-white p-4 rounded-lg`}
					>
						<View style={tw`flex-col flex-1 items-center`}>
							<TouchableOpacity style={tw`flex-row items-center`}>
								<Ionicons
									name="location-outline"
									size={20}
									color="#999"
									style={tw`mr-2`}
								/>
								<TextInput
									value={fromLocation}
									onChangeText={setFromLocation}
									placeholder="From where?"
									style={tw`text-gray-400 py-2 flex-1`}
								/>
							</TouchableOpacity>
							<TouchableOpacity style={tw`flex-row items-center`}>
								<Ionicons
									name="location-outline"
									size={20}
									color="#999"
									style={tw`mr-2`}
								/>
								<TextInput
									value={toLocation}
									onChangeText={setToLocation}
									placeholder="Where to?"
									style={tw`text-gray-400 py-2 flex-1`}
								/>
							</TouchableOpacity>
						</View>
						<TouchableOpacity onPress={handleSwapLocations}>
							<Ionicons name="swap-vertical-outline" size={20} color="#000" />
						</TouchableOpacity>
					</View>

					{/* Date selection */}
					<TouchableOpacity
						onPress={showDepartureMode}
						style={tw`mt-2 bg-white p-4 rounded-lg flex-row items-center`}
					>
						<Ionicons
							name="calendar-outline"
							size={20}
							color="#999"
							style={tw`mr-2`}
						/>
						<Text style={tw`text-gray-400`}>Date of departure</Text>
						<Text style={tw`ml-auto`}>{formatDate(departureDate)}</Text>
						{showDeparturePicker && (
							<DateTimePicker
								testID="dateTimePicker"
								// value={departureDate || new Date()}
								mode="date"
								is24Hour={true}
								display="default"
								onChange={onChangeDepartureDate}
							/>
						)}
					</TouchableOpacity>
					<TouchableOpacity
						onPress={showArrivalMode}
						style={tw`mt-2 bg-white p-4 rounded-lg flex-row items-center`}
					>
						<Ionicons
							name="calendar-outline"
							size={20}
							color="#999"
							style={tw`mr-2`}
						/>
						<Text style={tw`text-gray-400`}>Date of arrival</Text>
						<Text style={tw`ml-auto`}>{formatDate(arrivalDate)}</Text>
						{showArrivalPicker && (
							<DateTimePicker
								testID="dateTimePicker"
								value={arrivalDate || new Date()}
								mode="date"
								is24Hour={true}
								display="default"
								onChange={onChangeArrivalDate}
							/>
						)}
					</TouchableOpacity>

					{/* Passengers selector */}
					<View
						style={tw`mt-2 bg-white p-4 rounded-lg flex-row items-center justify-between`}
					>
						<View style={tw`flex-row items-center`}>
							<Ionicons
								name="people-outline"
								size={20}
								color="#999"
								style={tw`mr-2`}
							/>
							<Text>Passengers</Text>
						</View>
						<View style={tw`flex-row items-center`}>
							<TouchableOpacity
								onPress={handleDecreasePassenger}
								style={tw`p-2`}
							>
								<Text style={tw`text-lg font-bold`}>−</Text>
							</TouchableOpacity>
							<Text style={tw`mx-4`}>{passengers}</Text>
							<TouchableOpacity
								onPress={handleIncreasePassenger}
								style={tw`p-2`}
							>
								<Text style={tw`text-lg font-bold`}>+</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* Find button */}
					<TouchableOpacity
						onPress={handleFindFlight}
						style={tw`mt-4 bg-orange-500 p-4 rounded-lg items-center`}
					>
						<Text style={tw`text-white font-bold`}>Find</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default TravelsScreen;
