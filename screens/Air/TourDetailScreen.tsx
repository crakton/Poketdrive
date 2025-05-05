import React, { useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { IFlight } from "../../types/airline";
import { RootStackParamList } from "../../types/index";
import Toast from "react-native-toast-message";

// Import our reusable components
import HeaderImage from "@components/ui/air/HeaderImage";
import BookButton from "@components/ui/air/BookButton";
import InfoCard from "@components/ui/air/InfoCard";
import PassengerSelector from "@components/ui/air/PassengerSelector";
import PilotInfo from "@components/ui/air/PilotInfo";
import PriceDisplay from "@components/ui/air/PriceDisplay";
import ReviewSection from "@components/ui/air/ReviewSection";
import RouteDisplay, { IRoute } from "@components/ui/air/RouteDisplay";
import TimeSelector from "@components/ui/air/TimeSelector";

const TourDetailsScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { params } = useRoute();
	const preview = params as IFlight;

	// State management
	const [passengers, setPassengers] = useState(1);
	const [selectedTime, setSelectedTime] = useState("");
	const [scheduledIndex, setScheduledIndex] = useState<number>();

	// Flight route data
	const flightRoute: IRoute[] = [
		{ name: "Airfield: Bychye Polye", icon: "airplane-outline" },
		{ name: "Kronstadt", icon: "location-outline" },
		{ name: "Gulf of Finland", icon: "location-outline" },
		{ name: "Forts", icon: "location-outline" },
		{ name: "Dam", icon: "location-outline" },
	];

	// Pilot information
	const pilotInfo = {
		name: "Oleg Samsonov",
		rating: 5,
		airplane: "Cessna 172",
		hoursFlown: 1250,
		license: "Commercial Pilot's License - CPL",
	};

	// Mock review for demo
	const reviews = [
		{
			name: "Ivan",
			date: "May 21, 2022",
			rating: 5,
			text: "The flights are excellent! The airfield is located in a picturesque place and there is a lot to admire from above.",
		},
	];

	// Time options for departure
	const timeOptions = useMemo(() => {
		if (!preview || !preview.availableSchedules) {
			return [];
		}
		return preview.availableSchedules.map((schedule) => {
			return schedule.departureTime;
		});
	}, [preview]);

	const handleDecreasePassenger = () => {
		if (passengers > 1) {
			setPassengers(passengers - 1);
		}
	};

	const handleIncreasePassenger = () => {
		if (passengers < 8) {
			setPassengers(passengers + 1);
		}
	};

	const handleSelectTime = (idx: number, time: string) => {
		setScheduledIndex(idx);
		setSelectedTime(time);
	};

	// Booking data preparation
	const bookingData = {
		passengers: passengers,
		isTour: true,
		isSplitFare: true,
		isRoundTrip: false,
		departureTime: selectedTime,
		scheduledIndex,
		flight: preview,
		selectedFlight: preview,
		totalPrice: preview?.fixedPrice || 10000,
	};

	// Handle booking action
	const handleBooking = () => {
		if (!selectedTime) {
			Toast.show({
				type: "error",
				text1: "Please select a departure time.",
			});
			return;
		}

		navigation.navigate("FlightBooking", bookingData);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header image */}
				<HeaderImage
					imageUrl={preview.airline.image}
					onBack={() => navigation.goBack()}
					rating={4.9}
				/>

				{/* Tour title */}
				<View style={{ padding: 16, backgroundColor: "white" }}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>
						Tour to {preview.airline.country}
					</Text>
					<Text style={{ fontSize: 16, marginTop: 4 }}>
						{preview.airline.name}
					</Text>
				</View>

				{/* Departure time selection */}
				<TimeSelector
					timeOptions={timeOptions as string[]}
					selectedTime={selectedTime}
					onSelectTime={handleSelectTime}
				/>

				{/* Passengers count */}
				<PassengerSelector
					passengers={passengers}
					onDecrease={handleDecreasePassenger}
					onIncrease={handleIncreasePassenger}
				/>

				{/* Share flight information */}
				<InfoCard title="Shared Flight">
					<Text style={{ color: "#4B5563" }}>
						You're joining a shared tour. The fare will be split among all
						passengers.
					</Text>
				</InfoCard>

				{/* Price */}
				<PriceDisplay price={preview?.fixedPrice || 10000} />

				{/* Flight route */}
				<RouteDisplay routes={flightRoute} />

				{/* Pilot information */}
				<PilotInfo pilot={pilotInfo} />

				{/* Customer reviews */}
				<ReviewSection
					reviews={reviews}
					onSeeAll={() => {
						// Handle see all reviews
					}}
				/>
			</ScrollView>

			{/* Fixed Book button at bottom */}
			<BookButton onPress={handleBooking} />
		</SafeAreaView>
	);
};

export default TourDetailsScreen;
