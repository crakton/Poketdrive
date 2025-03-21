import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CreateAccount from "../../screens/Auth/CreateAccount";
import Login from "../../screens/Auth/Login";
import Verification from "../../screens/Auth/Verification";
import Home from "../../screens/RideHaling/Home";
import TripSelection from "../../screens/RideHaling/TripSelection";
import RideSelection from "../../screens/RideHaling/RideSelection";
import MapScreen from "../../screens/RideHaling/MapScreen";
import Payment from "../../screens/RideHaling/Payment";
import RideSchedule from "../../screens/Driver//RideSchdule";
import WalletHome from "../../screens/MyWallet/Home";
import WalletHistory from "../../screens/MyWallet/WalletHistory";
import AddPaymentMethod from "../../screens/MyWallet/AddPaymentMethod";
import PaymentSucessful from "../../screens/MyWallet/PaymentSucessful";
import AccountVerification from "../../screens/Settings/AccountVerification";
import IdVerification from "../../screens/Settings/IdVerification";
import IdDetails from "../../screens/Settings/IdDetails";
import Settings from "../../screens/Settings/Settings";
import FAQs from "../../screens/Settings/FAQs";
import RideIdentification from "../../screens/Extras/RideIdentification";
import CarIdentification from "../../screens/Extras/CarIdentification";
import RideProgress from "../../screens/Extras/RideProgress";
import EndTrip from "../../screens/Extras/EndTrip";
import ManageTrips from "../../screens/Driver/DriverItinerary/ManageTrips";
import Confirmation from "../../screens/RideHaling/Confirmation";
import TripConfirmation from "../../screens/Extras/TripConfirmation";
import TripItinerary from "../../screens/Driver/DriverItinerary/TripItinerary";
import DriverDetails from "../../screens/Driver/DriverDetails";
import ManageRide from "../../screens/RideHaling/ManageRide";
import DriverEndTrip from "../../screens/Driver/DriverEndTrip";
import Onboarding from "../../screens/Onboarding/Index";
import OnboardingSlide from "../../screens/Onboarding/OnboardingSlide";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerContainer from "../Drawer/Index";

const Stack = createNativeStackNavigator();

const StackContainer = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [hasOnboarded, setHasOnboarded] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkOnboard = async () => {
			setIsLoading(true);
			try {
				const isOnboard = await AsyncStorage.getItem("userData");

				if (isOnboard) {
					setIsAuthenticated(true);
					isOnboard !== null ? JSON.parse(isOnboard) : null;
					setIsLoading(false);
				} else {
					setIsAuthenticated(false);
					setIsLoading(false);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		checkOnboard();
	}, []);
	return (
		<SafeAreaProvider>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
			>
				{isLoading ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : (
					<Stack.Navigator
						initialRouteName={
							hasOnboarded
								? isAuthenticated
									? "Home"
									: "CreateAccount"
								: "Onboarding"
						}
					>
						<Stack.Screen
							name="Onboarding"
							component={Onboarding}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="OnboardingSlide"
							component={OnboardingSlide}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="CreateAccount"
							component={CreateAccount}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="Login"
							component={Login}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="Verification"
							component={Verification}
							options={{
								headerShown: false,
							}}
						/>

						{/* drawer  */}
						<Stack.Screen
							name="Drawer"
							component={DrawerContainer}
							options={{
								headerShown: false,
							}}
						/>

						{/* account creation ends here */}

						{/* here is the main home screen */}
						<Stack.Screen
							name="Home"
							component={Home}
							options={{
								headerShown: false,
							}}
						/>

						{/* passangesr./.. screens starts here */}
						<Stack.Screen
							name="TripSelection"
							component={TripSelection}
							options={{
								headerShown: false,
							}}
						/>

						<Stack.Screen
							name="RideSelection"
							component={RideSelection}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="MapScreen"
							component={MapScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="Payment"
							component={Payment}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="Confirmation"
							component={Confirmation}
							options={{
								headerShown: false,
							}}
						/>

						{/* screen for driver to set info  */}
						<Stack.Screen
							name="RideSchedule"
							component={RideSchedule}
							options={{
								headerShown: false,
							}}
						/>
						{/* <Stack.Screen
                    name="VehicleDetails"
                    component={VehicleDetails}
                    options={{
                      headerShown: false,
											}}
											/>
											<Stack.Screen
                    name="RidePreference"
                    component={RidePreference}
                    options={{
                      headerShown: false,
											}}
											/>
											<Stack.Screen
											name="BackRowSeating"
											component={BackRowSeating}
											options={{
												headerShown: false,
												}}
												/>
												<Stack.Screen
												name="PriceSetting"
												component={PriceSetting}
                    options={{
                      headerShown: false,
											}}
											/> */}

						<Stack.Screen
							name="ManageTrips"
							component={ManageTrips}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="TripItinerary"
							component={TripItinerary}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="DriverDetails"
							component={DriverDetails}
							options={{
								headerShown: false,
							}}
						/>

						{/* driver setting ends here */}
						<Stack.Screen
							name="WalletHome"
							component={WalletHome}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="WalletHistory"
							component={WalletHistory}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="AddPaymentMethod"
							component={AddPaymentMethod}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="PaymentSucessful"
							component={PaymentSucessful}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="AccountVerification"
							component={AccountVerification}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="IdVerification"
							component={IdVerification}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="IdDetails"
							component={IdDetails}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Settings"
							component={Settings}
							options={{ headerShown: false }}
						/>

						<Stack.Screen
							name="FAQs"
							component={FAQs}
							options={{ headerShown: false }}
						/>

						<Stack.Screen
							name="CarIdentification"
							component={CarIdentification}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="RideIdentification"
							component={RideIdentification}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="RideProgress"
							component={RideProgress}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="EndTrip"
							component={EndTrip}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="TripConfirmation"
							component={TripConfirmation}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ManageRide"
							component={ManageRide}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="DriverEndTrip"
							component={DriverEndTrip}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				)}
			</KeyboardAvoidingView>
		</SafeAreaProvider>
	);
};

export default StackContainer;
