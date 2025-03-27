import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const FlightSearchScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View
				style={tw`flex-row items-center px-4 py-2 border-b border-gray-200`}
			>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="#000" />
				</TouchableOpacity>
				<View
					style={tw`flex-1 ml-3 mr-10 flex-row items-center p-2 bg-gray-100 rounded-lg`}
				>
					<Text style={tw`flex-1 text-gray-700`}>
						Murtala International Lagos
					</Text>
					<AntDesign name="swap" size={20} color="#000" />
				</View>
			</View>

			<Text style={tw`px-4 py-2 text-lg font-medium`}>Search results</Text>

			<ScrollView>
				{/* First Jet Card */}
				<TouchableOpacity
					onPress={() => navigation.navigate("FlightDetails")}
					style={tw`px-4 py-2`}
				>
					<View style={tw`rounded-lg overflow-hidden mb-2`}>
						<Image
							source={require("../../assets/images/air/cassna.png")}
							style={tw`w-full h-40`}
							resizeMode="cover"
						/>
					</View>
					<View style={tw`flex-row justify-between items-center`}>
						<TouchableOpacity
							style={tw`bg-orange-500 px-6 py-2 rounded-lg`}
							onPress={() => navigation.navigate("FlightBooking")}
						>
							<Text style={tw`text-white font-medium`}>Book</Text>
						</TouchableOpacity>
						<Text style={tw`text-gray-700`}>Jet Share option available</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

export default FlightSearchScreen;
