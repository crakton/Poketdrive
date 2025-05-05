import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	TextInput,
	ScrollView,
	Image,
	Alert,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import tw from "twrnc";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Icon from "@expo/vector-icons/Feather";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "@components/ui/CustomButton";
import AirService from "@services/airService";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import PageLoader from "@components/ui/PageLoader";

const PaymentsScreen = () => {
	const airService = new AirService(useQueryClient());
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const data = useRoute().params as any;

	// Payment form state
	const [cardNumber, setCardNumber] = useState("4500 0910 4334 3443");
	const [expiryDate, setExpiryDate] = useState("10/25");
	const [cvv, setCvv] = useState("");
	const [saveCard, setSaveCard] = useState(true);
	const [isloading, setIsLoading] = useState(false);

	// Validation states
	const [expiryError, setExpiryError] = useState("");
	const [cvvError, setCvvError] = useState("");

	// Format card number with spaces
	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];

		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}

		if (parts.length) {
			return parts.join(" ");
		} else {
			return value;
		}
	};

	// Format expiry date with better handling
	const formatExpiryDate = (value: string) => {
		// Remove any non-numeric characters
		let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

		// Don't add slash if deleting
		if (value.endsWith("/") && v.length <= 2) {
			return v;
		}

		// Auto-add slash after month entry
		if (v.length > 2) {
			return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
		}

		return v;
	};

	// Validate expiry date
	const validateExpiryDate = (value: string) => {
		if (!value) return "Expiry date required";

		const parts = value.split("/");
		if (parts.length !== 2) return "Invalid format";

		const month = parseInt(parts[0], 10);
		const year = parseInt(`20${parts[1]}`, 10);

		if (isNaN(month) || isNaN(year)) return "Invalid date";
		if (month < 1 || month > 12) return "Invalid month";

		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;

		if (year < currentYear) return "Card expired";
		if (year === currentYear && month < currentMonth) return "Card expired";

		return "";
	};

	// Validate CVV
	const validateCVV = (value: string) => {
		if (!value) return "CVV required";
		if (value.length < 3) return "CVV too short";
		if (!/^\d{3,4}$/.test(value)) return "Invalid CVV";
		return "";
	};

	// Handle expiry date input with improved UX
	const handleExpiryChange = (text: string) => {
		// Handle backspace when the slash is present
		if (expiryDate.length === 3 && text.length === 2) {
			setExpiryDate(text);
			return;
		}

		const formatted = formatExpiryDate(text);
		setExpiryDate(formatted);

		// Only validate if we have a complete date
		if (formatted.length === 5) {
			setExpiryError(validateExpiryDate(formatted));
		} else {
			setExpiryError("");
		}
	};

	// Handle CVV input with enhanced validation
	const handleCVVChange = (text: string) => {
		// Only allow numbers
		const numericValue = text.replace(/[^0-9]/g, "");
		setCvv(numericValue);

		// Validate when we have enough digits
		if (numericValue.length >= 3) {
			setCvvError(validateCVV(numericValue));
		} else if (numericValue.length > 0) {
			setCvvError(numericValue.length < 3 ? "Enter at least 3 digits" : "");
		} else {
			setCvvError("");
		}
	};

	const handlePayment = async () => {
		// Validate inputs
		const expError = validateExpiryDate(expiryDate);
		const cvvError = validateCVV(cvv);

		setExpiryError(expError);
		setCvvError(cvvError);

		if (cardNumber.replace(/\s/g, "").length < 16) {
			Alert.alert("Error", "Please enter a valid card number");
			return;
		}

		if (expError) {
			Alert.alert("Error", expError);
			return;
		}

		if (cvvError) {
			Alert.alert("Error", cvvError);
			return;
		}

		try {
			setIsLoading(true);
			const res = await airService.payFlight(data.bookingId as string);
			Toast.show({ type: "success", text1: "Payment successful" });
			navigation.reset({
				index: 0,
				routes: [{ name: "Onboarding" }],
			});
		} catch (error) {
			console.log(error);
			Toast.show({ type: "error", text1: "Payment failed" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			{isloading && <PageLoader />}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={tw`flex-1`}
			>
				<ScrollView contentContainerStyle={tw`flex-grow`}>
					{/* Payment Form Section */}
					<View style={tw`px-5 mt-6`}>
						{/* Card Number Field */}
						<View style={tw`mb-5`}>
							<Text style={tw`text-gray-700 font-medium mb-2`}>
								Card Number
							</Text>
							<View
								style={tw`flex-row items-center justify-between border border-gray-200 rounded-lg px-4 py-3.5`}
								pointerEvents="auto"
							>
								<TextInput
									style={tw`flex-1 text-base`}
									value={cardNumber}
									onChangeText={(text) => setCardNumber(formatCardNumber(text))}
									keyboardType="numeric"
									maxLength={19}
									placeholder="0000 0000 0000 0000"
								/>
								<Image
									source={{
										uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
									}}
									style={tw`w-10 h-6`}
									resizeMode="contain"
								/>
							</View>
						</View>

						{/* Expiry Date and CVV */}
						<View style={tw`flex-row mb-5`}>
							{/* Expiry Date Field */}
							<View style={tw`flex-1 mr-2`}>
								<Text style={tw`text-gray-700 font-medium mb-2`}>
									Expiry Date
								</Text>
								<TextInput
									style={tw`flex-1 text-base border ${
										expiryError ? "border-red-500" : "border-gray-200"
									} rounded-lg px-4 py-3.5`}
									placeholder="MM/YY"
									value={expiryDate}
									onChangeText={handleExpiryChange}
									keyboardType="numeric"
									maxLength={5}
								/>
								{expiryError ? (
									<Text style={tw`text-red-500 text-xs mt-1`}>
										{expiryError}
									</Text>
								) : null}
							</View>

							{/* CVV Field */}
							<View style={tw`flex-1 ml-2`}>
								<Text style={tw`text-gray-700 font-medium mb-2`}>CVV</Text>
								<TextInput
									style={tw`flex-1 text-base border ${
										cvvError ? "border-red-500" : "border-gray-200"
									} rounded-lg px-4 py-3.5`}
									placeholder="123"
									value={cvv}
									onChangeText={handleCVVChange}
									keyboardType="numeric"
									maxLength={3}
									secureTextEntry
								/>
								{cvvError ? (
									<Text style={tw`text-red-500 text-xs mt-1`}>{cvvError}</Text>
								) : null}
							</View>
						</View>

						{/* Save Card Checkbox */}
						<TouchableOpacity
							style={tw`flex-row items-center mb-6`}
							onPress={() => setSaveCard(!saveCard)}
						>
							<View
								style={tw`w-5 h-5 rounded mr-2 border border-gray-300 ${
									saveCard ? "bg-orange-500 border-orange-500" : "bg-white"
								} flex items-center justify-center`}
							>
								{saveCard && <Icon name="check" size={14} color="white" />}
							</View>
							<Text style={tw`text-gray-800`}>
								Save this card for future payments
							</Text>
						</TouchableOpacity>
					</View>

					{/* Spacer */}
					<View style={tw`flex-1`} />

					{/* Pay Button */}
					<View style={tw`px-5 mb-8`}>
						<CustomButton
							text={`Pay Flight Ticket`}
							style={tw`rounded-lg items-center`}
							onPress={handlePayment}
						/>
					</View>
				</ScrollView>

				{/* Home Indicator */}
				<View style={tw`items-center pb-2`}>
					<View style={tw`w-16 h-1 bg-gray-300 rounded-full`} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default PaymentsScreen;
