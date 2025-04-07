import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
	FlatList,
} from "react-native";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Icon from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type Transaction = {
	id: string;
	date: string;
	description: string;
	amount: string;
	type: "debit" | "credit";
};

const MyWalletScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	// Mock data
	const [balance, setBalance] = useState("N5,750");
	const [cardNumber, setCardNumber] = useState("5282 3456 7890 1289");
	const [expiryDate, setExpiryDate] = useState("09/12");

	const [transactions, setTransactions] = useState<Transaction[]>([
		{
			id: "1",
			date: "22 May 2021",
			description: "Kubwa - Lokogoma",
			amount: "N2000",
			type: "debit",
		},
		{
			id: "2",
			date: "22 May 2021",
			description: "Kubwa - Lokogoma",
			amount: "N2000",
			type: "debit",
		},
		{
			id: "3",
			date: "22 May 2021",
			description: "Kubwa - Lokogoma",
			amount: "N2000",
			type: "debit",
		},
		{
			id: "4",
			date: "22 May 2021",
			description: "Kubwa - Lokogoma",
			amount: "N2000",
			type: "debit",
		},
		{
			id: "5",
			date: "22 May 2021",
			description: "Kubwa - Lokogoma",
			amount: "N2000",
			type: "debit",
		},
	]);

	const navigateToPayments = () => {
		navigation.navigate("Payments");
	};

	const navigateToHistory = () => {
		navigation.navigate("TransactionDetails");
	};

	const handlePay = () => {
		// Implement pay functionality
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />

			<View style={tw`flex-row items-center px-4 py-6`}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
					<Icon name="arrow-left" size={24} color="#000" />
				</TouchableOpacity>
				<Text style={tw`text-xl font-semibold flex-1`}>My Wallet</Text>
				<TouchableOpacity onPress={navigateToHistory}>
					<Text style={tw`text-[#FF6633] font-medium`}>History</Text>
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={tw`px-4`}>
				{/* Wallet Card */}
				<LinearGradient
					colors={["#FF6633", "#8B5CF6"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={tw`rounded-3xl p-5 mb-6`}
				>
					<View style={tw`flex-row justify-between items-start mb-4`}>
						<View>
							<Text style={tw`text-white text-base opacity-80`}>
								Current Balance
							</Text>
							<Text style={tw`text-white text-3xl font-bold mt-1`}>
								{balance}
							</Text>
						</View>
						<View style={tw`w-12 h-2 bg-gray-300 rounded-md`}></View>
					</View>

					<View style={tw`flex-row justify-between mt-6`}>
						<Text style={tw`text-white text-base`}>{cardNumber}</Text>
						<Text style={tw`text-white text-base`}>{expiryDate}</Text>
					</View>
				</LinearGradient>

				{/* Action Buttons */}
				<TouchableOpacity
					style={tw`bg-[#FF6633] py-4 rounded-full items-center mb-6`}
					onPress={handlePay}
				>
					<Text style={tw`text-white font-semibold text-lg`}>Pay</Text>
				</TouchableOpacity>

				<Text style={tw`text-lg font-medium mb-4`}>Top up Wallet</Text>

				<View style={tw`mb-6`}>
					<Text style={tw`text-lg text-gray-600 mb-2`}>
						Other payment method
					</Text>

					<TouchableOpacity
						style={tw`flex-row items-center bg-gray-50 p-4 rounded-lg mb-3`}
						onPress={() => {}}
					>
						<View
							style={tw`w-8 h-8 bg-[#FF6633] rounded-md items-center justify-center mr-3`}
						>
							<Icon name="plus" size={20} color="#fff" />
						</View>
						<Text style={tw`text-base`}>Pay with Bank</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={tw`flex-row items-center bg-gray-50 p-4 rounded-lg`}
						onPress={navigateToPayments}
					>
						<View
							style={tw`w-8 h-8 bg-[#FF6633] rounded-md items-center justify-center mr-3`}
						>
							<Icon name="plus" size={20} color="#fff" />
						</View>
						<Text style={tw`text-base`}>Add Payment Method</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyWalletScreen;
