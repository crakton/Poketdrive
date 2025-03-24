import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import ExploreScreen from "./ExploreScreen";
import ShareScreen from "./ShareScreen";
import ProfileScreen from "./ProfileScreen";
import TourScreen from "./TourScreen";
import AirContextProvider from "../../context/air/AirContextProvider";
import JetSearchResultScreen from "./JetSearchResultScreen";
import TourDetailsScreen from "./TourDetailScreen";

const Tab = createBottomTabNavigator();

const AirRootTab = () => {
	return (
		<AirContextProvider>
			<Tab.Navigator screenOptions={{ headerShown: false }}>
				<Tab.Screen
					name="Explore"
					options={{
						tabBarIcon(props) {
							return (
								<FontAwesome5
									name="route"
									size={props.size}
									color={props.color}
								/>
							);
						},
					}}
					component={ExploreScreen}
				/>
				<Tab.Screen
					name="TourDetails"
					options={{
						tabBarLabel: "Travels",
						tabBarIcon(props) {
							return (
								<Ionicons
									name="train-outline"
									size={props.size}
									color={props.color}
								/>
							);
						},
					}}
					component={TourScreen}
				/>

				<Tab.Screen
					name="Profile"
					options={{
						tabBarIcon(props) {
							return (
								<Ionicons
									name="person-outline"
									size={props.size}
									color={props.color}
								/>
							);
						},
					}}
					component={ProfileScreen}
				/>
			</Tab.Navigator>
		</AirContextProvider>
	);
};

export default AirRootTab;
