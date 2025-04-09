import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	FlatList,
} from "react-native";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Icon from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

type Transaction = {
	id: string;
	date: string;
	description: string;
	amount: string;
	type: "debit" | "credit";
};

const TransactionDetailsScreen = () => {
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

	const renderTransactionItem = ({ item }: { item: Transaction }) => (
		<View
			style={tw`flex-row items-center mb-4 bg-white rounded-xl p-4 shadow-sm`}
		>
			<View
				style={tw`w-12 h-12 rounded-full bg-[#FF6633] items-center justify-center mr-4`}
			>
				<Icon name="arrow-down" size={20} color="#fff" />
			</View>
			<View style={tw`flex-1`}>
				<Text style={tw`text-gray-500 text-sm`}>{item.date}</Text>
				<Text style={tw`text-base font-medium`}>{item.description}</Text>
			</View>
			<Text style={tw`text-red-500 font-medium`}>- {item.amount}</Text>
		</View>
	);

	const seeAllTransactions = () => {
		// Implement see all functionality
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />

			<View style={tw`flex-row items-center px-4 py-6`}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
					<Icon name="arrow-left" size={24} color="#000" />
				</TouchableOpacity>
				<Text style={tw`text-xl font-semibold flex-1`}>Detail Activity</Text>
				<View style={tw`w-8`}></View>
			</View>

			{/* Wallet Card */}
			<LinearGradient
				colors={["#FF6633", "#8B5CF6"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={tw`mx-4 rounded-3xl p-5 mb-6`}
			>
				<Text style={tw`text-white text-3xl font-bold`}>{balance}</Text>
				<View style={tw`flex-row justify-between mt-6`}>
					<Text style={tw`text-white text-base`}>{cardNumber}</Text>
					<Text style={tw`text-white text-base`}>{expiryDate}</Text>
				</View>
			</LinearGradient>

			{/* Transactions */}
			<View style={tw`flex-row justify-between items-center px-4 mb-2`}>
				<Text style={tw`text-lg font-semibold`}>Recent Transaction</Text>
				<TouchableOpacity onPress={seeAllTransactions}>
					<Text style={tw`text-gray-500`}>See All</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={transactions}
				renderItem={renderTransactionItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={tw`px-4 pt-2 pb-6`}
			/>
		</SafeAreaView>
	);
};

export default TransactionDetailsScreen;
