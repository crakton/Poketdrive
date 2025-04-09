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
} from "react-native";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Icon from "@expo/vector-icons/Feather";
import { useAirContext } from "../../hooks/air/useAirContext";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "@components/ui/CustomButton";

type CardDetails = {
	id: string;
	cardNumber: string;
	expiryDate: string;
	cardholderName: string;
	cvv: string;
};

const CreditCardScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	// Payment form state
	const [cardholderName, setCardholderName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [cvv, setCvv] = useState("");
	const [amount, setAmount] = useState("10000");

	// Optional: Array of existing payment methods
	const [savedPaymentMethods, setSavedPaymentMethods] = useState<CardDetails[]>(
		[]
	);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
		string | null
	>(null);

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

	const handleAddCard = () => {
		// Validate inputs
		if (!cardholderName.trim()) {
			Alert.alert("Error", "Please enter cardholder name");
			return;
		}

		if (cardNumber.replace(/\s/g, "").length < 16) {
			Alert.alert("Error", "Please enter a valid card number");
			return;
		}

		if (expiryDate.length < 5) {
			Alert.alert("Error", "Please enter a valid expiry date");
			return;
		}

		if (cvv.length < 3) {
			Alert.alert("Error", "Please enter a valid CVV");
			return;
		}

		// Process payment
		navigation.navigate("PaymentSuccess", { amount: Number(amount) });
	};

	const navigateToMyWallet = () => {
		navigation.navigate("MyWallet", {});
	};

	return (
		<SafeAreaView style={tw`flex-1 flex-grow bg-white pt-3`}>
			<ScrollView contentContainerStyle={tw`px-4`}>
				<View style={tw`mb-6`}>
					<Text style={tw`text-gray-600 mb-1 text-base`}>Name on card</Text>
					<View
						style={tw`flex-row items-center border border-gray-300 rounded-full px-4 py-4`}
					>
						<TextInput
							style={tw`flex-1 text-base`}
							placeholder="Enter your name"
							value={cardholderName}
							onChangeText={setCardholderName}
						/>
					</View>
				</View>

				<View style={tw`mb-6`}>
					<Text style={tw`text-gray-600 mb-1 text-base`}>Card number</Text>
					<View
						style={tw`flex-row items-center border border-gray-300 rounded-full px-4 py-4`}
					>
						<TextInput
							style={tw`flex-1 text-base`}
							placeholder="xxxx xxxx xxxx xxxx"
							keyboardType="numeric"
							maxLength={19}
							value={cardNumber}
							onChangeText={(text) => setCardNumber(formatCardNumber(text))}
						/>
						<View style={tw`flex-row`}>
							<FontAwesome name="cc-visa" />
							<FontAwesome name="cc-mastercard" />
							<FontAwesome name="cc-discover" />
						</View>
					</View>
				</View>

				<View style={tw`flex-row mb-6`}>
					<View style={tw`flex-1 mr-2`}>
						<Text style={tw`text-gray-600 mb-1 text-base`}>Expiration</Text>
						<View
							style={tw`flex-row items-center border border-gray-300 rounded-full px-4 py-4`}
						>
							<TextInput
								style={tw`flex-1 text-base`}
								placeholder="mm/yy"
								keyboardType="numeric"
								maxLength={5}
								value={expiryDate}
								onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
							/>
						</View>
					</View>

					<View style={tw`flex-1 ml-2`}>
						<Text style={tw`text-gray-600 mb-1 text-base`}>Cvv</Text>
						<View
							style={tw`flex-row items-center border border-gray-300 rounded-full px-4 py-4`}
						>
							<TextInput
								style={tw`flex-1 text-base`}
								placeholder="3 4 7"
								keyboardType="numeric"
								maxLength={3}
								value={cvv}
								onChangeText={setCvv}
								secureTextEntry
							/>
						</View>
					</View>
				</View>
			</ScrollView>

			<View style={tw`px-4 pb-6 mt-4`}>
				<CustomButton
					text="Add Card"
					style={tw` rounded-full items-center`}
					onPress={handleAddCard}
				/>
			</View>
		</SafeAreaView>
	);
};

export default CreditCardScreen;
