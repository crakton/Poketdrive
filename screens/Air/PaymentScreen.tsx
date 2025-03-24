import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { CheckBox } from "react-native-elements";
import { RootStackParamList } from "../../types";

const PaymentScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [cardNumber, setCardNumber] = useState("4500 0910 4334 3443");
	const [expDate, setExpDate] = useState("10/3");
	const [cvv, setCvv] = useState("");
	const [saveCard, setSaveCard] = useState(true);

	const formatCardNumber = (text: string) => {
		const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = cleaned.match(/\d{4,16}/g);
		const match = matches && matches[0] ? matches[0] : "";
		const parts = [];

		for (let i = 0; i < match.length; i += 4) {
			parts.push(match.substring(i, i + 4));
		}

		if (parts.length) {
			return parts.join(" ");
		} else {
			return text;
		}
	};

	const handlePayment = () => {
		// Process payment logic here
		navigation.navigate("PaymentSuccessScreen");
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={tw`flex-1 bg-white`}
		>
			<SafeAreaView style={tw`flex-1`}>
				<View style={tw`p-4`}>
					<View style={tw`flex-row items-center mb-4`}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Ionicons name="arrow-back" size={24} color="#000" />
						</TouchableOpacity>
						<Text style={tw`text-xl font-semibold ml-4`}>Payment</Text>
					</View>

					<View style={tw`mt-4`}>
						<View
							style={tw`border border-gray-200 rounded-lg p-4 mb-4 flex-row justify-between items-center`}
						>
							<Text style={tw`text-base`}>{cardNumber}</Text>
							<View style={tw`bg-gray-100 p-1 rounded`}>
								<Text style={tw`text-blue-800 font-bold`}>VISA</Text>
							</View>
						</View>

						<View style={tw`flex-row gap-4`}>
							<View style={tw`flex-1`}>
								<TextInput
									style={tw`border border-orange-400 rounded-lg p-4 text-base mb-4`}
									placeholder="MM/YY"
									value={expDate}
									onChangeText={setExpDate}
									keyboardType="numeric"
								/>
							</View>
							<View style={tw`flex-1`}>
								<TextInput
									style={tw`border border-gray-200 rounded-lg p-4 text-base mb-4`}
									placeholder="CVV/CVC"
									value={cvv}
									onChangeText={setCvv}
									keyboardType="numeric"
									secureTextEntry
								/>
							</View>
						</View>

						<View style={tw`flex-row items-center mb-6`}>
							<CheckBox
								checked={saveCard}
								onPress={() => setSaveCard(!saveCard)}
								containerStyle={tw`p-0 m-0 bg-transparent border-0`}
								checkedColor="#F05A22"
							/>
							<Text style={tw`text-base ml-2`}>Save card</Text>
						</View>

						<TouchableOpacity
							style={tw`bg-[#F05A22] rounded-lg py-4 items-center mt-4`}
							onPress={handlePayment}
						>
							<Text style={tw`text-white text-lg font-medium`}>Pay</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};
