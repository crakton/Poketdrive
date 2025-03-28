import React from "react";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import registerNNPushToken from "native-notify";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./store";
import QueryClientProvider from "./utils/ReactQueryProvider";

import DrawerContainer from "./components/Drawer/Index";
import StackContainer from "./components/Stack/Index";
import AirRootTab from "./screens/Air/Index";
import WaterRootTab from "./screens/Water/Index";
import TourDetailsScreen from "./screens/Air/TourDetailScreen";
import PassengerDetailsScreen from "./screens/Air/PassengerDetailsScreen";
import FlightSearchScreen from "./screens/Air/FlightSearchScreen";
import FlightBookingScreen from "./screens/Air/FlightBookingScreen";
import FlightDetailsScreen from "./screens/Air/FlightDetailsScreen";


export const RootStack = createNativeStackNavigator();

export default function App() {
  // Register push notifications - moved inside useEffect in a real component
  registerNNPushToken(22387, "Wl0rlWhlSiad3m2ob0v2aB");

  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

	return (
		<QueryClientProvider>
			<Provider store={store}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<NavigationContainer>
						<RootStack.Navigator screenOptions={{ headerShown: false }}>
							{/* Main Stacks */}
							<RootStack.Screen name="MainStack" component={StackContainer} />
							{/* Drawer */}
							<RootStack.Screen name="LandDrawer" component={DrawerContainer} />
							{/* Air Tab Bar */}
							<RootStack.Screen name="AirTabBar" component={AirRootTab} />
							<RootStack.Screen name="WaterTabBar" component={WaterRootTab} />
							{/* Air Stack Screens */}
							<RootStack.Screen
								name="TourDetails"
								component={TourDetailsScreen}
							/>
							
							<RootStack.Screen
								name="PassengerDetails"
								component={PassengerDetailsScreen}
							/>
							<RootStack.Screen
								name="FlightSearch"
								component={FlightSearchScreen}
							/>
							<RootStack.Screen
								name="FlightDetails"
								component={FlightDetailsScreen}
							/>
							<RootStack.Screen
								name="FlightBooking"
								component={FlightBookingScreen}
							/>
							
						</RootStack.Navigator>
					</NavigationContainer>
					<Toast />
				</GestureHandlerRootView>
			</Provider>
		</QueryClientProvider>
	);
}
