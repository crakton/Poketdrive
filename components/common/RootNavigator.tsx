import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/store";
import AuthCheck from "../Auth/AuthCheck";
import OnboardingSlide from "../../screens/Onboarding/OnboardingSlide";
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

export const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
	const { isAuthenticated, isFirstTime } = useAppSelector(
		(state) => state.auth
	);

	return (
		<NavigationContainer>
			<RootStack.Navigator screenOptions={{ headerShown: false }}>
				{/* Auth and Onboarding Screens */}
				{isFirstTime ? (
					<RootStack.Screen
						name="OnboardingSlide"
						component={OnboardingSlide}
					/>
				) : isAuthenticated ? (
					<RootStack.Screen name="Onboarding" component={Onboarding} />
				) : (
					<RootStack.Screen name="MainStack" component={StackContainer} />
				)}
				<RootStack.Screen name="Onboarding" component={Onboarding} />
				{/* Main Stacks */}
				{/* Drawer */}
				<RootStack.Screen name="LandDrawer" component={DrawerContainer} />
				{/* Air Tab Bar */}
				<RootStack.Screen name="AirTabBar" component={AirRootTab} />
				{/* Air Stack Screens */}
				<RootStack.Screen name="TourDetails" component={TourDetailsScreen} />

				<RootStack.Screen name="FlightSearch" component={FlightSearchScreen} />
				<RootStack.Screen
					name="FlightDetails"
					component={FlightDetailsScreen}
				/>
				<RootStack.Screen
					options={{
						headerShown: true,
						headerTitle: "Book Fight",
					}}
					name="FlightBooking"
					component={FlightBookingScreen}
				/>

				<RootStack.Screen name={"Travels"} component={TravelsScreen} />

				<RootStack.Screen
					options={{
						headerShown: true,
						headerTitle: "Choose Seat",
					}}
					name={"SelectSeat"}
					component={SeatSelectionScreen}
				/>

				<RootStack.Screen
					name={"PassengerDetails"}
					component={PassengerDetailsScreen}
				/>

				<RootStack.Screen
					options={{
						headerShown: true,
						headerTitle: "Payment",
					}}
					name={"Payments"}
					component={PaymentsScreen}
				/>

				<RootStack.Screen
					options={{
						headerShown: true,
						headerTitle: "Payment Report",
					}}
					name={"PaymentSuccess"}
					component={PaymentScreen}
				/>
				<RootStack.Screen
					options={{
						headerShown: true,
						headerTitle: "Boarding pass",
					}}
					name={"TicketConfirmation"}
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
			</RootStack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
