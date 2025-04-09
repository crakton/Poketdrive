import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import CreateAccount from "../../screens/Auth/CreateAccount";
import Login from "../../screens/Auth/Login";
import Onboarding from "../../screens/Onboarding/Index";
import StackContainer from "../Stack/Index";
import DrawerContainer from "../Drawer/Index";
import AirRootTab from "../../screens/Air/Index";
import TourDetailsScreen from "../../screens/Air/TourDetailScreen";
import FlightSearchScreen from "../../screens/Air/FlightSearchScreen";
import FlightDetailsScreen from "../../screens/Air/FlightDetailsScreen";
import FlightBookingScreen from "../../screens/Air/FlightBookingScreen";
import TravelsScreen from "../../screens/Air/TravelsScreen";
import SeatSelectionScreen from "../../screens/Air/SeatSelectionScreen";
import PassengerDetailsScreen from "../../screens/Air/PassengerDetailsScreen";
import PaymentsScreen from "../../screens/Air/PaymentScreen";
import PaymentScreen from "../../screens/Air/PaymentScreen";
import TicketConfirmationScreen from "../../screens/Air/TicketConfirmationScreen";
import PaymentSuccessScreen from "../../screens/Air/PaymentSuccessScreen";
import MyWalletScreen from "../../screens/Air/MyWalletScreen";
import TransactionDetailsScreen from "../../screens/Air/TransactionDetailsScreen";
import Verification from "../../screens/Auth/Verification";
import PageLoader from "../ui/PageLoader";
import CreditCardScreen from "@screens/Air/CreditCardScreen";

export const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

	useEffect(() => {
		const loadAuthData = async () => {
			try {
				const token = await AsyncStorage.getItem("token");
				const user = await AsyncStorage.getItem("user");
				const firstTime = await AsyncStorage.getItem("firstTime");

				setIsAuthenticated(!!token && !!user);
				setIsFirstTime(firstTime === "true");
			} catch (error) {
				console.error("Error loading auth data", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadAuthData();
	}, []);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<NavigationContainer>
			<RootStack.Navigator
				initialRouteName={
					isFirstTime
						? "CreateAccount"
						: isAuthenticated
						? "Onboarding"
						: "CreateAccount"
				}
				screenOptions={{ headerShown: false }}
			>
				<RootStack.Screen name="Onboarding" component={Onboarding} />
				<RootStack.Screen name="MainStack" component={StackContainer} />
				<RootStack.Screen name="CreateAccount" component={CreateAccount} />
				<RootStack.Screen name="Login" component={Login} />
				<RootStack.Screen name="Verification" component={Verification} />
				<RootStack.Screen name="LandDrawer" component={DrawerContainer} />
				<RootStack.Screen name="AirTabBar" component={AirRootTab} />
				<RootStack.Screen name="TourDetails" component={TourDetailsScreen} />
				<RootStack.Screen name="FlightSearch" component={FlightSearchScreen} />
				<RootStack.Screen
					name="FlightDetails"
					component={FlightDetailsScreen}
				/>
				<RootStack.Screen
					options={{ headerShown: true, headerTitle: "Book Flight" }}
					name="FlightBooking"
					component={FlightBookingScreen}
				/>
				<RootStack.Screen name="Travels" component={TravelsScreen} />
				<RootStack.Screen
					options={{ headerShown: true, headerTitle: "Choose Seat" }}
					name="SelectSeat"
					component={SeatSelectionScreen}
				/>
				<RootStack.Screen
					name="PassengerDetails"
					component={PassengerDetailsScreen}
				/>
				<RootStack.Screen
					options={{ headerShown: true, headerTitle: "Payment" }}
					name="Payments"
					component={PaymentsScreen}
				/>
				<RootStack.Screen
					options={{ headerShown: true, headerTitle: "Payment Report" }}
					name="PaymentSuccess"
					component={PaymentScreen}
				/>
				<RootStack.Screen
					options={{ headerShown: true, headerTitle: "Boarding pass" }}
					name="TicketConfirmation"
					component={TicketConfirmationScreen}
				/>
				<RootStack.Screen
					name="WalletPaymentSuccess"
					component={PaymentSuccessScreen}
				/>
				<RootStack.Screen name="MyWallet" component={MyWalletScreen} />
				<RootStack.Screen
					name="TransactionDetails"
					component={TransactionDetailsScreen}
				/>
				<RootStack.Screen
					options={{ headerShown: true, headerTitle: "Card Management" }}
					name={"CardManagement"}
					component={CreditCardScreen}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
