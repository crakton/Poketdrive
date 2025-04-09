import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import all your screens
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
import OnboardingSlide from "../../screens/Onboarding/OnboardingSlide";
import Onboarding from "../../screens/Onboarding/Index";
import TourDetailsScreen from "../../screens/Air/TourDetailScreen";
import FlightDetailsScreen from "../../screens/Air/FlightDetailsScreen";
import PassengerDetailsScreen from "../../screens/Air/PassengerDetailsScreen";
import RecieverInfo from "../../screens/Water/RecieverInfo";
import QuoteScreen from "../../screens/Water/QuoteScreen";
import SummaryScreen from "../../screens/Water/SummaryScreen";
import PaymentScreen from "../../screens/Water/PaymentScreen";
import SuccessScreen from "../../screens/Water/SucessScreen";
import TrackingScreen from "../../screens/Water/TrackingScreen";
import WaterRootTab from "../../screens/Water/Index";

// Create a stack navigator specifically for this component
const Stack = createNativeStackNavigator();

const StackContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboard = async () => {
      setIsLoading(true);
      try {
        const isOnboard = await AsyncStorage.getItem("userData");
        setIsAuthenticated(!!isOnboard);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboard();
  }, []);

  // Return an actual Navigator component with screens
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth and Onboarding Screens */}
      {isAuthenticated ? (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : (
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      )}
      <Stack.Screen name="OnboardingSlide" component={OnboardingSlide} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Verification" component={Verification} />
      // Return an actual Navigator component with screens return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Main App Screens */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TripSelection" component={TripSelection} />
        <Stack.Screen name="RideSelection" component={RideSelection} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Confirmation" component={Confirmation} />

        {/* Main App Screens */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TripSelection" component={TripSelection} />
        <Stack.Screen name="RideSelection" component={RideSelection} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Confirmation" component={Confirmation} />

        {/* Driver Screens */}
        <Stack.Screen name="RideSchedule" component={RideSchedule} />
        <Stack.Screen name="ManageTrips" component={ManageTrips} />
        <Stack.Screen name="TripItinerary" component={TripItinerary} />
        <Stack.Screen name="DriverDetails" component={DriverDetails} />

        {/* Wallet Screens */}
        <Stack.Screen name="WalletHome" component={WalletHome} />
        <Stack.Screen name="WalletHistory" component={WalletHistory} />
        <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
        <Stack.Screen name="PaymentSucessful" component={PaymentSucessful} />

        {/* Settings Screens */}
        <Stack.Screen
          name="AccountVerification"
          component={AccountVerification}
        />
        <Stack.Screen name="IdVerification" component={IdVerification} />
        <Stack.Screen name="IdDetails" component={IdDetails} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="FAQs" component={FAQs} />

        {/* Extra Screens */}
        <Stack.Screen name="CarIdentification" component={CarIdentification} />
        <Stack.Screen
          name="RideIdentification"
          component={RideIdentification}
        />
        <Stack.Screen name="RideProgress" component={RideProgress} />
        <Stack.Screen name="EndTrip" component={EndTrip} />
        <Stack.Screen name="TripConfirmation" component={TripConfirmation} />
        <Stack.Screen name="ManageRide" component={ManageRide} />
        <Stack.Screen name="DriverEndTrip" component={DriverEndTrip} />

        {/* Air Stack Screens */}
        <Stack.Screen name="TourDetails" component={TourDetailsScreen} />
        <Stack.Screen name="FlightDetails" component={FlightDetailsScreen} />
        <Stack.Screen
          name="PassengerDetails"
          component={PassengerDetailsScreen}
        />

        {/* Water Stack Screens */}
      </Stack.Navigator>
      );
      {/* Extra Screens */}
      <Stack.Screen name="CarIdentification" component={CarIdentification} />
      <Stack.Screen name="RideIdentification" component={RideIdentification} />
      <Stack.Screen name="RideProgress" component={RideProgress} />
      <Stack.Screen name="EndTrip" component={EndTrip} />
      <Stack.Screen name="TripConfirmation" component={TripConfirmation} />
      <Stack.Screen name="ManageRide" component={ManageRide} />
      <Stack.Screen name="DriverEndTrip" component={DriverEndTrip} />
    </Stack.Navigator>
  );
};

export default StackContainer;
