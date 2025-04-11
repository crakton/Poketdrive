import React from "react";
import tw from "twrnc";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const Onboarding = () => {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
	return (
		<View
			style={[
				tw`flex gap-x-3 gap-y-12 flex-col items-center justify-center p-3 bg-[#FF6633]`,
				{ height: "100%" },
			]}
		>
			<Text style={[tw`text-2xl`, { fontFamily: "Poppins-Black" }]}>
				Welcome to uRide
			</Text>
			<Text style={[tw`text-lg`, { fontFamily: "Poppins-Regular" }]}>
				Select your cruise type
			</Text>
			<View
				style={[
					tw`flex w-full gap-x-3 gap-y-8 flex-col items-center justify-center`,
				]}
			>
				<TouchableOpacity
					onPress={() => navigate("Home")}
					style={[
						tw`bg-white p-3 rounded-full justify-center items-center w-full`,
					]}
				>
					<Text
						style={[tw`text-lg font-bold`, { fontFamily: "Poppins-Regular" }]}
					>
						Land
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigate("AirTabBar")}
					style={[
						tw`bg-white p-3 rounded-full justify-center items-center w-full`,
					]}
				>
					<Text
						style={[tw`text-lg font-bold`, { fontFamily: "Poppins-Regular" }]}
					>
						Air
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigate("WaterTabBar")}
					style={[
						tw`bg-white p-3 rounded-full justify-center items-center w-full`,
					]}
				>
					<Text
						style={[tw`text-lg font-bold`, { fontFamily: "Poppins-Regular" }]}
					>
						Water
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Onboarding;
