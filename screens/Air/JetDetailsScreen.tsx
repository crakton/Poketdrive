import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const JetDetailScreen = () => {
	const navigation = useNavigation();
	const [passengers, setPassengers] = React.useState(4);
	const [selectedTime, setSelectedTime] = React.useState("9:00");
	const [isRoundTrip, setIsRoundTrip] = React.useState(true);

	const decreasePassengers = () => {
		if (passengers > 1) setPassengers(passengers - 1);
	};

	const increasePassengers = () => {
		if (passengers < 8) setPassengers(passengers + 1);
	};

	const timeOptions = ["7:00", "9:00", "11:00", "13:00", "15:00"];

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<ScrollView>
				{/* Header with back button */}
				<View style={tw`relative`}>
					<Image
						source={require("../assets/jet-image.jpg")}
						style={tw`w-full h-56`}
						resizeMode="cover"
					/>
					<TouchableOpacity
						style={tw`absolute top-4 left-4 bg-white rounded-full p-2`}
						onPress={() => navigation.goBack()}
					>
						<AntDesign name="arrowleft" size={24} color="#000" />
					</TouchableOpacity>

					{/* Rating and jet info */}
					<View
						style={tw`flex-row items-center justify-between px-4 py-2 bg-white`}
					>
						<View style={tw`flex-row items-center`}>
							<AntDesign name="star" size={16} color="#FFD700" />
							<Text style={tw`ml-1 text-gray-700`}>4.9</Text>
						</View>
						<Text style={tw`font-medium`}>Jet Marc</Text>
						<View style={tw`flex-row items-center`}>
							<FontAwesome name="users" size={16} color="#000" />
							<Text style={tw`ml-1 text-gray-700`}>
								Passengers: {passengers}
							</Text>
						</View>
					</View>
				</View>

				{/* Jet title */}
				<View style={tw`px-4 py-2 border-b border-gray-200`}>
					<Text style={tw`text-xl font-bold`}>Jet Marc - 001</Text>
				</View>

				{/* Date picker */}
				<View
					style={tw`flex-row items-center justify-between px-4 py-4 border-b border-gray-100`}
				>
					<View style={tw`flex-row items-center`}>
						<AntDesign name="calendar" size={20} color="#000" />
						<Text style={tw`ml-2`}>Sunday, July 30</Text>
					</View>
				</View>

				{/* Passengers */}
				<View
					style={tw`flex-row items-center justify-between px-4 py-4 border-b border-gray-100`}
				>
					<Text>Passengers</Text>
					<View style={tw`flex-row items-center`}>
						<TouchableOpacity
							style={tw`px-3 py-1 border border-gray-300 rounded-lg`}
							onPress={decreasePassengers}
						>
							<Text style={tw`text-lg`}>−</Text>
						</TouchableOpacity>
						<Text style={tw`mx-4`}>{passengers}</Text>
						<TouchableOpacity
							style={tw`px-3 py-1 border border-gray-300 rounded-lg`}
							onPress={increasePassengers}
						>
							<Text style={tw`text-lg`}>+</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Trip type */}
				<View
					style={tw`flex-row justify-between px-4 py-4 border-b border-gray-100`}
				>
					<TouchableOpacity
						style={tw`flex-row items-center`}
						onPress={() => setIsRoundTrip(true)}
					>
						<View
							style={tw`${
								isRoundTrip ? "bg-blue-500" : "border border-gray-300"
							} w-5 h-5 rounded-full items-center justify-center mr-2`}
						>
							{isRoundTrip && (
								<View style={tw`bg-white w-2 h-2 rounded-full`} />
							)}
						</View>
						<Text>Round Trip</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={tw`flex-row items-center`}
						onPress={() => setIsRoundTrip(false)}
					>
						<View
							style={tw`${
								!isRoundTrip ? "bg-blue-500" : "border border-gray-300"
							} w-5 h-5 rounded-full items-center justify-center mr-2`}
						>
							{!isRoundTrip && (
								<View style={tw`bg-white w-2 h-2 rounded-full`} />
							)}
						</View>
						<Text>One way</Text>
						<AntDesign
							name="arrowright"
							size={16}
							color="#000"
							style={tw`ml-2`}
						/>
					</TouchableOpacity>
				</View>

				{/* Departure time */}
				<View style={tw`px-4 py-4 border-b border-gray-100`}>
					<Text style={tw`text-base font-medium mb-3`}>Departure time</Text>
					<View style={tw`flex-row justify-between`}>
						{timeOptions.map((time) => (
							<TouchableOpacity
								key={time}
								style={tw`px-4 py-2 rounded-md ${
									selectedTime === time ? "bg-orange-500" : "bg-gray-100"
								}`}
								onPress={() => setSelectedTime(time)}
							>
								<Text
									style={tw`${
										selectedTime === time ? "text-white" : "text-black"
									}`}
								>
									{time}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* Flight route */}
				<View style={tw`px-4 py-4`}>
					<Text style={tw`text-base font-medium mb-3`}>Flight route</Text>
					<View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
						<View style={tw`flex-row items-center mb-2`}>
							<Ionicons name="airplane-outline" size={20} color="#FF6347" />
							<Text style={tw`ml-2`}>Airfield: Krasnaya Polyana</Text>
						</View>

						<View style={tw`flex-row items-start mt-4`}>
							<View style={tw`items-center mr-3`}>
								<View style={tw`w-3 h-3 rounded-full bg-orange-500 mb-1`} />
								<View style={tw`w-0.5 h-12 bg-gray-300`} />
								<View style={tw`w-3 h-3 rounded-full bg-orange-500`} />
							</View>

							<View style={tw`flex-1`}>
								<Text style={tw`mb-10`}>Novosibirsk</Text>
								<Text>Baikal</Text>
							</View>
						</View>
					</View>
				</View>

				{/* Jet information */}
				<View style={tw`px-4 py-2 border-t border-gray-200`}>
					<Text style={tw`text-base font-medium mb-1`}>Jet information</Text>
					<View style={tw`bg-gray-100 p-3 rounded-lg`}>
						<Text>in good condition</Text>
					</View>
				</View>

				{/* Pilot information */}
				<View style={tw`px-4 py-4 border-t border-gray-200`}>
					<Text style={tw`text-base font-medium mb-3`}>Pilot information</Text>
					<View style={tw`flex-row items-center mb-3`}>
						<Image
							source={require("../assets/pilot-avatar.jpg")}
							style={tw`w-12 h-12 rounded-full`}
							defaultSource={require("../assets/default-avatar.jpg")}
						/>
						<View style={tw`ml-3`}>
							<Text style={tw`font-medium`}>Oleg Samsonov</Text>
							<View style={tw`flex-row`}>
								{[1, 2, 3, 4, 5].map((star) => (
									<AntDesign key={star} name="star" size={14} color="#FFD700" />
								))}
								<Text style={tw`ml-1`}>5</Text>
							</View>
						</View>
					</View>

					<View style={tw`flex-row mb-2`}>
						<View style={tw`bg-gray-100 p-2 rounded-lg mr-2 flex-1`}>
							<Text style={tw`text-gray-500 text-xs`}>Airplane</Text>
							<Text>Cessna 172</Text>
						</View>
						<View style={tw`bg-gray-100 p-2 rounded-lg flex-1`}>
							<Text style={tw`text-gray-500 text-xs`}>Hours flown</Text>
							<Text>1 250 hours</Text>
						</View>
					</View>

					<View style={tw`bg-gray-100 p-2 rounded-lg`}>
						<Text style={tw`text-gray-500 text-xs`}>License</Text>
						<Text>Commercial Pilot's License - CPL</Text>
					</View>
				</View>

				{/* Customer reviews */}
				<View style={tw`px-4 py-4 border-t border-gray-200 mb-20`}>
					<Text style={tw`text-base font-medium mb-3`}>Customer reviews</Text>

					<View style={tw`mb-4`}>
						<View style={tw`flex-row items-center mb-1`}>
							<Image
								source={require("../assets/avatar-ivan.jpg")}
								style={tw`w-8 h-8 rounded-full mr-2`}
								defaultSource={require("../assets/default-avatar.jpg")}
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

					<View>
						<View style={tw`flex-row items-center mb-1`}>
							<Image
								source={require("../assets/avatar-alexander.jpg")}
								style={tw`w-8 h-8 rounded-full mr-2`}
								defaultSource={require("../assets/default-avatar.jpg")}
							/>
							<Text style={tw`font-medium`}>Alexander</Text>
						</View>
					</View>

					<TouchableOpacity
						style={tw`border border-gray-300 rounded-lg py-3 items-center mt-4`}
					>
						<Text style={tw`text-gray-700`}>All reviews</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default JetDetailScreen;
