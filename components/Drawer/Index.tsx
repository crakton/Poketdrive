import React from "react";
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Home from "@screens/RideHaling/Home";
import WalletHome from "@screens/MyWallet/Home";
import ManageRide from "../../screens/RideHaling/ManageRide";
import ManageTrips from "../../screens/Driver/DriverItinerary/ManageTrips";
import ChatListScreen from "@screens/Chat/ChatListScreen";
import { CustomDrawerContent } from "./CustomDrawerContent";

export const MyDrawer = createDrawerNavigator();

const DrawerContainer = () => {
	const { width } = useWindowDimensions();

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
				name="Home"
				component={Home}
				options={{
					drawerIcon: ({ color, size }: any) => (
						<Ionicons name="home-outline" size={size} color={color} />
					),
				}}
			/>
			<MyDrawer.Screen
				name="wallet"
				component={WalletHome}
				options={{
					drawerIcon: ({ color, size }: any) => (
						<Ionicons name="card-outline" size={size} color={color} />
					),
				}}
			/>
			<MyDrawer.Screen name="Chat" component={ChatListScreen} />
			<MyDrawer.Screen
				name="My Rides"
				component={ManageRide}
				options={{
					drawerIcon: ({ color, size }: any) => (
						<Ionicons name="car-outline" size={size} color={color} />
					),
				}}
			/>
			<MyDrawer.Screen
				name="Work Rides"
				component={ManageTrips}
				options={{
					drawerIcon: ({ color, size }: any) => (
						<Ionicons name="bus-outline" size={size} color={color} />
					),
				}}
			/>
		</MyDrawer.Navigator>
	);
};

export default DrawerContainer;
