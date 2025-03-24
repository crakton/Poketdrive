import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	TextInput,
	ScrollView,
	Image,
} from "react-native";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAirContext } from "../../hooks/air/useAirContext";
import { RootStackParamList } from "../../types";

const PassengerDetailsScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { passengerDetails, setPassengerDetails } = useAirContext();

	const handleInputChange = useCallback(
		(field: string, value: string) => {
			setPassengerDetails({
				...passengerDetails!,
				[field]: value,
			});
		},
		[passengerDetails]
	);

	const handleBook = useCallback(() => {
		// Navigate to ticket confirmation screen
		navigation.navigate("TicketConfirmation");
	}, []);

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar barStyle="dark-content" />
			<ScrollView contentContainerStyle={tw`flex-grow`}>
				<View style={tw`flex-1 p-4`}>
					<View style={tw`items-center mb-6`}>
						<View
							style={tw`w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-2`}
						>
							<Image
								source={{ uri: "https://via.placeholder.com/200" }}
								style={tw`w-full h-full`}
							/>
						</View>
						<Text style={tw`text-lg font-medium`}>Hello Traveler</Text>
					</View>

					<View style={tw`mb-4`}>
						<TextInput
							style={tw`border border-gray-300 rounded-md p-4 mb-4`}
							placeholder="Enter your Name"
							value={passengerDetails!.name}
							onChangeText={(text) => handleInputChange("name", text)}
						/>

						<TextInput
							style={tw`border border-gray-300 rounded-md p-4 mb-4`}
							placeholder="Enter your address"
							value={passengerDetails!.address}
							onChangeText={(text) => handleInputChange("address", text)}
						/>

						<TextInput
							style={tw`border border-gray-300 rounded-md p-4 mb-4`}
							placeholder="Enter your passport number"
							value={passengerDetails!.passport}
							onChangeText={(text) => handleInputChange("passport", text)}
						/>

						<TextInput
							style={tw`border border-gray-300 rounded-md p-4 mb-4`}
							placeholder="DOB"
							value={passengerDetails!.dob}
							onChangeText={(text) => handleInputChange("dob", text)}
						/>

						<TextInput
							style={tw`border border-gray-300 rounded-md p-4 mb-4`}
							placeholder="Country"
							value={passengerDetails!.country}
							onChangeText={(text) => handleInputChange("country", text)}
						/>
					</View>

					<View style={tw`flex-1`}></View>

					<TouchableOpacity
						style={tw`bg-orange-500 rounded-md py-4 items-center mt-4`}
						onPress={handleBook}
					>
						<Text style={tw`text-white font-medium text-lg`}>BOOK</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PassengerDetailsScreen;
