import React, { useState, useEffect, useMemo } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import ContinueButton from "../../components/ui/ContinueButton";
import { useAirService } from "../../hooks/air/useAirService";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import PageLoader from "../../components/ui/PageLoader";
import { IBookingData, IFlight, ISearchFlight } from "../../types/airline";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/ui/CustomButton";

const FlightDetailsScreen = () => {
	const { params } = useRoute();
	const selectedFlight = useMemo(() => params, [params]) as IFlight;
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { useGetFlightById } = useAirService();

	// State management
	const [passengers, setPassengers] = useState(
		selectedFlight?.availableSchedules[0]?.sharedPassengers || 1
	);
	const [showSplitFare, setShowSplitFare] = useState(false);
	const [selectedTime, setSelectedTime] = useState("");
	const [pricePerSeat, setPricePerSeat] = useState(
		selectedFlight?.availableSchedules[0]?.additionalCharge || 400000
	);

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

	// Passenger management functions
	const decreasePassengers = () => {
		if (passengers > 1) setPassengers(passengers - 1);
	};

	const increasePassengers = () => {
		if (passengers < 8) setPassengers(passengers + 1);
	};

	// Time options for departure
	const timeOptions = useMemo(() => {
		if (!flight || !flight.availableSchedules) {
			return [];
		}
		return flight.availableSchedules.map((schedule) => {
			return schedule.departureTime;
		});
	}, [flight]);

	// Simplified state in FlightDetailsScreen
	const [bookingData, setBookingData] = useState<Partial<IBookingData>>({
		passengers: 1,
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

	// // Toggle shared flight option (only available if tour is true)
	const toggleSharedFlight = (enabled: boolean) => {
		setBookingData({
			...bookingData,
			isSplitFare: enabled,
		});
	};

	// When time is selected
	const selectDepartureTime = (index: number, time: string) => {
		setBookingData({
			...bookingData,
			scheduledIndex: index,
			departureTime: time,
		});
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
		<SafeAreaView style={tw`flex-1 bg-white`}>
			{isLoading && <PageLoader />}
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header with flight image and back button */}
				<View style={tw`relative`}>
					<Image
						source={{
							uri:
								selectedFlight?.airline?.image ||
								"https://example.com/placeholder.jpg",
						}}
						style={tw`w-full h-56`}
						resizeMode="cover"
					/>
					<TouchableOpacity
						style={tw`absolute top-4 left-4 bg-white rounded-full p-2`}
						onPress={() => navigation.goBack()}
					>
						<AntDesign name="arrowleft" size={24} color="#000" />
					</TouchableOpacity>

					{/* Rating badge */}
					<View
						style={tw`absolute top-4 right-4 bg-white rounded-full py-1 px-3 flex-row items-center`}
					>
						<AntDesign name="star" size={16} color="#FFD700" />
						<Text style={tw`ml-1`}>4.9</Text>
					</View>
				</View>

				{/* Flight title */}
				<View style={tw`px-4 py-3 bg-white`}>
					<Text style={tw`text-xl font-bold`}>
						{selectedFlight?.airline?.name || "Jet Marc - 001"} -{" "}
						{flight?.flightNumber || selectedFlight?.departure?.name}
					</Text>
				</View>

				{/* Date selection */}
				{/* <View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<TouchableOpacity style={tw`flex-row items-center`}>
						<AntDesign name="calendar" size={20} color="#000" />
						<Text style={tw`ml-3 text-base`}>Sunday, July 30</Text>
					</TouchableOpacity>
				</View> */}

				{/* Departure time selection */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<Text style={tw`text-base font-medium mb-3`}>Departure time</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={tw`gap-2`}
					>
						{timeOptions.map((time, idx) => (
							<TouchableOpacity
								key={time.toString()}
								style={tw`px-6 py-2 rounded-md ${
									selectedTime === time ? "bg-[#FF6633]" : "bg-gray-100"
								}`}
								onPress={() => {
									setBookingData((prev) => ({ ...prev, scheduledIndex: idx }));
									setSelectedTime(time.toString());
									selectDepartureTime(idx, time.toString());
								}}
							>
								<Text
									style={tw`${
										selectedTime === time ? "text-white" : "text-black"
									} text-center`}
								>
									{time.toString()}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* Flight route */}
				{/* <View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<Text style={tw`text-base font-medium mb-3`}>Flight route</Text>
					<View style={tw`bg-gray-50 p-4 rounded-lg`}>
						<View style={tw`flex-row items-center mb-3`}>
							<Ionicons name="airplane-outline" size={20} color="#FF6347" />
							<Text style={tw`ml-2`}>Airfield: Krasnaya Polyana</Text>
						</View>

						<View style={tw`flex-row items-start mt-4`}>
							<View style={tw`items-center mr-4`}>
								<View style={tw`w-3 h-3 rounded-full bg-orange-500 mb-1`} />
								<View style={tw`w-0.5 h-12 bg-gray-300`} />
								<View style={tw`w-3 h-3 rounded-full bg-orange-500`} />
							</View>

							<View style={tw`flex-1`}>
								<Text style={tw`text-base mb-10`}>Novosibirsk</Text>
								<Text style={tw`text-base`}>Baikal</Text>
							</View>
						</View>
					</View>
				</View> */}

				{/* Tour option - conditionally rendered */}

				<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<TouchableOpacity
						style={tw`py-3 border border-gray-300 rounded-lg items-center`}
						onPress={() => toggleTourOption(!bookingData?.isTour)}
					>
						<Text style={tw`text-base`}>
							Would you like to make trip a tour?
						</Text>
					</TouchableOpacity>
				</View>
				{bookingData?.isTour && (
					<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
						<Text style={tw`text-base font-medium mb-3`}>
							Split fare with other passengers
						</Text>
						<View style={tw`flex-row gap-3`}>
							<TouchableOpacity
								style={tw`flex-1 py-2 rounded-lg ${
									bookingData?.isSplitFare
										? "bg-[#FF6633]"
										: "border border-gray-300"
								} items-center`}
								onPress={() => toggleSharedFlight(true)}
							>
								<Text
									style={tw`${
										bookingData?.isSplitFare ? "text-white" : "text-black"
									}`}
								>
									Yes
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={tw`flex-1 py-2 rounded-lg ${
									!bookingData?.isSplitFare
										? "bg-[#FF6633]"
										: "border border-gray-300"
								} items-center`}
								onPress={() => toggleSharedFlight(false)}
							>
								<Text
									style={tw`${
										!bookingData?.isSplitFare ? "text-white" : "text-black"
									}`}
								>
									No
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}

				{showSplitFare && (
					<>
						{/* Passengers count */}
						<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
							<View style={tw`flex-row items-center justify-between`}>
								<View style={tw`flex-row items-center`}>
									<FontAwesome name="users" size={18} color="#000" />
									<Text style={tw`ml-3 text-base`}>Passengers</Text>
								</View>

								<View style={tw`flex-row items-center`}>
									<TouchableOpacity
										style={tw`h-8 w-8 bg-gray-100 rounded-full items-center justify-center`}
										onPress={decreasePassengers}
									>
										<Text style={tw`text-lg font-medium`}>−</Text>
									</TouchableOpacity>

									<Text style={tw`mx-4 text-base`}>{passengers}</Text>

									<TouchableOpacity
										style={tw`h-8 w-8 bg-gray-100 rounded-full items-center justify-center`}
										onPress={increasePassengers}
									>
										<Text style={tw`text-lg font-medium`}>+</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

						{/* Price per seat */}
						<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
							<View style={tw`flex-row items-center justify-between`}>
								<View style={tw`flex-row items-center`}>
									<FontAwesome name="money" size={18} color="#000" />
									<Text style={tw`ml-3 text-base`}>Set price per seat</Text>
								</View>
								<Text style={tw`text-base font-medium`}>
									{pricePerSeat.toLocaleString()}
								</Text>
							</View>
						</View>
					</>
				)}
				{/* Trip type */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<View style={tw`flex-row gap-3 justify-between`}>
						<CustomButton
							style={tw`flex-1`}
							text="Round Trip"
							onPress={() => {}}
							suffixIcon={
								<AntDesign
									name="retweet"
									size={16}
									color="#fff"
									style={tw`ml-2`}
								/>
							}
						/>
						<CustomButton
							style={tw`flex-1`}
							text="One way"
							variant="outlined"
							suffixIcon={
								<AntDesign
									name="arrowright"
									size={16}
									color="#FF6633"
									style={tw`ml-2`}
								/>
							}
							onPress={() => {}}
						/>
					</View>
				</View>

				{/* Jet information */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100 mt-4`}>
					<Text style={tw`text-base font-medium mb-2`}>Jet information</Text>
					<View style={tw`bg-gray-50 p-3 rounded-lg`}>
						<Text>in good condition</Text>
					</View>
				</View>

				{/* Pilot information */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<Text style={tw`text-base font-medium mb-3`}>Pilot information</Text>
					<View style={tw`flex-row items-center mb-3`}>
						<Image
							source={require("../../assets/Profile.png")}
							style={tw`w-12 h-12 rounded-full`}
							defaultSource={require("../../assets/Profile.png")}
						/>
						<View style={tw`ml-3`}>
							<Text style={tw`font-medium`}>Oleg Samsonov</Text>
							<View style={tw`flex-row items-center`}>
								{[1, 2, 3, 4, 5].map((star) => (
									<AntDesign key={star} name="star" size={14} color="#FFD700" />
								))}
								<Text style={tw`ml-1`}>5</Text>
							</View>
						</View>
					</View>

					<View style={tw`flex-row mb-2`}>
						<View style={tw`bg-gray-50 p-2 rounded-lg mr-2 flex-1`}>
							<Text style={tw`text-gray-500 text-xs`}>Airplane</Text>
							<Text>Cessna 172</Text>
						</View>
						<View style={tw`bg-gray-50 p-2 rounded-lg flex-1`}>
							<Text style={tw`text-gray-500 text-xs`}>Hours flown</Text>
							<Text>1 250 hours</Text>
						</View>
					</View>

					<View style={tw`bg-gray-50 p-2 rounded-lg`}>
						<Text style={tw`text-gray-500 text-xs`}>License</Text>
						<Text>Commercial Pilot's License - CPL</Text>
					</View>
				</View>

				{/* Customer reviews - abbreviated for space */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100 mb-24`}>
					<View style={tw`flex-row items-center justify-between mb-3`}>
						<Text style={tw`text-base font-medium`}>Customer reviews</Text>
						<TouchableOpacity
						// onPress={() =>
						// 	navigation.navigate("AllReviews", {
						// 		flightId: selectedFlight?._id,
						// 	})
						// }
						>
							<Text style={tw`text-[#FF6633]`}>See all</Text>
						</TouchableOpacity>
					</View>

					<View style={tw`mb-4`}>
						<View style={tw`flex-row items-center mb-1`}>
							<Image
								source={require("../../assets/Profile.png")}
								style={tw`w-8 h-8 rounded-full mr-2`}
							/>
							<View>
								<Text style={tw`font-medium`}>Ivan</Text>
								<Text style={tw`text-xs text-gray-500`}>May 21, 2022</Text>
							</View>
						</View>

						<View style={tw`flex-row mb-2`}>
							{[1, 2, 3, 4, 5].map((star) => (
								<AntDesign key={star} name="star" size={14} color="#FFD700" />
							))}
						</View>

						<Text style={tw`text-gray-700`}>
							The flights are excellent! The airfield is located in a
							picturesque place and there is a lot to admire from above.
						</Text>
					</View>
				</View>
			</ScrollView>

			{/* Fixed proceed button at bottom */}
			<View
				style={tw`absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200`}
			>
				<CustomButton
					text="Proceed"
					disabled={false}
					onPress={handleProceed}
					loading={false}
				/>
			</View>
		</SafeAreaView>
	);
};

export default FlightDetailsScreen;
