import DrawerContainer from "@components/Drawer/Index";
import AccountVerification from "@components/Settings/Profile";
import PageLoader from "@components/ui/PageLoader";
import { useAppNavigation } from "@hooks/useAppNavigation";
import CreditCardScreen from "@screens/Air/CreditCardScreen";
import FlightBookingScreen from "@screens/Air/FlightBookingScreen";
import FlightDetailsScreen from "@screens/Air/FlightDetailsScreen";
import FlightSearchScreen from "@screens/Air/FlightSearchScreen";
import AirRootTab from "@screens/Air/Index";
import MyWalletScreen from "@screens/Air/MyWalletScreen";
import PassengerDetailsScreen from "@screens/Air/PassengerDetailsScreen";
import PaymentsScreen from "@screens/Air/PaymentScreen";
import PaymentSuccessScreen from "@screens/Air/PaymentSuccessScreen";
import SeatSelectionScreen from "@screens/Air/SeatSelectionScreen";
import TicketConfirmationScreen from "@screens/Air/TicketConfirmationScreen";
import TourDetailsScreen from "@screens/Air/TourDetailScreen";
import TransactionDetailsScreen from "@screens/Air/TransactionDetailsScreen";
import TravelsScreen from "@screens/Air/TravelsScreen";
import CreateAccount from "@screens/Auth/CreateAccount";
import Login from "@screens/Auth/Login";
import Verification from "@screens/Auth/Verification";
import DriverDetails from "@screens/Driver/DriverDetails";
import DriverEndTrip from "@screens/Driver/DriverEndTrip";
import ManageTrips from "@screens/Driver/DriverItinerary/ManageTrips";
import TripItinerary from "@screens/Driver/DriverItinerary/TripItinerary";
import RideSchedule from "@screens/Driver/RideSchdule";
import CarIdentification from "@screens/Extras/CarIdentification";
import EndTrip from "@screens/Extras/EndTrip";
import RideIdentification from "@screens/Extras/RideIdentification";
import RideProgress from "@screens/Extras/RideProgress";
import TripConfirmation from "@screens/Extras/TripConfirmation";
import AddPaymentMethod from "@screens/MyWallet/AddPaymentMethod";
import WalletHome from "@screens/MyWallet/Home";
import PaymentSucessful from "@screens/MyWallet/PaymentSucessful";
import WalletHistory from "@screens/MyWallet/WalletHistory";
import Onboarding from "@screens/Onboarding/Index";
import Confirmation from "@screens/RideHaling/Confirmation";
import Home from "@screens/RideHaling/Home";
import ManageRide from "@screens/RideHaling/ManageRide";
import MapScreen from "@screens/RideHaling/MapScreen";
import Payment from "@screens/RideHaling/Payment";
import RideSelection from "@screens/RideHaling/RideSelection";
import TripSelection from "@screens/RideHaling/TripSelection";
import FAQs from "@screens/Settings/FAQs";
import IdDetails from "@screens/Settings/IdDetails";
import IdVerification from "@screens/Settings/IdVerification";
import WaterRootTab from "@screens/Water/Index";
import PaymentScreen from "@screens/Water/PaymentScreen";
import QuoteScreen from "@screens/Water/QuoteScreen";
import RecieverInfo from "@screens/Water/RecieverInfo";
import SuccessScreen from "@screens/Water/SucessScreen";
import SummaryScreen from "@screens/Water/SummaryScreen";
import TrackingScreen from "@screens/Water/TrackingScreen";
import { RootStack } from "./RootNavigator";
import Settings from "@screens/Settings/Settings";
import { IConversation } from "@redux/features/chatSlice";
import MessageScreen from "@screens/Chat/Messages";

const NavigationTree = () => {
	const { isLoading, isAuthenticated, isFirstTime } = useAppNavigation();

	if (isLoading) {
		return <PageLoader />;
	}

	return (
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
			<RootStack.Screen name="CreateAccount" component={CreateAccount} />
			<RootStack.Screen name="Login" component={Login} />
			<RootStack.Screen name="Verification" component={Verification} />

			<RootStack.Screen name="LandDrawer" component={DrawerContainer} />

			{/* Main App Screens */}
			<RootStack.Screen name="Home" component={Home} />
			<RootStack.Screen name="TripSelection" component={TripSelection} />
			<RootStack.Screen name="RideSelection" component={RideSelection} />
			<RootStack.Screen name="MapScreen" component={MapScreen} />
			<RootStack.Screen name="Payment" component={Payment} />
			<RootStack.Screen name="Confirmation" component={Confirmation} />

			{/* Driver Screens */}
			<RootStack.Screen name="RideSchedule" component={RideSchedule} />
			<RootStack.Screen name="ManageTrips" component={ManageTrips} />
			<RootStack.Screen name="TripItinerary" component={TripItinerary} />
			<RootStack.Screen name="DriverDetails" component={DriverDetails} />

			{/* Wallet Screens */}
			<RootStack.Screen name="WalletHome" component={WalletHome} />
			<RootStack.Screen name="WalletHistory" component={WalletHistory} />
			<RootStack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
			<RootStack.Screen name="PaymentSucessful" component={PaymentSucessful} />

			{/* Settings Screens */}
			<RootStack.Screen
				name="AccountVerification"
				component={AccountVerification}
			/>
			<RootStack.Screen name="IdVerification" component={IdVerification} />
			<RootStack.Screen name="IdDetails" component={IdDetails} />
			<RootStack.Screen name="Settings" component={Settings} />
			<RootStack.Screen name="FAQs" component={FAQs} />

			{/* Extra Screens */}
			<RootStack.Screen
				name="CarIdentification"
				component={CarIdentification}
			/>
			<RootStack.Screen
				name="RideIdentification"
				component={RideIdentification}
			/>
			<RootStack.Screen name="RideProgress" component={RideProgress} />
			<RootStack.Screen name="EndTrip" component={EndTrip} />
			<RootStack.Screen name="TripConfirmation" component={TripConfirmation} />
			<RootStack.Screen name="ManageRide" component={ManageRide} />
			<RootStack.Screen name="DriverEndTrip" component={DriverEndTrip} />
			<RootStack.Screen name="AirTabBar" component={AirRootTab} />
			<RootStack.Screen name="TourDetails" component={TourDetailsScreen} />
			<RootStack.Screen name="FlightSearch" component={FlightSearchScreen} />
			<RootStack.Screen name="FlightDetails" component={FlightDetailsScreen} />
			<RootStack.Screen
				options={{ headerShown: true, headerTitle: "Book Flight" }}
				name="FlightBooking"
				component={FlightBookingScreen}
			/>
			<RootStack.Screen name="Travels" component={TravelsScreen} />
			<RootStack.Screen
				options={{
					headerShown: true,
					headerTitle: "Choose Seat",
				}}
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

			{/* Water Management Screens */}
			<RootStack.Screen name="WaterTabBar" component={WaterRootTab} />
			<RootStack.Screen name="RecieverInfo" component={RecieverInfo} />
			<RootStack.Screen name="Message" component={MessageScreen} />
			<RootStack.Screen name="QuoteScreen" component={QuoteScreen} />
			<RootStack.Screen name="SummaryScreen" component={SummaryScreen} />
			<RootStack.Screen name="PaymentScreen" component={PaymentScreen} />
			<RootStack.Screen name="SucessScreen" component={SuccessScreen} />
			<RootStack.Screen name="TrackingScreen" component={TrackingScreen} />
		</RootStack.Navigator>
	);
};

export default NavigationTree;
