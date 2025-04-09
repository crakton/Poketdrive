import React, { useState } from "react";
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
	const [expiryDate, setExpiryDate] = useState("10/3");
	const [cvv, setCvv] = useState("");
	const [saveCard, setSaveCard] = useState(true);
	const [isloading, setIsLoading] = useState(false);
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

	// Format expiry date
	const formatExpiryDate = (value: string) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

		if (v.length > 2) {
			return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
		}

		return v;
	};

	const handlePayment = async () => {
		// Validate inputs
		if (cardNumber.replace(/\s/g, "").length < 16) {
			Alert.alert("Error", "Please enter a valid card number");
			return;
		}

		// if (expiryDate.length < 5) {
		// 	Alert.alert("Error", "Please enter a valid expiry date");
		// 	return;
		// }

		// if (cvv.length < 3) {
		// 	Alert.alert("Error", "Please enter a valid CVV");
		// 	return;
		// }

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
				{/* Card Input Fields */}
				<View style={tw`px-5 mt-6`}>
					{/* Card Number Field */}
					<View style={tw`mb-4`}>
						<View
							style={tw`flex-row items-center justify-between border border-gray-200 rounded-lg px-4 py-3`}
						>
							<TextInput
								style={tw`flex-1 text-base`}
								value={cardNumber}
								onChangeText={(text) => setCardNumber(formatCardNumber(text))}
								keyboardType="numeric"
								maxLength={19}
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
					<View style={tw`flex-row mb-6`}>
						{/* Expiry Date Field */}
						<View style={tw`flex-1 mr-2`}>
							<View style={tw`border border-orange-500 rounded-lg px-4 py-3`}>
								<TextInput
									style={tw`flex-1 text-base`}
									placeholder="MM/YY"
									value={expiryDate}
									onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
									keyboardType="numeric"
									maxLength={5}
								/>
							</View>
						</View>

						{/* CVV Field */}
						<View style={tw`flex-1 ml-2`}>
							<View style={tw`border border-gray-200 rounded-lg px-4 py-3`}>
								<TextInput
									style={tw`flex-1 text-base`}
									placeholder="CVV/CVC"
									value={cvv}
									onChangeText={setCvv}
									keyboardType="numeric"
									maxLength={3}
									secureTextEntry
								/>
							</View>
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
						<Text style={tw`text-gray-800`}>Save card</Text>
					</TouchableOpacity>
				</View>
				{/* Spacer */}
				<View style={tw`flex-1`} />
				{/* Pay Button */}
				<View style={tw`px-5 mb-8`}>
					<CustomButton
						text="Pay Flight Ticket"
						style={tw`rounded-lg items-center`}
						onPress={handlePayment}
					/>
				</View>
				{/* Numeric Keyboard */}
				<View style={tw`bg-gray-200 px-2 pb-8`}>
					{/* Row 1 */}
					<View style={tw`flex-row justify-between mb-2`}>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>1</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>2</Text>
							<Text style={tw`text-xs`}>ABC</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>3</Text>
							<Text style={tw`text-xs`}>DEF</Text>
						</TouchableOpacity>
					</View>

					{/* Row 2 */}
					<View style={tw`flex-row justify-between mb-2`}>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>4</Text>
							<Text style={tw`text-xs`}>GHI</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>5</Text>
							<Text style={tw`text-xs`}>JKL</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>6</Text>
							<Text style={tw`text-xs`}>MNO</Text>
						</TouchableOpacity>
					</View>

					{/* Row 3 */}
					<View style={tw`flex-row justify-between mb-2`}>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>7</Text>
							<Text style={tw`text-xs`}>PQRS</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>8</Text>
							<Text style={tw`text-xs`}>TUV</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>9</Text>
							<Text style={tw`text-xs`}>WXYZ</Text>
						</TouchableOpacity>
					</View>

					{/* Row 4 */}
					<View style={tw`flex-row justify-between`}>
						<View style={tw`flex-1 mx-1`}></View>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center`}
						>
							<Text style={tw`text-xl font-medium`}>0</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex-1 bg-white py-4 rounded-lg mx-1 items-center justify-center`}
						>
							<Icon name="delete" size={24} color="#000" />
						</TouchableOpacity>
					</View>
				</View>
				{/* Home Indicator */}
				<View style={tw`items-center pb-1`}>
					<View style={tw`w-20 h-1 bg-black rounded-full`} />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default PaymentsScreen;
