import React, { useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from "react-native";
import tw from "twrnc";
import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Icon from "@expo/vector-icons/Feather";

type PaymentSuccessScreenRouteProp = RouteProp<
	RootStackParamList,
	"PaymentSuccess"
>;

const PaymentSuccessScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const route = useRoute<PaymentSuccessScreenRouteProp>();
	const { amount = "N700" } = route.params || {};

	useEffect(() => {
		// Auto navigate to wallet after 3 seconds
		const timer = setTimeout(() => {
			// Optional auto-navigation
			// navigation.navigate("MyWallet");
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	const handleDone = () => {
		navigation.navigate("MyWallet");
	};

	const viewReceipt = () => {
		// Implement receipt view functionality
		// Could navigate to a receipt screen or show a modal
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />

			<View style={tw`flex-row items-center px-4 py-6`}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
					<Icon name="arrow-left" size={24} color="#000" />
				</TouchableOpacity>
				<Text style={tw`text-xl font-semibold flex-1 text-center`}>
					Payment
				</Text>
				<View style={tw`w-8`}></View>
			</View>

			<View style={tw`bg-[#FF6633] py-4 items-center`}>
				<Text style={tw`text-white text-lg font-semibold`}>Successful</Text>
			</View>

			<View style={tw`flex-1 items-center justify-center px-4`}>
				<View
					style={tw`bg-[#FF6633] w-24 h-24 rounded-full items-center justify-center mb-6`}
				>
					<Icon name="check" size={48} color="#fff" />
				</View>

				<Text style={tw`text-2xl font-bold mb-2`}>{amount}</Text>

				<TouchableOpacity
					style={tw`bg-[#FF6633] w-full py-4 rounded-full items-center mt-6`}
					onPress={handleDone}
				>
					<Text style={tw`text-white font-semibold text-lg`}>Done</Text>
				</TouchableOpacity>

				<TouchableOpacity style={tw`mt-4`} onPress={viewReceipt}>
					<Text style={tw`text-gray-500`}>receipt</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default PaymentSuccessScreen;
