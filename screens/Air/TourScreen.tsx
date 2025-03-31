import React, { useCallback, useMemo } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	ScrollView,
	ImageBackground,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { RootStackParamList } from "../../types";
import { useAirContext } from "../../hooks/air/useAirContext";
import { useAppSelector } from "../../redux/store";
import { Airline } from "../../types/airline";
import ContinueButton from "../../components/ui/ContinueButton";

const TourScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [activeTab, setActiveTab] = React.useState("Air tours");
	const { tourSearchQueries, tourPassengers, setTourDetails } = useAirContext();
	const search = useMemo(
		() => tourSearchQueries?.currentSearch,
		[tourSearchQueries?.currentSearch]
	);
	const { airlines } = useAppSelector((state) => state.airlines);

	// mock data for tours
	// const airTours = [
	// 	{
	// 		id: "1",
	// 		name: "Cessna 172 familiarization flight from Kronstadt",
	// 		image: require("../../assets/images/air/cassna.png"),
	// 		rating: 4.7,
	// 		airfield: "Seizo",
	// 		passengers: 4,
	// 		isFavorite: false,
	// 	},
	// 	{
	// 		id: "2",
	// 		name: "Cessna 172 over Kronstadt",
	// 		image: require("../../assets/images/air/cassna.png"),
	// 		rating: 4.9,
	// 		airfield: "Bychye Polye",
	// 		passengers: 1,
	// 		isFavorite: false,
	// 	},
	// ];

	const handleTourPreveiw = useCallback((item: Airline) => {
		// setTourDetails(item);
		navigation.navigate("TourDetails");
	}, []);

	const filteredAirlines = useMemo(() => {
		if (!search) {
			return airlines;
		}
		return airlines.filter((airline) =>
			airline.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [airlines, search]);

	console.log("search", search);
	console.log("filteredAirlines", filteredAirlines);

	const renderAirTour = ({ item }: { item: Airline }) => (
		<View style={tw`bg-gray-50 rounded-lg overflow-hidden mb-4`}>
			<TouchableOpacity onPress={() => handleTourPreveiw(item)} style={tw``}>
				<ImageBackground
					source={{ uri: item.image }}
					style={tw`w-full h-40 flex-col flex justify-between`}
					resizeMode="cover"
				>
					<TouchableOpacity
						style={tw`relative self-end bg-[#e9e9e9] bg-opacity-70 top-3 right-3 p-1 rounded-full`}
					>
						<Ionicons name={"heart"} size={20} color={"white"} />
					</TouchableOpacity>
					<View style={tw`p-3 flex-row gap-2 items-center mb-1`}>
						<View style={tw`bg-gray-50 p-1 flex-row items-center rounded-full`}>
							<Ionicons name="star" size={16} color="#FFD700" />
							{/* <Text style={tw`ml-1`}>{}</Text> */}
						</View>
						<View style={tw`bg-gray-50 p-1 flex-row items-center rounded-full`}>
							<Text style={tw`text-gray-500`}>
								Airfield:{" "}
								{item.name.length > 9
									? item.name.slice(0, 9) + "..."
									: item.name}
							</Text>
						</View>
						<View style={tw`bg-gray-50 p-1 flex-row items-center rounded-full`}>
							<Text style={tw`text-gray-500`}>
								Passengers: {item.fleetSize}
							</Text>
						</View>
					</View>
				</ImageBackground>
				<View style={[tw`p-3`]}>
					<Text style={tw`font-medium text-base`}>{item.name}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView style={tw`flex-1 bg-white my-3`}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{filteredAirlines.map((item) => (
					<View key={item._id}>{renderAirTour({ item })}</View>
				))}

				<ContinueButton text="Find more" onPress={() => {}} disabled={false} />
				<View style={tw`h-20`} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default TourScreen;
