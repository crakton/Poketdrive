import React, { useCallback, useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	ScrollView,
	Image,
	GestureResponderEvent,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import tw from "twrnc";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import Icon from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { IBookingData, IFlight } from "../../types/airline";
import {
	TBookFlightWithSharedSeatsDTO,
	TPassengerDTO,
} from "../../types/dtos/flightDto";
import { RootStackParamList } from "../../types";
import AirService from "@services/airService";
import CustomButton from "@components/ui/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { AxiosError, AxiosResponse } from "axios";

// Nigerian passport format: A followed by 8 digits (A12345678)
const NIGERIAN_PASSPORT_REGEX = /^[A][0-9]{8}$/;

const PassengerDetailsScreen = () => {
	const airServices = new AirService(useQueryClient());
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const bookingData = useRoute().params as IBookingData;
	const [isLoading, setIsLoading] = useState(false);

	// Initialize with a default passenger
	const [passengers, setPassengers] = useState<TPassengerDTO[]>([
		{
			name: "",
			email: "",
			address: "",
			dateOfBirth: "",
			passportNumber: "",
			country: "Nigeria", // Default to Nigeria
		},
	]);

	const [activePassenger, setActivePassenger] = useState<string>("default-0");
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const dateInputRef = useRef<TextInput>(null);

	// References for input fields to improve validation
	const nameInputRef = useRef<TextInput>(null);
	const addressInputRef = useRef<TextInput>(null);
	const emailInputRef = useRef<TextInput>(null);
	const passportInputRef = useRef<TextInput>(null);
	const countryInputRef = useRef<TextInput>(null);

	// Validation states
	const [nameError, setNameError] = useState<string | null>(null);
	const [addressError, setAddressError] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passportError, setPassportError] = useState<string | null>(null);
	const [dateError, setDateError] = useState<string | null>(null);
	const [countryError, setCountryError] = useState<string | null>(null);

	const flight = bookingData.flight;
	const scheduledIndex = bookingData.scheduledIndex as number;
	const isSharedFlight = bookingData.isTour as boolean;

	// Set unique IDs for passengers
	useEffect(() => {
		const initialPassengers = passengers.map((p, index) => ({
			...p,
			email: p.email || `default-${index}`,
		}));
		setPassengers(initialPassengers);
		setActivePassenger(initialPassengers[0].email);
	}, []);

	// Get current active passenger data
	const currentPassenger =
		passengers.find((p) => p.email === activePassenger) || passengers[0];

	const handleInputChange = useCallback(
		(field: string, value: string) => {
			// Clear corresponding error when field is updated
			switch (field) {
				case "name":
					setNameError(null);
					break;
				case "address":
					setAddressError(null);
					break;
				case "email":
					setEmailError(null);
					break;
				case "passportNumber":
					setPassportError(null);
					break;
				case "dateOfBirth":
					setDateError(null);
					break;
				case "country":
					setCountryError(null);
					break;
			}

			setPassengers((current) =>
				current.map((p) => {
					if (p.email === activePassenger) {
						if (field === "passportNumber") {
							return { ...p, [field]: value.toUpperCase() };
						} else if (field === "email") {
							// If email is updated, also update the identifier
							const oldEmail = p.email;
							const updatedPassenger = { ...p, [field]: value };

							// Update active passenger reference if email is changed
							if (oldEmail === activePassenger) {
								setTimeout(() => setActivePassenger(value), 0);
							}

							return updatedPassenger;
						} else {
							return { ...p, [field]: value };
						}
					} else {
						return p;
					}
				})
			);
		},
		[activePassenger]
	);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: Date) => {
		const formattedDate = moment(date).format("YYYY-MM-DD");
		handleInputChange("dateOfBirth", formattedDate);
		setSelectedDate(date);
		setDateError(null);
		hideDatePicker();
	};

	const handleDatePress = (_: GestureResponderEvent) => {
		showDatePicker();
	};

	const addPassenger = useCallback(() => {
		const newIndex = passengers.length;
		const newPassengerId = `default-${newIndex}`;

		setPassengers((current) => [
			...current,
			{
				name: "",
				email: newPassengerId,
				address: "",
				dateOfBirth: "",
				passportNumber: "",
				country: "Nigeria", // Default country
			},
		]);

		// Automatically switch to the new passenger
		setActivePassenger(newPassengerId);
	}, [passengers]);

	const selectPassenger = useCallback((email: string) => {
		setActivePassenger(email);

		// Clear all error states when switching passengers
		setNameError(null);
		setAddressError(null);
		setEmailError(null);
		setPassportError(null);
		setDateError(null);
		setCountryError(null);
	}, []);

	// Validates a single passenger and shows appropriate errors
	const validatePassenger = (passenger: TPassengerDTO): boolean => {
		let isValid = true;

		if (!passenger.name || passenger.name.trim() === "") {
			setNameError("Name is required");
			nameInputRef.current?.focus();
			isValid = false;
		}

		if (!passenger.address || passenger.address.trim() === "") {
			setAddressError("Address is required");
			if (isValid) {
				addressInputRef.current?.focus();
				isValid = false;
			}
		}

		if (
			!passenger.email ||
			passenger.email.trim() === "" ||
			passenger.email.startsWith("default-")
		) {
			setEmailError("Valid email address is required");
			if (isValid) {
				emailInputRef.current?.focus();
				isValid = false;
			}
		} else if (!/\S+@\S+\.\S+/.test(passenger.email)) {
			setEmailError("Please enter a valid email address");
			if (isValid) {
				emailInputRef.current?.focus();
				isValid = false;
			}
		}

		if (!passenger.dateOfBirth || passenger.dateOfBirth.trim() === "") {
			setDateError("Date of birth is required");
			if (isValid) {
				showDatePicker();
				isValid = false;
			}
		}

		if (!passenger.passportNumber || passenger.passportNumber.trim() === "") {
			setPassportError("Passport number is required");
			if (isValid) {
				passportInputRef.current?.focus();
				isValid = false;
			}
		} else if (!NIGERIAN_PASSPORT_REGEX.test(passenger.passportNumber)) {
			setPassportError("Nigerian passport must be 'A' followed by 8 digits");
			if (isValid) {
				passportInputRef.current?.focus();
				isValid = false;
			}
		}

		if (!passenger.country || passenger.country.trim() === "") {
			setCountryError("Country is required");
			if (isValid) {
				countryInputRef.current?.focus();
				isValid = false;
			}
		}

		return isValid;
	};

	const validateAllPassengers = (): boolean => {
		// For shared flights, validate all passengers
		if (isSharedFlight) {
			let allValid = true;

			// First check the current passenger
			if (!validatePassenger(currentPassenger)) {
				allValid = false;
			}

			// Then check other passengers if the current one is valid
			if (allValid) {
				for (const passenger of passengers) {
					if (passenger.email !== activePassenger) {
						// Temporarily switch to each passenger to validate
						selectPassenger(passenger.email!);
						if (!validatePassenger(passenger)) {
							allValid = false;
							break;
						}
					}
				}
			}

			return allValid;
		} else {
			// For single booking, just validate current passenger
			return validatePassenger(currentPassenger);
		}
	};

	const handleBook = useCallback(async () => {
		try {
			// Validate all required passengers
			if (!validateAllPassengers()) {
				Toast.show({
					type: "error",
					text1: isSharedFlight
						? "Please complete all passengers' details"
						: "Please complete all required fields",
				});
				return;
			}

			// Set loading state before API calls
			setIsLoading(true);

			if (!isSharedFlight) {
				await handleFullFlightBooking();
			} else {
				await handleSharedFlightBooking(currentPassenger);
			}
		} catch (err) {
			const error = err as AxiosError<any, AxiosResponse>;
			Toast.show({
				type: "error",
				text1:
					(error.response?.data?.message?.includes("token") &&
						"Session expired! Please login again") ||
					error.message ||
					"An error occurred",
			});
			if (error.response?.status === 401 || error.response?.status === 403) {
				navigation.navigate("Login");
			}
		} finally {
			setIsLoading(false);
		}
	}, [passengers, activePassenger, flight, scheduledIndex, isSharedFlight]);

	// Helper function to handle booking a full flight
	const handleFullFlightBooking = async () => {
		try {
			const payload = {
				passengerInfo: {
					name: currentPassenger.name,
					address: currentPassenger.address,
					email: currentPassenger.email,
					dateOfBirth: currentPassenger.dateOfBirth.replaceAll("/", "-"),
					passportNumber: currentPassenger.passportNumber,
					country: currentPassenger.country,
				},
				scheduleIndex: scheduledIndex,
			};

			console.log("Full flight booking payload:", payload);

			const data = await airServices.bookFullFlight({
				id: flight._id,
				payload,
			});

			console.log("Full flight booking successful:", data);

			Toast.show({
				type: "success",
				text1: "Flight booked successfully!",
			});

			navigation.navigate("Payments", data);
		} catch (error) {
			const e = error as Error;
			console.error("Full flight booking error:", e);

			Toast.show({
				type: "error",
				text1: `Full flight booking failed: ${e.message}`,
			});

			throw error; // Re-throw to be caught by the main try-catch
		}
	};

	// Helper function to handle booking a shared flight
	const handleSharedFlightBooking = async (
		currentPassenger: (typeof passengers)[0]
	) => {
		try {
			const payload = {
				passengerInfo: {
					address: currentPassenger.address,
					email: currentPassenger.email,
					country: currentPassenger.country,
					dateOfBirth: currentPassenger.dateOfBirth,
					name: currentPassenger.name,
					passportNumber: currentPassenger.passportNumber,
				},
				enableJetshare: true,
				scheduleIndex: scheduledIndex,
				selectedSeat: bookingData.selectedSeat,
				jetSharePricePerSeat:
					bookingData.flight.availableSchedules[scheduledIndex]
						.additionalCharge,
			};

			console.log("Shared flight booking payload:", payload);

			const data = await airServices.bookAndShareFlight({
				id: flight._id,
				payload: payload as TBookFlightWithSharedSeatsDTO,
			});

			console.log("Shared flight booking successful:", data);

			Toast.show({
				type: "success",
				text1: "Shared flight booked successfully!",
			});

			navigation.navigate("Payments", data);
		} catch (error) {
			const e = error as AxiosError<any, AxiosResponse>;
			console.error("Shared flight booking error:", e.response?.data);

			Toast.show({
				type: "error",
				text1: `Shared flight booking failed: ${e.message}`,
			});

			throw error; // Re-throw to be caught by the main try-catch
		}
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={tw`flex-1`}
			>
				<View style={tw`px-4 py-6 items-center`}>
					<Text
						style={[
							tw`text-xl font-semibold`,
							{ fontFamily: "Poppins-SemiBold" },
						]}
					>
						Personal Info
					</Text>
				</View>

				<ScrollView contentContainerStyle={tw`flex-grow px-4`}>
					<View style={tw`items-center mb-6 flex-row justify-between`}>
						<View style={tw`flex-1`} />
						<View style={tw`items-center`}>
							<View
								style={tw`w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-2`}
							>
								<Image
									source={{ uri: "https://via.placeholder.com/200" }}
									style={tw`w-full h-full`}
								/>
							</View>
							<Text
								style={[
									tw`text-xl flex-1 font-bold text-[#ff6633]`,
									{ fontFamily: "Poppins-Medium" },
								]}
							>
								Hello
							</Text>
							<Text
								style={[
									tw`text-lg flex-1 font-medium`,
									{ fontFamily: "Poppins-Regular" },
								]}
							>
								{currentPassenger.name.split(" ")[0] || "Traveller"}
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
							{passengers.map((passenger, index) => (
								<TouchableOpacity
									key={passenger.email || index}
									style={tw`px-4 py-2 mr-2 rounded-full ${
										activePassenger === passenger.email
											? "bg-[#FF6633]"
											: "bg-gray-200"
									}`}
									onPress={() => selectPassenger(passenger.email!)}
								>
									<Text
										style={tw`${
											activePassenger === passenger.email
												? "text-white"
												: "text-gray-800"
										}`}
									>
										{passenger.name || `Traveller ${index + 1}`}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					)}

					<View style={tw`mb-4`}>
						{/* Name Field */}
						<Text style={tw`text-gray-600 mb-1`}>Name</Text>
						<View
							style={tw`flex-row items-center border ${
								nameError ? "border-red-500" : "border-gray-300"
							} rounded-md px-4 py-4 mb-1`}
						>
							<Icon
								name="user"
								size={20}
								color={nameError ? "#ef4444" : "#777"}
								style={tw`mr-3`}
							/>
							<TextInput
								ref={nameInputRef}
								style={tw`flex-1`}
								placeholder="Enter your Name"
								value={currentPassenger?.name || ""}
								onChangeText={(text) => handleInputChange("name", text)}
							/>
						</View>
						{nameError && (
							<Text style={tw`text-red-500 text-xs mb-2`}>{nameError}</Text>
						)}

						{/* Address Field */}
						<Text style={tw`text-gray-600 mb-1`}>Address</Text>
						<View
							style={tw`flex-row items-center border ${
								addressError ? "border-red-500" : "border-gray-300"
							} rounded-md px-4 py-4 mb-1`}
						>
							<Icon
								name="map-pin"
								size={20}
								color={addressError ? "#ef4444" : "#777"}
								style={tw`mr-3`}
							/>
							<TextInput
								ref={addressInputRef}
								style={tw`flex-1`}
								placeholder="Enter your address"
								value={currentPassenger?.address || ""}
								onChangeText={(text) => handleInputChange("address", text)}
							/>
						</View>
						{addressError && (
							<Text style={tw`text-red-500 text-xs mb-2`}>{addressError}</Text>
						)}

						{/* Email Field */}
						<Text style={tw`text-gray-600 mb-1`}>Email</Text>
						<View
							style={tw`flex-row items-center border ${
								emailError ? "border-red-500" : "border-gray-300"
							} rounded-md px-4 py-4 mb-1`}
						>
							<Icon
								name="mail"
								size={20}
								color={emailError ? "#ef4444" : "#777"}
								style={tw`mr-3`}
							/>
							<TextInput
								ref={emailInputRef}
								style={tw`flex-1`}
								keyboardType="email-address"
								placeholder="Enter your email address"
								value={
									currentPassenger?.email!.startsWith("default-")
										? ""
										: currentPassenger?.email || ""
								}
								onChangeText={(text) => handleInputChange("email", text)}
							/>
						</View>
						{emailError && (
							<Text style={tw`text-red-500 text-xs mb-2`}>{emailError}</Text>
						)}

						{/* Passport Field - specifically formatted for Nigerian passports */}
						<Text style={tw`text-gray-600 mb-1`}>
							Passport Number (Nigerian Format: A12345678)
						</Text>
						<View
							style={tw`flex-row items-center border ${
								passportError ? "border-red-500" : "border-gray-300"
							} rounded-md px-4 py-4 mb-1`}
						>
							<Icon
								name="credit-card"
								size={20}
								color={passportError ? "#ef4444" : "#777"}
								style={tw`mr-3`}
							/>
							<TextInputMask
								refInput={passportInputRef}
								type={"custom"}
								options={{
									mask: "A99999999", // Nigerian passport: A followed by 8 digits
								}}
								value={currentPassenger?.passportNumber || ""}
								includeRawValueInChangeText={true}
								onChangeText={(formatted, raw) => {
									handleInputChange("passportNumber", formatted.toUpperCase());
								}}
								placeholder="A12345678"
								style={tw`flex-1`}
								keyboardType="default"
								autoCapitalize="characters"
							/>
						</View>
						{passportError && (
							<Text style={tw`text-red-500 text-xs mb-2`}>{passportError}</Text>
						)}

						{/* Date of Birth Field */}
						<Text style={tw`text-gray-600 mb-1`}>Date of Birth</Text>
						<View
							style={tw`flex-row items-center border ${
								dateError ? "border-red-500" : "border-gray-300"
							} rounded-md px-4 py-4 mb-1`}
						>
							<TouchableOpacity
								style={tw`flex-row items-center flex-1`}
								onPress={handleDatePress}
							>
								<Icon
									name="calendar"
									size={20}
									color={dateError ? "#ef4444" : "#777"}
									style={tw`mr-3`}
								/>
								<TextInput
									ref={dateInputRef}
									style={tw`flex-1`}
									placeholder="YYYY-MM-DD"
									value={currentPassenger?.dateOfBirth || ""}
									editable={false}
									pointerEvents="none"
								/>
							</TouchableOpacity>
							<DateTimePickerModal
								isVisible={isDatePickerVisible}
								mode="date"
								onConfirm={handleConfirm}
								onCancel={hideDatePicker}
								date={selectedDate || new Date()}
								maximumDate={new Date()} // Prevents future dates
							/>
						</View>
						{dateError && (
							<Text style={tw`text-red-500 text-xs mb-2`}>{dateError}</Text>
						)}

						{/* Country Field */}
						<Text style={tw`text-gray-600 mb-1`}>Country</Text>
						<View
							style={tw`flex-row items-center border ${
								countryError ? "border-red-500" : "border-gray-300"
							} rounded-md px-4 py-4 mb-1`}
						>
							<Icon
								name="flag"
								size={20}
								color={countryError ? "#ef4444" : "#777"}
								style={tw`mr-3`}
							/>
							<TextInput
								ref={countryInputRef}
								style={tw`flex-1`}
								placeholder="Country"
								value={currentPassenger?.country || ""}
								onChangeText={(text) => handleInputChange("country", text)}
							/>
						</View>
						{countryError && (
							<Text style={tw`text-red-500 text-xs mb-2`}>{countryError}</Text>
						)}
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
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default PassengerDetailsScreen;
