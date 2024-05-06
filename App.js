import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import { useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import CreateAccount from "./screens/Auth/CreateAccount";
import Login from "./screens/Auth/Login";
import Verification from "./screens/Auth/Verification";
import Home from "./screens/RideHaling/Home";
import TripSelection from "./screens/RideHaling/TripSelection";
import RideSelection from "./screens/RideHaling/RideSelection";
import MapScreen from "./screens/RideHaling/MapScreen";
import Payment from "./screens/RideHaling/Payment";
import RideSchedule from "./screens/Driver//RideSchdule";
import WalletHome from "./screens/MyWallet/Home";
import WalletHistory from "./screens/MyWallet/WalletHistory";
import AddPaymentMethod from "./screens/MyWallet/AddPaymentMethod";
import PaymentSucessful from "./screens/MyWallet/PaymentSucessful";
import AccountVerification from "./screens/Settings/AccountVerification";
import IdVerification from "./screens/Settings/IdVerification";
import IdDetails from "./screens/Settings/IdDetails";
import Settings from "./screens/Settings/Settings";
import FAQs from "./screens/Settings/FAQs";
import RideIdentification from "./screens/Extras/RideIdentification";
import CarIdentification from "./screens/Extras/CarIdentification";
import RideProgress from "./screens/Extras/RideProgress";
import VehicleDetails from "./screens/Driver/VehicleDetails";
import EndTrip from "./screens/Extras/EndTrip";
import RidePreference from "./screens/Driver/RidePreference";
import BackRowSeating from "./screens/Driver/BackRowSeating";
import PriceSetting from "./screens/Driver/PriceSetting";
import ManageTrips from "./screens/Driver/DriverItinerary/ManageTrips";
import Confirmation from "./screens/RideHaling/Confirmation";
import TripConfirmation from "./screens/Extras/TripConfirmation";
import TripItinerary from "./screens/Driver/DriverItinerary/TripItinerary";
import DriverDetails from "./screens/Driver/DriverDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
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
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Stack.Navigator>
                {/* account creation starts here */}
                {/* <Stack.Screen
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
                />  */}

                {/* account creation ends here */}

                {/* here is the main home screen */}
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    headerShown: false,
                  }}
                />

                {/* passangesr screens starts here */}
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
                <Stack.Screen
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
                />

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
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
    </Provider>
    </QueryClientProvider>
  );
}
