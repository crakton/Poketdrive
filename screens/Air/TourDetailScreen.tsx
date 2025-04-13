import React, { useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	NavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import tw from "twrnc";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";
import Toast from "react-native-toast-message";
import { IAirline, IFlight } from "../../types/airline";
import { RootStackParamList } from "../../types/index";

const TourDetailsScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { params } = useRoute();
	const preview = params as IFlight;

	// State management
	const [passengers, setPassengers] = useState(1);
	const [selectedTime, setSelectedTime] = useState("");
	const [scheduledIndex, setScheduledIndex] = useState<number>();

	// Flight route data
	const flightRoute = [
		{ name: "Airfield: Bychye Polye", icon: "airplane" },
		{ name: "Kronstadt", icon: "location" },
		{ name: "Gulf of Finland", icon: "location" },
		{ name: "Forts", icon: "location" },
		{ name: "Dam", icon: "location" },
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
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header image */}
				<View style={tw`relative`}>
					<Image
						source={{ uri: preview.airline.image }}
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

				{/* Tour title */}
				<View style={tw`px-4 py-3 bg-white`}>
					<Text style={tw`text-xl font-bold`}>
						Tour to {preview.airline.country}
					</Text>
					<Text style={tw`text-base mt-1`}>{preview.airline.name}</Text>
				</View>

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
									setScheduledIndex(idx);
									setSelectedTime(time.toString());
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

				{/* Passengers count */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<View style={tw`flex-row items-center justify-between`}>
						<View style={tw`flex-row items-center`}>
							<Ionicons
								name="people-outline"
								size={20}
								color="#999"
								style={tw`mr-2`}
							/>
							<Text style={tw`text-base`}>Passengers</Text>
						</View>

						<View style={tw`flex-row items-center`}>
							<TouchableOpacity
								style={tw`h-8 w-8 bg-gray-100 rounded-full items-center justify-center`}
								onPress={handleDecreasePassenger}
							>
								<Text style={tw`text-lg font-medium`}>−</Text>
							</TouchableOpacity>

							<Text style={tw`mx-4 text-base`}>{passengers}</Text>

							<TouchableOpacity
								style={tw`h-8 w-8 bg-gray-100 rounded-full items-center justify-center`}
								onPress={handleIncreasePassenger}
							>
								<Text style={tw`text-lg font-medium`}>+</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				{/* Share flight information */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<View style={tw`bg-gray-50 p-4 rounded-lg`}>
						<Text style={tw`text-base font-medium mb-2`}>Shared Flight</Text>
						<Text style={tw`text-gray-700`}>
							You're joining a shared tour. The fare will be split among all
							passengers.
						</Text>
					</View>
				</View>

				{/* Price */}
				<View style={tw`py-4 px-5`}>
					<Text style={tw`text-base font-medium mb-2`}>Ticket price</Text>
					<Text style={tw`text-xl font-bold text-center mt-4 bg-gray-100 p-3`}>
						₽{(preview?.fixedPrice || 10000).toLocaleString()}
					</Text>
				</View>

				{/* Flight route */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<Text style={tw`text-base font-medium mb-3`}>Flight route</Text>
					<View style={tw`bg-gray-50 p-4 rounded-lg`}>
						{flightRoute.map((stop, index) => (
							<View
								key={stop.name}
								style={tw`flex-row items-center mb-4 last:mb-0`}
							>
								<View
									style={tw`mr-2 rounded-full ${
										index === 0 ? "bg-orange-100" : "bg-gray-200"
									} p-2`}
								>
									<Ionicons
										name={index === 0 ? "airplane" : "location-outline"}
										size={16}
										color={index === 0 ? "#FF5722" : "#666"}
									/>
								</View>
								<Text>{stop.name}</Text>
							</View>
						))}
					</View>
				</View>

				{/* Pilot information */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100`}>
					<Text style={tw`text-base font-medium mb-3`}>Pilot information</Text>
					<View style={tw`flex-row items-center mb-3`}>
						<Avatar size={40} title="OS" />
						<View style={tw`ml-3`}>
							<Text style={tw`font-medium`}>Oleg Samsonov</Text>
							<View style={tw`flex-row items-center`}>
								{[1, 2, 3, 4, 5].map((star) => (
									<Ionicons key={star} name="star" size={14} color="#FFD700" />
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
							<Text>1,250 hours</Text>
						</View>
					</View>

					<View style={tw`bg-gray-50 p-2 rounded-lg`}>
						<Text style={tw`text-gray-500 text-xs`}>License</Text>
						<Text>Commercial Pilot's License - CPL</Text>
					</View>
				</View>

				{/* Customer reviews */}
				<View style={tw`px-4 py-3 bg-white border-t border-gray-100 mb-24`}>
					<View style={tw`flex-row items-center justify-between mb-3`}>
						<Text style={tw`text-base font-medium`}>Customer reviews</Text>
						<TouchableOpacity>
							<Text style={tw`text-[#FF6633]`}>See all</Text>
						</TouchableOpacity>
					</View>

					<View style={tw`mb-4`}>
						<View style={tw`flex-row items-center mb-1`}>
							<Avatar size={30} title="IV" />
							<View style={tw`ml-2`}>
								<Text style={tw`font-medium`}>Ivan</Text>
								<Text style={tw`text-xs text-gray-500`}>May 21, 2022</Text>
							</View>
						</View>

						<View style={tw`flex-row mb-2`}>
							{[1, 2, 3, 4, 5].map((star) => (
								<Ionicons key={star} name="star" size={14} color="#FFD700" />
							))}
						</View>

						<Text style={tw`text-gray-700`}>
							The flights are excellent! The airfield is located in a
							picturesque place and there is a lot to admire from above.
						</Text>
					</View>
				</View>
			</ScrollView>

			{/* Fixed Book button at bottom */}
			<View
				style={tw`absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200`}
			>
				<TouchableOpacity
					style={tw`bg-[#FF6633] py-3 rounded-lg items-center`}
					onPress={handleBooking}
				>
					<Text style={tw`text-white font-bold text-base`}>Book</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default TourDetailsScreen;
