import React, { useEffect, useState } from "react";
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
import { useUserService } from "@hooks/useUserService";
import { clearUser, clearWallet, setWallet } from "@redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import CustomButton from "@components/ui/CustomButton";

type Transaction = {
	id: string;
	date: string;
	description: string;
	amount: string;
	type: "debit" | "credit";
};

const MyWalletScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const dispatch = useAppDispatch();
	const { user, wallet } = useAppSelector((state) => state.user);
	const { useGetWallet } = useUserService();
	const {
		data: walletData,
		isLoading,
		error,
	} = useGetWallet("67daf8f89f8a38d5c05819de");

	console.log("walletData", walletData);
	console.log("isLoading", isLoading);
	console.log("error", error);

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

	const navigateToCardManagement = () => {
		navigation.navigate("CardManagement");
	};

	const navigateToHistory = () => {
		navigation.navigate("TransactionDetails");
	};

	const handleTopup = () => {
		// Implement pay functionality
	};

	useEffect(() => {
		if (walletData) {
			dispatch(setWallet(walletData.content));
		}
		if (error) {
			// handle Error
			if (error instanceof AxiosError) {
				if (error.status === 401) {
					// handle unauthorized error
					Toast.show({
						type: "error",
						text1: "Session expired!",
						text2: "Please log in again",
					});
					dispatch(clearUser());
					dispatch(clearWallet());

					// redirect to login screen
					navigation.reset({
						index: 0,
						routes: [{ name: "Login" }],
					});
				}
			}
		}
	}, [wallet, error]);

	return (
		<SafeAreaView style={tw`flex-1 bg-white  pt-4`}>
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
					end={{ x: 1, y: 2 }}
					style={tw`rounded-3xl p-5 mb-6`}
				>
					<View style={tw`flex-row justify-between items-start mb-4`}>
						<View>
							<Text style={tw`text-white text-base opacity-80`}>
								Current Balance
							</Text>
							<Text style={tw`text-white text-3xl font-bold mt-1`}>
								{wallet.balance ?? 0}
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
				<CustomButton
					style={tw`rounded-full items-center mb-6`}
					onPress={handleTopup}
					text="Top up Wallet"
				/>
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
						onPress={navigateToCardManagement}
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
