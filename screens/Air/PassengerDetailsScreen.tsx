import React, { useCallback, useMemo, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	TextInput,
	ScrollView,
	Image,
} from "react-native";
import tw from "twrnc";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { useAirContext } from "../../hooks/air/useAirContext";
import { RootStackParamList } from "../../types";
import ContinueButton from "../../components/ui/ContinueButton";
import Icon from "@expo/vector-icons/Feather";
import { TPassengerDTO } from "../../types/dtos/flightDto";
import { FontAwesome5 } from "@expo/vector-icons";
import { IFlight, ISearchFlight } from "../../types/airline";
import AirService from "../../services/airService";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/ui/CustomButton";

const PassengerDetailsScreen = () => {
	const airServices = new AirService(useQueryClient());
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { params } = useRoute();
	const [isLoading, setIsLoading] = useState(false);

	// Initialize with a default passenger
	const [passengers, setPassengers] = useState<TPassengerDTO[]>([
		{
			name: "",
			email: "passenger1@example.com", // Default email for first passenger
			address: "",
			dateOfBirth: "",
			passportNumber: "",
			country: "",
		},
	]);

	const [activePassenger, setActivePassenger] = useState<string>(
		passengers[0]?.email || ""
	);

	const flight = params.flight as ISearchFlight;
	const scheduledIndex = params.scheduledIndex as number;
	const isSharedFlight = params.isSharedFlight as boolean;
	const selectedFlight = params.selectedFlight as IFlight;
	const availableSchedules = selectedFlight.availableSchedules[scheduledIndex];

	//calculate price by number of seat
	const calculateFlightPrice = useMemo(() => {
		return selectedFlight.fixedPrice * availableSchedules.totalSeats;
	}, [selectedFlight.fixedPrice, availableSchedules.totalSeats]);

	const handleInputChange = useCallback(
		(field: string, value: string) => {
			setPassengers((current) =>
				current.map((p) =>
					p.email === activePassenger ? { ...p, [field]: value } : p
				)
			);
		},
		[activePassenger]
	);

	const addPassenger = useCallback(() => {
		const newPassengerEmail = `passenger${passengers.length + 1}@example.com`;
		setPassengers((current) => [
			...current,
			{
				name: "",
				email: newPassengerEmail,
				address: "",
				dateOfBirth: "",
				passportNumber: "",
				country: "",
			},
		]);
		setActivePassenger(newPassengerEmail);
	}, [passengers]);

	const selectPassenger = useCallback((email: string) => {
		setActivePassenger(email);
	}, []);

	// Validates if a passenger has all required fields filled
	const validatePassenger = (passenger: TPassengerDTO): boolean => {
		if (!passenger.name || passenger.name.trim() === "") {
			Toast.show({
				type: "error",
				text1: "Please enter passenger name",
			});
			return false;
		}
		if (!passenger.address || passenger.address.trim() === "") {
			Toast.show({
				type: "error",
				text1: "Please enter passenger address",
			});
			return false;
		}
		if (!passenger.dateOfBirth || passenger.dateOfBirth.trim() === "") {
			Toast.show({
				type: "error",
				text1: "Please enter passenger date of birth",
			});
			return false;
		}
		if (!passenger.passportNumber || passenger.passportNumber.trim() === "") {
			Toast.show({
				type: "error",
				text1: "Please enter passenger passport number",
			});
			return false;
		}
		if (!passenger.country || passenger.country.trim() === "") {
			Toast.show({
				type: "error",
				text1: "Please enter passenger country",
			});
			return false;
		}
		return true;
	};

	const handleBook = useCallback(async () => {
		try {
			// Get current active passenger data
			const currentPassenger =
				passengers.find((p) => p.email === activePassenger) || passengers[0];

			// ensures that current passenger details are provided
			if (!validatePassenger(currentPassenger)) {
				return;
			}

			// If shared flight, validate all passengers
			if (isSharedFlight) {
				for (const passenger of passengers) {
					if (!validatePassenger(passenger)) {
						return;
					}
				}
			}

			// checks if the flight booking type
			setIsLoading(true);

			if (!isSharedFlight) {
				// handles booking full flight with multiple passengers
				const payload = {
					passengerInfo: {
						name: passengers[0].name,
						address: passengers[0].address,
						email: passengers[0].email,
						dateOfBirth: passengers[0].dateOfBirth.replaceAll("/", "-"),
						passportNumber: passengers[0].passportNumber,
						country: passengers[0].country,
					},
					scheduleIndex: scheduledIndex,
				};

				console.log(payload);

				const data = await airServices.bookFullFlight({
					id: flight._id,
					payload,
				});

				navigation.navigate("Payments", data);
			} else if (isSharedFlight) {
				// handles booking for single passenger
				const data = await airServices.bookAndShareFlight({
					id: flight._id,
					payload: {
						passengerInfo: {
							address: currentPassenger.address,
							country: currentPassenger.country,
							dateOfBirth: currentPassenger.dateOfBirth,
							name: currentPassenger.name,
							passportNumber: currentPassenger.passportNumber,
						},
						scheduleIndex: scheduledIndex,
					},
				});

				navigation.navigate("Payments", data);
			}
		} catch (error) {
			const e = error as Error;

			console.log("error");
			console.log(error);

			Toast.show({
				type: "error",
				text1: e.message,
			});
		} finally {
			setIsLoading(false);
		}
	}, [passengers, activePassenger, flight, scheduledIndex, isSharedFlight]);

	// Get current active passenger data
	const currentPassenger =
		passengers.find((p) => p.email === activePassenger) || passengers[0];

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />

			<View style={tw`px-4 py-6 items-center`}>
				<Text style={tw`text-xl font-semibold`}>Personal Info</Text>
			</View>

			<ScrollView contentContainerStyle={tw`flex-grow px-4`}>
				<View style={tw`items-center mb-6 flex-row justify-between`}>
					<View style={tw`flex-1`} />
					<View style={tw`items-center flex-1`}>
						<View
							style={tw`w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-2`}
						>
							<Image
								source={{ uri: "https://via.placeholder.com/200" }}
								style={tw`w-full h-full`}
							/>
						</View>
						<Text style={tw`text-lg font-medium`}>
							Hello Traveller {currentPassenger?.name || ""}
						</Text>
					</View>

					<View style={tw`flex-1 items-end`}>
						{isSharedFlight && (
							<TouchableOpacity
								style={tw`w-12 h-12 rounded-full bg-orange-500 items-center justify-center`}
								onPress={addPassenger}
							>
								<FontAwesome5 name="plus" size={24} color="#fff" />
							</TouchableOpacity>
						)}
					</View>
				</View>

				{/* Passenger selector tabs */}
				{isSharedFlight && passengers.length > 1 && (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={tw`flex-row mb-4`}
					>
						{passengers.map((passenger) => (
							<TouchableOpacity
								key={passenger.email}
								style={tw`px-4 py-2 mr-2 rounded-full ${
									activePassenger === passenger?.email
										? "bg-[#FF6633]"
										: "bg-gray-200"
								}`}
								onPress={() => selectPassenger(passenger?.email!)}
							>
								<Text
									style={tw`${
										activePassenger === passenger.email
											? "text-white"
											: "text-gray-800"
									}`}
								>
									{passenger.name ||
										`Traveller ${passengers.indexOf(passenger) + 1}`}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				)}

				<View style={tw`mb-4`}>
					<Text style={tw`text-gray-600 mb-1`}>Name</Text>
					<View
						style={tw`flex-row items-center border border-gray-300 rounded-md px-4 py-4 mb-4`}
					>
						<Icon name="user" size={20} color="#777" style={tw`mr-3`} />
						<TextInput
							style={tw`flex-1`}
							placeholder="Enter your Name"
							value={currentPassenger?.name || ""}
							onChangeText={(text) => handleInputChange("name", text)}
						/>
					</View>

					<Text style={tw`text-gray-600 mb-1`}>Address</Text>
					<View
						style={tw`flex-row items-center border border-gray-300 rounded-md px-4 py-4 mb-4`}
					>
						<Icon name="map-pin" size={20} color="#777" style={tw`mr-3`} />
						<TextInput
							style={tw`flex-1`}
							placeholder="Enter your address"
							value={currentPassenger?.address || ""}
							onChangeText={(text) => handleInputChange("address", text)}
						/>
					</View>

					<Text style={tw`text-gray-600 mb-1`}>Passport</Text>
					<View
						style={tw`flex-row items-center border border-gray-300 rounded-md px-4 py-4 mb-4`}
					>
						<Icon name="credit-card" size={20} color="#777" style={tw`mr-3`} />
						<TextInput
							style={tw`flex-1`}
							placeholder="Enter your passport number"
							value={currentPassenger?.passportNumber || ""}
							onChangeText={(text) => handleInputChange("passportNumber", text)}
						/>
					</View>

					<Text style={tw`text-gray-600 mb-1`}>DOB</Text>
					<View
						style={tw`flex-row items-center border border-gray-300 rounded-md px-4 py-4 mb-4`}
					>
						<Icon name="calendar" size={20} color="#777" style={tw`mr-3`} />
						<TextInput
							style={tw`flex-1`}
							placeholder="DOB"
							value={currentPassenger?.dateOfBirth || ""}
							onChangeText={(text) => handleInputChange("dateOfBirth", text)}
						/>
					</View>

					<Text style={tw`text-gray-600 mb-1`}>Country</Text>
					<View
						style={tw`flex-row items-center border border-gray-300 rounded-md px-4 py-4 mb-4`}
					>
						<Icon name="flag" size={20} color="#777" style={tw`mr-3`} />
						<TextInput
							style={tw`flex-1`}
							placeholder="Country"
							value={currentPassenger?.country || ""}
							onChangeText={(text) => handleInputChange("country", text)}
						/>
					</View>
				</View>
			</ScrollView>

			<View style={tw`px-4 pb-6`}>
				<CustomButton
					text={isLoading ? "BOOKING..." : "BOOK"}
					onPress={handleBook}
					disabled={isLoading}
					loading={isLoading}
				/>
			</View>
		</SafeAreaView>
	);
};

export default PassengerDetailsScreen;
