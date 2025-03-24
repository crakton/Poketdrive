import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";

const TourDetailsScreen = () => {
	const navigation = useNavigation();
	const [passengers, setPassengers] = useState(1);
	const [flightDuration, setFlightDuration] = useState("35 min");
	const [startTime, setStartTime] = useState("9:00");

	// Flight route data
	const flightRoute = [
		{ name: "Airfield: Bychye Polye", icon: "airplane" },
		{ name: "Kronstadt", icon: "location" },
		{ name: "Gulf of Finland", icon: "location" },
		{ name: "Forts", icon: "location" },
		{ name: "Dam", icon: "location" },
	];

	// Duration options
	const durationOptions = ["20 min", "35 min", "40 min", "50 min", "60 min"];

	// Start time options
	const startTimeOptions = ["7:00", "9:00", "11:00", "13:00", "15:00"];

	const handleDecreasePassenger = () => {
		if (passengers > 1) {
			setPassengers(passengers - 1);
		}
	};

	const handleIncreasePassenger = () => {
		setPassengers(passengers + 1);
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<ScrollView>
				{/* Header image */}
				<View style={tw`relative`}>
					<Image
						source={require("../../assets/images/air/cassna.png")}
						style={tw`w-full h-48`}
						resizeMode="cover"
					/>
					<View style={tw`absolute top-4 left-4 flex-row items-center`}>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={tw`p-2 bg-white rounded-full mr-2`}
						>
							<Ionicons name="arrow-back" size={20} color="#000" />
						</TouchableOpacity>
						<View
							style={tw`bg-white rounded-full px-3 py-1 flex-row items-center`}
						>
							<Ionicons name="star" size={16} color="#FFD700" />
							<Text style={tw`ml-1`}>4.9</Text>
						</View>
					</View>
					<View style={tw`absolute top-4 right-4 flex-row`}>
						<TouchableOpacity style={tw`p-2 bg-white rounded-full mr-2`}>
							<Ionicons name="heart-outline" size={20} color="#000" />
						</TouchableOpacity>
						<TouchableOpacity style={tw`p-2 bg-white rounded-full`}>
							<Ionicons name="share-social-outline" size={20} color="#000" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Tour information */}
				<View style={tw`p-4`}>
					<Text style={tw`text-xl font-bold`}>Tour to Paris</Text>
					<Text style={tw`text-gray-600 mt-1`}>
						An exciting flight in a Cessna 172 sightseeing airplane over the
						neighborhood of the airfield. The flight includes performance of
						simple aerobatics figures and short-term weightlessness mode.
					</Text>

					<View style={tw`flex-row mt-4`}>
						<TouchableOpacity
							style={tw`bg-orange-500 rounded-lg py-2 px-4 mr-2`}
						>
							<Text style={tw`text-white`}>Hotels and hospitality</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`bg-white border border-orange-500 rounded-lg py-2 px-4`}
						>
							<Text style={tw`text-orange-500`}>Download Tour guide</Text>
						</TouchableOpacity>
					</View>

					{/* Location details */}
					<Text style={tw`text-xl font-bold mt-6`}>Paris</Text>

					{/* Passengers selector */}
					<View
						style={tw`mt-2 flex-row items-center justify-between border-b border-gray-200 pb-4`}
					>
						<View style={tw`flex-row items-center`}>
							<Ionicons
								name="people-outline"
								size={20}
								color="#999"
								style={tw`mr-2`}
							/>
							<Text>Passengers</Text>
						</View>
						<View style={tw`flex-row items-center`}>
							<TouchableOpacity
								onPress={handleDecreasePassenger}
								style={tw`p-2`}
							>
								<Text style={tw`text-lg font-bold`}>−</Text>
							</TouchableOpacity>
							<Text style={tw`mx-4`}>{passengers}</Text>
							<TouchableOpacity
								onPress={handleIncreasePassenger}
								style={tw`p-2`}
							>
								<Text style={tw`text-lg font-bold`}>+</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* Flight duration */}
					<View style={tw`mt-4`}>
						<Text style={tw`font-bold text-lg`}>Flight duration</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={tw`mt-2`}
						>
							{durationOptions.map((duration) => (
								<TouchableOpacity
									key={duration}
									style={tw`mr-2 rounded-lg ${
										flightDuration === duration
											? "bg-orange-500"
											: "bg-gray-200"
									} px-4 py-2`}
									onPress={() => setFlightDuration(duration)}
								>
									<Text
										style={tw`${
											flightDuration === duration ? "text-white" : "text-black"
										}`}
									>
										{duration}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>

					{/* Start of flight */}
					<View style={tw`mt-4`}>
						<Text style={tw`font-bold text-lg`}>Start of flight</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={tw`mt-2`}
						>
							{startTimeOptions.map((time) => (
								<TouchableOpacity
									key={time}
									style={tw`mr-2 rounded-lg ${
										startTime === time ? "bg-orange-500" : "bg-gray-200"
									} px-4 py-2`}
									onPress={() => setStartTime(time)}
								>
									<Text
										style={tw`${
											startTime === time ? "text-white" : "text-black"
										}`}
									>
										{time}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>

					{/* Flight route */}
					<View style={tw`mt-4`}>
						<Text style={tw`font-bold text-lg`}>Flight route</Text>
						<View style={tw`mt-2`}>
							{flightRoute.map((stop, index) => (
								<View key={stop.name} style={tw`flex-row items-center mb-4`}>
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
					<View style={tw`mt-4`}>
						<Text style={tw`font-bold text-lg`}>Pilot information</Text>
						<View style={tw`mt-2 flex-row items-center`}>
							<Avatar size={40} title="Oleg Samsonov" />
							<View style={tw`ml-2`}>
								<Text style={tw`font-bold`}>Oleg Samsonov</Text>
								<View style={tw`flex-row items-center`}>
									<Ionicons name="star" size={14} color="#FFD700" />
									<Ionicons name="star" size={14} color="#FFD700" />
									<Ionicons name="star" size={14} color="#FFD700" />
									<Ionicons name="star" size={14} color="#FFD700" />
									<Ionicons name="star" size={14} color="#FFD700" />
									<Text style={tw`ml-1`}>5</Text>
								</View>
							</View>
						</View>

						<View style={tw`flex-row mt-4`}>
							<View style={tw`flex-1 p-3 bg-gray-100 rounded-lg mr-2`}>
								<Text style={tw`text-gray-500`}>Airplane</Text>
								<Text style={tw`font-medium`}>Cessna 172</Text>
							</View>
							<View style={tw`flex-1 p-3 bg-gray-100 rounded-lg ml-2`}>
								<Text style={tw`text-gray-500`}>Hours flown</Text>
								<Text style={tw`font-medium`}>1,250 hours</Text>
							</View>
						</View>

						<View style={tw`mt-4 p-3 bg-gray-100 rounded-lg`}>
							<Text style={tw`text-gray-500`}>License</Text>
							<Text style={tw`font-medium`}>
								Commercial Pilot's License - CPL
							</Text>
						</View>
					</View>

					{/* Customer reviews */}
					<View style={tw`mt-6`}>
						<Text style={tw`font-bold text-lg`}>Customer reviews</Text>

						<View style={tw`mt-2 pb-4 border-b border-gray-200`}>
							<View style={tw`flex-row items-center`}>
								<Avatar size={30} title="Ivan" />
								<View style={tw`ml-2`}>
									<Text style={tw`font-bold`}>Ivan</Text>
									<Text style={tw`text-gray-500 text-xs`}>May 21, 2022</Text>
								</View>
								<View style={tw`ml-auto flex-row items-center`}>
									<Ionicons name="star" size={14} color="#FFD700" />
									<Ionicons name="star" size={14} color="#FFD700" />
									<Ionicons name="star" size={14} color="#FFD700" />
									<Ionicons name="star" size={14} color="#FFD700" />
									<Ionicons name="star" size={14} color="#FFD700" />
								</View>
							</View>
							<Text style={tw`mt-2`}>
								The flights are excellent! The airfield is located in a
								picturesque place and there is a lot to admire from above.
							</Text>
						</View>

						<View style={tw`mt-4`}>
							<View style={tw`flex-row items-center`}>
								<Avatar size={30} title="Alexander" />
								<Text style={tw`ml-2 font-bold`}>Alexander</Text>
							</View>
						</View>

						<TouchableOpacity
							style={tw`mt-4 py-2 border border-orange-500 rounded-lg items-center`}
						>
							<Text style={tw`text-orange-500`}>All reviews</Text>
						</TouchableOpacity>
					</View>

					{/* Booking button */}
					<TouchableOpacity
						style={tw`mt-6 bg-orange-500 p-4 rounded-lg items-center`}
					>
						<Text style={tw`text-white font-bold`}>Book for 10,000 ₽</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default TourDetailsScreen;
