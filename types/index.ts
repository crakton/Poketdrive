export type Dict = Record<string, string>;
export type DictOf<T> = Record<string, T>;
export type RootStackParamList = {
  CreateAccount: undefined;
  Air: undefined;
  Home: undefined;
  AirTabBar: undefined;
  OnboardingSlide: undefined;
  Onboarding: undefined;
  PhoneNumberScreen: undefined;
  NameScreen: undefined;
  ConfirmationCodeScreen: undefined;
  DateOfBirthScreen: undefined;
  Dashboard: undefined;
  TourDetails: undefined;
  Login: undefined;
  TicketConfirmation: undefined;
  ProfileScreen: undefined;
  FlightSearch: undefined;
  FlightDetails: undefined;
  PassengerDetails: undefined;
  FlightBooking: undefined;
  PaymentSuccess: undefined;
  Payments: undefined;
  Payment: undefined;
  SelectSeat: undefined;
  Travels: undefined;

  RecieverInfo: undefined;
  QuoteScreen: undefined;
  SummaryScreen: undefined;
  PaymentScreen: undefined;
  Water: undefined;
  SendScreen: undefined;
  SucessScreen: undefined;
  WaterTabBar: undefined;
  TrackingScreen: {
    order: {
      id: string;
      description: string;
      color: string;
      status: string;
      icon: string;
      origin: number[];
      destination: number[];
    };
  };
};
