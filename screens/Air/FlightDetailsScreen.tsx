import React, { useState, useEffect, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useAirService } from "../../hooks/air/useAirService";
import { IBookingData, IFlight, ISearchFlight } from "../../types/airline";
import Toast from "react-native-toast-message";
import PageLoader from "../../components/ui/PageLoader";

// Import our reusable components
import HeaderImage from "@components/ui/air/HeaderImage";
import BookButton from "@components/ui/air/BookButton";
import InfoCard from "@components/ui/air/InfoCard";
import PilotInfo from "@components/ui/air/PilotInfo";
import PriceDisplay from "@components/ui/air/PriceDisplay";
import ReviewSection from "@components/ui/air/ReviewSection";
import TimeSelector from "@components/ui/air/TimeSelector";
import ToggleOption from "@components/ui/air/ToggleOption";

const FlightDetailsScreen = () => {
	const { params } = useRoute();
	const selectedFlight = useMemo(() => params, [params]) as IFlight;
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { useGetFlightById } = useAirService();

	// State management
	const [passengers, setPassengers] = useState(
		selectedFlight?.availableSchedules[0]?.sharedPassengers || 1
	);
	const [selectedTime, setSelectedTime] = useState("");

	// Fetch flight data
	const {
		data: flight,
		isLoading,
		isError,
		error,
	} = useGetFlightById<ISearchFlight>(selectedFlight?._id!);

	// Handle errors
	useEffect(() => {
		if (isError && error) {
			Toast.show({
				type: "error",
				text1: "Failed to load flight details. Please try again.",
			});
		}
	}, [isError, error]);

	// Time options for departure
	const timeOptions = useMemo(() => {
		if (!flight || !flight.availableSchedules) {
			return [];
		}
		return flight.availableSchedules.map((schedule) => {
			return schedule.departureTime instanceof Date
				? schedule.departureTime.toISOString()
				: String(schedule.departureTime);
		});
	}, [flight]);

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

	// Simplified state in FlightDetailsScreen
	const [bookingData, setBookingData] = useState<Partial<IBookingData>>({
		passengers,
		isTour: false,
		isSplitFare: false,
		isRoundTrip: true,
		pricePerSeat:
			selectedFlight?.availableSchedules[0]?.additionalCharge || 400000,
		scheduledIndex: undefined,
		departureTime: "",
	});

	// Toggle tour option - this controls if sharing is even possible
	const toggleTourOption = (enabled: boolean) => {
		setBookingData({
			...bookingData,
			isTour: enabled,
			// Reset shared flight if tour is disabled
			isSplitFare: enabled ? bookingData.isSplitFare : false,
		});
	};

	// Toggle shared flight option (only available if tour is true)
	const toggleSharedFlight = (enabled: boolean) => {
		setBookingData({
			...bookingData,
			isSplitFare: enabled,
		});
	};

	// When time is selected
	const handleSelectTime = (index: number, time: string) => {
		setBookingData({
			...bookingData,
			scheduledIndex: index,
			departureTime: time,
		});
		setSelectedTime(time);
	};

	// When proceed button is clicked
	const handleProceed = () => {
		if (bookingData.scheduledIndex === undefined) {
			Toast.show({
				type: "error",
				text1: "Please select a departure time.",
			});
			return;
		}
		if (bookingData.isTour && !bookingData.passengers) {
			Toast.show({
				type: "error",
				text1: "Please select the number of passengers.",
			});
			return;
		}

		// Calculate total price
		const totalPrice = bookingData?.pricePerSeat! * bookingData?.passengers!;

		// Pass the complete booking data object
		navigation.navigate("FlightBooking", {
			...bookingData,
			flight,
			selectedFlight,
			totalPrice,
		});
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			{isLoading && <PageLoader />}
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header with flight image */}
				<HeaderImage
					imageUrl={
						selectedFlight?.airline?.image ||
						"https://example.com/placeholder.jpg"
					}
					onBack={() => navigation.goBack()}
					rating={4.9}
				/>

				{/* Flight title */}
				<View style={{ padding: 16, backgroundColor: "white" }}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>
						{selectedFlight?.airline?.name || "Jet Marc - 001"} -{" "}
						{flight?.flightNumber || selectedFlight?.departure?.name}
					</Text>
				</View>

				{/* Departure time selection */}
				<TimeSelector
					timeOptions={timeOptions}
					selectedTime={selectedTime}
					onSelectTime={handleSelectTime}
				/>

				{/* Tour option - conditionally rendered */}
				<View
					style={{
						padding: 16,
						paddingVertical: 12,
						backgroundColor: "white",
						borderTopWidth: 1,
						borderTopColor: "#f3f4f6",
					}}
				>
					<TouchableOpacity
						style={{
							paddingVertical: 12,
							borderWidth: 1,
							borderColor: "#d1d5db",
							borderRadius: 8,
							alignItems: "center",
						}}
						onPress={() => toggleTourOption(!bookingData?.isTour)}
					>
						<Text style={{ fontSize: 16 }}>
							Would you like to make trip a tour?
						</Text>
					</TouchableOpacity>
				</View>
				{/* Conditionally display a passenger counter */}
				{bookingData?.isTour && (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							padding: 16,
							backgroundColor: "white",
							borderTopWidth: 1,
							borderTopColor: "#f3f4f6",
						}}
					>
						<Text style={{ fontSize: 16, marginBottom: 8 }}>
							Number of passengers:{" "}
						</Text>
						{/* Create an increment and decrement with actual count at the middle */}
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<TouchableOpacity
								style={{
									width: 40,
									height: 40,
									justifyContent: "center",
									alignItems: "center",
									borderWidth: 1,
									borderColor: "#d1d5db",
									borderRadius: 8,
									marginRight: 8,
								}}
								onPress={() => setPassengers((prev) => Math.max(prev - 1, 1))}
							>
								<Text style={{ fontSize: 16 }}>-</Text>
							</TouchableOpacity>
							<Text style={{ fontSize: 16 }}>{passengers}</Text>
							<TouchableOpacity
								style={{
									width: 40,
									height: 40,
									justifyContent: "center",
									alignItems: "center",
									borderWidth: 1,
									borderColor: "#d1d5db",
									borderRadius: 8,
									marginLeft: 8,
								}}
								onPress={() => setPassengers((prev) => prev + 1)}
							>
								<Text style={{ fontSize: 16 }}>+</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}

				{/* Conditional Split fare options */}
				{bookingData?.isTour && (
					<ToggleOption
						title="Split fare with other passengers"
						options={[
							{ label: "Yes", value: "true" },
							{ label: "No", value: "false" },
						]}
						selectedOption={bookingData.isSplitFare ? "true" : "false"}
						onSelect={(value) => toggleSharedFlight(value === "true")}
					/>
				)}

				{/* Price */}
				<PriceDisplay price={selectedFlight?.fixedPrice} currency="₦" />

				{/* Jet information */}
				<InfoCard title="Jet information">
					<Text>in good condition</Text>
				</InfoCard>

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
			<BookButton onPress={handleProceed} text="Proceed" />
		</SafeAreaView>
	);
};

export default FlightDetailsScreen;
