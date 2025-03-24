import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	ScrollView,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { RootStackParamList } from "../../types";

const TourScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [activeTab, setActiveTab] = React.useState("Flights");

	const airTours = [
		{
			id: "1",
			name: "Cessna 172 familiarization flight from Kronstadt",
			image: require("../../assets/images/air/cassna.png"),
			rating: 4.7,
			airfield: "Seizo",
			passengers: 4,
			isFavorite: true,
		},
		{
			id: "2",
			name: "Cessna 172 over Kronstadt",
			image: require("../../assets/images/air/cassna.png"),
			rating: 4.9,
			airfield: "Bychye Polye",
			passengers: 1,
			isFavorite: true,
		},
	];

	const flights = [
		{
			id: "1",
			name: "Novosibirsk - Baikal",
			image: require("../../assets/images/air/cassna.png"),
			rating: 4.9,
			airfield: "Krasnaya Polyana",
			passengers: 4,
			price: 2000,
			currency: "₽",
			isFavorite: true,
		},
		{
			id: "2",
			name: "Novosibirsk - Baikal",
			image: require("../../assets/images/air/cassna.png"),
			rating: 4.9,
			airfield: "Krasnaya Polyana",
			passengers: 4,
			price: 2000,
			currency: "₽",
			isFavorite: true,
		},
	];

	const renderAirTour = ({ item }: { item: (typeof airTours)[0] }) => (
		<View style={tw`bg-gray-100 rounded-lg overflow-hidden mb-4`}>
			<View style={tw`relative`}>
				<Image source={item.image} style={tw`w-full h-40`} resizeMode="cover" />
				<TouchableOpacity
					style={tw`absolute top-2 right-2 bg-white p-1 rounded-full`}
				>
					<Ionicons
						name={item.isFavorite ? "heart" : "heart-outline"}
						size={20}
						color={item.isFavorite ? "#F05A22" : "#666"}
					/>
				</TouchableOpacity>
			</View>
			<View style={tw`p-3`}>
				<View style={tw`flex-row items-center mb-1`}>
					<Ionicons name="star" size={16} color="#FFD700" />
					<Text style={tw`ml-1`}>{item.rating}</Text>
					<Text style={tw`mx-2 text-gray-400`}>•</Text>
					<Text style={tw`text-gray-500`}>Airfield: {item.airfield}</Text>
					<Text style={tw`mx-2 text-gray-400`}>•</Text>
					<Text style={tw`text-gray-500`}>Passengers: {item.passengers}</Text>
				</View>
				<Text style={tw`font-medium text-base`}>{item.name}</Text>
			</View>
		</View>
	);

	const renderFlight = ({ item }: { item: (typeof flights)[0] }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate("FlightDetailsScreen")}
			style={tw`bg-gray-100 rounded-lg overflow-hidden mb-4`}
		>
			<View style={tw`relative`}>
				<Image source={item.image} style={tw`w-full h-40`} resizeMode="cover" />
				<TouchableOpacity
					style={tw`absolute top-2 right-2 bg-white p-1 rounded-full`}
				>
					<Ionicons
						name={item.isFavorite ? "heart" : "heart-outline"}
						size={20}
						color={item.isFavorite ? "#F05A22" : "#666"}
					/>
				</TouchableOpacity>
			</View>
			<View style={tw`p-3`}>
				<View style={tw`flex-row items-center mb-1`}>
					<Ionicons name="star" size={16} color="#FFD700" />
					<Text style={tw`ml-1`}>{item.rating}</Text>
					<Text style={tw`mx-2 text-gray-400`}>•</Text>
					<Text style={tw`text-gray-500`}>Airfield: {item.airfield}</Text>
					<Text style={tw`mx-2 text-gray-400`}>•</Text>
					<Text style={tw`text-gray-500`}>Passengers: {item.passengers}</Text>
				</View>
				<Text style={tw`font-medium text-base`}>{item.name}</Text>
				<View style={tw`flex-row items-center justify-between mt-2`}>
					<Text style={tw`text-gray-500`}>Price per passenger</Text>
					<View style={tw`bg-[#F05A22] px-3 py-1 rounded-full`}>
						<Text style={tw`text-white font-medium`}>
							{item.price} {item.currency}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={tw`flex-1 bg-white my-3`}>
			<View style={tw`p-4`}>
				{/* <Text style={tw`text-2xl font-bold mb-4`}>Favorites</Text> */}

				<View style={tw`flex-row mb-4`}>
					<TouchableOpacity
						style={tw`${
							activeTab === "Air tours" ? "bg-[#F05A22]" : "bg-gray-100"
						} rounded-full px-5 py-2 mr-2`}
						onPress={() => setActiveTab("Air tours")}
					>
						<Text
							style={tw`${
								activeTab === "Air tours" ? "text-white" : "text-gray-800"
							}`}
						>
							Air tours
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={tw`${
							activeTab === "Flights" ? "bg-[#F05A22]" : "bg-gray-100"
						} rounded-full px-5 py-2`}
						onPress={() => setActiveTab("Flights")}
					>
						<Text
							style={tw`${
								activeTab === "Flights" ? "text-white" : "text-gray-800"
							}`}
						>
							Flights
						</Text>
					</TouchableOpacity>
				</View>

				<ScrollView showsVerticalScrollIndicator={false}>
					{activeTab === "Air tours"
						? airTours.map((item) => (
								<View key={item.id}>{renderAirTour({ item })}</View>
						  ))
						: flights.map((item) => (
								<View key={item.id}>{renderFlight({ item })}</View>
						  ))}
					{activeTab === "Air tours" && (
						<TouchableOpacity
							style={tw`bg-[#F05A22] rounded-lg py-3 items-center my-3`}
						>
							<Text
								style={[
									tw`text-white font-medium`,
									{ fontFamily: "Poppins-Bold" },
								]}
							>
								Show more
							</Text>
						</TouchableOpacity>
					)}
					<View style={tw`h-20`} />
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default TourScreen;
