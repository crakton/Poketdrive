import { TrackingOrder } from "@lib/types";

export type RootStackParamList = {
	CreateAccount?: {};
	MainStack?: {};
	LandDrawer?: {};
	StackContainer?: {};
	Air?: {};
	Home?: {};
	AirTabBar?: {};
	OnboardingSlide?: {};
	Onboarding?: {};
	PhoneNumberScreen?: {};
	NameScreen?: {};
	ConfirmationCodeScreen?: {};
	DateOfBirthScreen?: {};
	Dashboard?: {};
	TourDetails?: {};
	Login?: {};
	TicketConfirmation?: {};
	ProfileScreen?: {};
	FlightSearch?: {};
	FlightDetails?: {};
	PassengerDetails?: {};
	FlightBooking?: {};
	PaymentSuccess?: {};
	Payments?: {};
	Payment?: {};
	SelectSeat?: {};
	Travels?: {};
	MyWallet?: {};
	TransactionDetails?: {};
	ForgotPassword?: {};
	CardManagement?: {};

	RecieverInfo: undefined;
	QuoteScreen: undefined;
	SummaryScreen: undefined;
	PaymentScreen: undefined;
	Water: undefined;
	SendScreen: undefined;
	SucessScreen: undefined;
	WaterTabBar: undefined;
	TrackingScreen: {
		order: TrackingOrder;
	};
};
