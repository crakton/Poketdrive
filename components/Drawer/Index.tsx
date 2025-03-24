import React, { useEffect, useState } from "react";
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import StackContainer from "../Stack/Index";
import Payment from "../../screens/RideHaling/Payment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Messages from "../../screens/Chat/Messages";
import ManageRide from "../../screens/RideHaling/ManageRide";
import ManageTrips from "../../screens/Driver/DriverItinerary/ManageTrips";

export const MyDrawer = createDrawerNavigator();

const DrawerContainer = () => {
	const { width } = useWindowDimensions();
	const [userData, setUserData] = useState<any>(null);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem("userData");
				if (jsonValue !== null) {
					const parsedData = JSON.parse(jsonValue);

					setUserData(parsedData);
				}
			} catch (e) {
				console.log("Error fetching user data:", e);
			}
		};

		fetchUserData();
	}, [setUserData]);
	return (
		<MyDrawer.Navigator
			drawerContent={(props: DrawerContentComponentProps) => (
				<CustomDrawerContent {...props} />
			)}
			screenOptions={{
				headerShown: false,
				swipeEdgeWidth: width * 0.95,
				swipeEnabled: false,
			}}
		>
			<MyDrawer.Screen
				component={Payment}
				name="Payments"
				options={{
					drawerIcon: ({ color, size }: { color: string; size: number }) => (
						<Ionicons name="card-outline" size={size} color={color} />
					),
				}}
			/>
			<MyDrawer.Screen
				component={Payment}
				name="Promotions"
				options={{
					drawerIcon: ({ color, size }: { color: string; size: number }) => (
						<Ionicons name="pricetags-outline" size={size} color={color} />
					),
				}}
			/>
			<MyDrawer.Screen
				component={Messages}
				name="Chat"
				options={{
					headerShown: true,
					header: ({ navigation }: { navigation: NavigationProp<any> }) => {
						return (
							<View style={tw`flex-row items-center justify-between py-2 px-3`}>
								<View style={tw`flex-row items-center mt-6`}>
									<TouchableOpacity onPress={() => navigation.goBack()}>
										<Ionicons name="arrow-back" size={24} color="black" />
									</TouchableOpacity>
									<View style={tw`flex-row items-center ml-2`}>
										<Image
											source={require("../../assets/images/avatar.png")}
											style={tw`w-10 h-10 rounded-full`}
										/>
										<View style={[tw`ml-2 flex flex-col`]}>
											<Text style={tw`font-bold`}>
												{userData?.firstName ?? "Jonny"}
											</Text>
											<View style={[tw`flex flex-row items-center`]}>
												<Text
													style={tw`h-[1.4] w-[1.4] rounded-full bg-green-700`}
												></Text>
												<Text style={tw`text-xs ml-1`}>Online</Text>
											</View>
										</View>
									</View>
								</View>
								<TouchableOpacity style={tw`mt-6`}>
									<Ionicons name="call-outline" size={24} color="black" />
								</TouchableOpacity>
							</View>
						);
					},
					drawerIcon: ({ color, size }: { color: string; size: number }) => (
						<Ionicons name="chatbox" size={size} color={color} />
					),
				}}
			/>
			<MyDrawer.Screen
				component={ManageRide}
				name="My Rides"
				options={{
					drawerIcon: ({ color, size }: { color: string; size: number }) => (
						<Ionicons name="car-outline" size={size} color={color} />
					),
				}}
			/>
			<MyDrawer.Screen
				component={ManageTrips}
				name="Work Rides"
				options={{
					drawerIcon: ({ color, size }: { color: string; size: number }) => (
						<Ionicons name="bus-outline" size={size} color={color} />
					),
				}}
			/>
		</MyDrawer.Navigator>
	);
};

export default DrawerContainer;

function CustomDrawerContent(props: DrawerContentComponentProps) {
	const { state, navigation } = props;

	const filteredRoutes = state.routes.filter((route) => route.name !== "Stack");
	const [userData, setUserData] = useState<any>(null);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem("userData");
				if (jsonValue !== null) {
					const parsedData = JSON.parse(jsonValue);

					setUserData(parsedData);
				}
			} catch (e) {
				console.log("Error fetching user data:", e);
			}
		};

		fetchUserData();
	}, [setUserData]);

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={tw`flex-1 justify-between`}
		>
			<View style={tw`p-4`}>
				<View style={tw`flex-row items-center`}>
					<Image
						source={require("../../assets/images/avatar.png")}
						style={tw`w-16 h-16 rounded-full`}
					/>
					<View style={tw`ml-4 flex flex-col flex-1`}>
						<Text style={tw`font-bold text-lg`}>
							{userData?.firstName ?? "Jonny"}
						</Text>
						<TouchableOpacity>
							<Ionicons name="create-outline" size={24} color="black" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View style={tw`bg-gray-200 h-[1px] my-2`} />
			<View style={tw`flex-1`}>
				{filteredRoutes.map((route, index) =>
					route.name === "Stack" ? null : (
						<DrawerItem
							style={[tw`gap-1`]}
							key={index}
							label={route.name}
							labelStyle={[
								tw`font-bold text-slate-700 right-4`,
								{ fontFamily: "Poppins-Regular" },
							]}
							onPress={() => navigation.navigate(route.name)}
							icon={({ color, size }: { color: string; size: number }) => {
								switch (route.name) {
									case "Payments":
										return (
											<Ionicons name="card-outline" size={size} color={color} />
										);
									case "Promotions":
										return (
											<Ionicons
												name="pricetags-outline"
												size={size}
												color={color}
											/>
										);
									case "Chat":
										return (
											<Ionicons
												name="chatbox-outline"
												size={size}
												color={color}
											/>
										);
									case "My Rides":
										return (
											<Ionicons name="car-outline" size={size} color={color} />
										);
									case "Work Rides":
										return (
											<Ionicons name="bus-outline" size={size} color={color} />
										);
								}
							}}
						/>
					)
				)}
			</View>
		</DrawerContentScrollView>
	);
}
