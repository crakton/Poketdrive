import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import ExploreScreen from "./ExploreScreen";
import ShareScreen from "./TravelsScreen";
import ProfileScreen from "./ProfileScreen";
import TourScreen from "./TourScreen";
import AirContextProvider from "../../context/air/AirContextProvider";
import JetSearchResultScreen from "./FlightSearchScreen";
import TourDetailsScreen from "./TourDetailScreen";
import TravelsScreen from "./TravelsScreen";

const Tab = createBottomTabNavigator();

const AirRootTab = () => {
<<<<<<< HEAD
  return (
    <AirContextProvider>
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      >
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
          name="Travels"
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
          component={TravelsScreen}
        />
=======
	return (
		<AirContextProvider>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarActiveTintColor: "#FF6633",
				}}
			>
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
					name="Travels"
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
					component={TravelsScreen}
				/>
>>>>>>> 3cd2cf17ad2ca487c09b65969c224c9e6b1da61b

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
