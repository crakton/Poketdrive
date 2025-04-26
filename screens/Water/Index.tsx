import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import OrderScreen from "./OrderScreen";
import SendScreen from "./SendScreen";
import ProfileScreen from "../Air/ProfileScreen";
import AirContextProvider from "../../context/air/AirContextProvider";
import Home from "./Home";

const Tab = createBottomTabNavigator();

const WaterRootTab = () => {
  return (
    <AirContextProvider>
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarActiveTintColor: "#FF6633" }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon(props) {
              return (
                <FontAwesome5
                  name="home"
                  size={props.size}
                  color={props.color}
                />
              );
            },
          }}
          component={Home}
        />
        <Tab.Screen
          name="Order"
          options={{
            tabBarLabel: "my Order",
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
          component={OrderScreen}
        />
        <Tab.Screen
          name="TourDetails"
          options={{
            tabBarLabel: "send",
            tabBarIcon(props) {
              return (
                <Ionicons
                  name="paper-plane-outline"
                  size={props.size}
                  color={props.color}
                />
              );
            },
          }}
          component={SendScreen}
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

export default WaterRootTab;
