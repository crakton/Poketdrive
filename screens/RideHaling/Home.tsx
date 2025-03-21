import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	Dimensions,
	StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getLocalData } from "../../utils/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerToggleButton } from "@react-navigation/drawer";

type AuthStackParamList = {
	RideSchedule: undefined;
	TripSelection: undefined;
	Help: undefined;
	AccountVerification: undefined;
};

const data = [
	{
		id: 1,
		titel: "Post a ride as a driver",
		Icon: "add",
		link: "RideSchedule",
	},
	{
		id: 2,
		titel: "Find a trip as a passenger",
		Icon: "search",
		link: "TripSelection",
	},
	{
		id: 3,
		titel: "Need help?",
		Icon: "help-outline",
		link: "FAQs",
	},
];

const Home = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

	useEffect(() => {
		const checkOnboard = async () => {
			try {
				const isOnboard = await AsyncStorage.getItem("userData");
				// const isOnboard = await getLocalData("userData");
				if (isOnboard) {
					isOnboard !== null ? JSON.parse(isOnboard) : null;

					// console.log("home place  is onboarded", isOnboard);
				} else {
					// console.log("User is not onboarded", isOnboard);
				}
			} catch (error) {
				console.log(error);
			} finally {
			}
		};
		checkOnboard();
	}, []);

	// function to toggle drawer
	const handleDrawer = () => {};

	return (
		<SafeAreaView
			style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
		>
			<StatusBar translucent backgroundColor="transparent" />
			<View style={tw`flex flex-row items-center justify-between px-5 py-5 `}>
				{/* <TouchableOpacity
          onPress={() => navigation.navigate("AccountVerification")}
        >
          <Icon name="menu" />
        </TouchableOpacity> */}
				<DrawerToggleButton />
				<Text
					style={[
						tw`px-2 text-white bg-red-500 rounded-md py-1`,
						{ fontFamily: "Poppins-Regular" },
					]}
				>
					Lite
				</Text>
			</View>
			<SafeAreaView>
				<View style={tw`flex px-3 mb-5 items-start`}>
					<Text style={[tw`text-2xl px-5`, { fontFamily: "Poppins-Bold" }]}>
						Hi there, what are you looking to do today?
					</Text>
				</View>
				{/* here is the horizontal line */}
				<View style={[tw`bg-gray-600`, { height: 1 }]} />
				<View style={tw`py-5`}>
					{data.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={tw`flex flex-row items-center justify-start gap-[1rem] px-6 py-5`}
							onPress={() => {
								navigation.navigate(item.link as keyof AuthStackParamList);
							}}
						>
							<Icon name={item?.Icon} />
							<Text style={[tw`text-xl`, { fontFamily: "Poppins-Regular" }]}>
								{item.titel}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</SafeAreaView>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({});
