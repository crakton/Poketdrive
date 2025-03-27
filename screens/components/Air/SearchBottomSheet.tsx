import React, { useRef, useImperativeHandle, forwardRef, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import TourScreen from "../../Air/TourScreen";
import { useAirContext } from "../../../hooks/air/useAirContext";
import { ScrollView } from "react-native-gesture-handler";

const SearchBottomSheet = forwardRef((props, ref) => {
	// Reference to the actual bottom sheet
	const bottomSheetRef = useRef<BottomSheet>(null);
	const { tourSearchQueries, setTourSearchQueries } = useAirContext();
	const memorizedHistories = useMemo(
		() => tourSearchQueries?.history,
		[tourSearchQueries?.history]
	);
	const memorizedRecentSearches = useMemo(
		() => tourSearchQueries?.recentSearches,
		[tourSearchQueries?.recentSearches]
	);
	const memorizedCurrentSearch = useMemo(
		() => tourSearchQueries?.currentSearch,
		[tourSearchQueries?.currentSearch]
	);

	// Snap points for the bottom sheet (from bottom of the screen)
	const snapPoints = ["50%", "90%"];

	const methods = useMemo(
		() => ({
			expand: () => {
				bottomSheetRef.current?.expand();
			},
			collapse: () => {
				bottomSheetRef.current?.collapse();
			},
			close: () => {
				bottomSheetRef.current?.close();
			},
		}),
		[bottomSheetRef.current]
	);

	// Expose methods to parent component
	useImperativeHandle(ref, () => methods);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={snapPoints}
			enablePanDownToClose={true}
			handleIndicatorStyle={tw`bg-gray-400 w-16`}
		>
			<BottomSheetView style={tw`flex-1 p-4`}>
				<Text style={tw`text-xl font-bold mb-4`}>Search</Text>

				<View
					style={tw`flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-4`}
				>
					<Ionicons name="search" size={20} color="#999" style={tw`mr-2`} />
					<TextInput
						value={memorizedCurrentSearch}
						onChangeText={(text) =>
							setTourSearchQueries((prev) =>
								prev
									? { ...prev, currentSearch: text.trim() }
									: {
											currentSearch: text.trim(),
											history: [],
											recentSearches: [],
									  }
							)
						}
						placeholder={memorizedCurrentSearch ?? "Search for tours"}
						style={tw`flex-1`}
						placeholderTextColor="#999"
						autoFocus={true}
					/>
				</View>

				{memorizedRecentSearches && (
					<Text style={tw`font-medium mb-2`}>Recent searches</Text>
				)}

				{/* Recent search items */}
				{memorizedRecentSearches !== undefined &&
				memorizedRecentSearches.length > 0
					? memorizedRecentSearches.map((item, index) => (
							<TouchableOpacity
								key={index}
								style={tw`flex-row items-center py-3 border-b border-gray-200`}
							>
								<Ionicons
									name="time-outline"
									size={20}
									color="#999"
									style={tw`mr-3`}
								/>
								<Text>{item}</Text>
								<TouchableOpacity style={tw`ml-auto`}>
									<Ionicons name="close" size={20} color="#999" />
								</TouchableOpacity>
							</TouchableOpacity>
					  ))
					: null}

				{memorizedHistories && (
					<Text style={tw`font-medium mt-6 mb-2`}>Popular destinations</Text>
				)}

				{/* Popular destinations */}
				{memorizedHistories !== undefined && memorizedHistories.length > 0
					? memorizedHistories.map((item, index) => (
							<TouchableOpacity
								key={index}
								style={tw`flex-row items-center py-3 border-b border-gray-200`}
							>
								<Ionicons
									name="location-outline"
									size={20}
									color="#FF5722"
									style={tw`mr-3`}
								/>
								<Text>{item}</Text>
							</TouchableOpacity>
					  ))
					: null}
				<ScrollView>
					<TourScreen />
				</ScrollView>
			</BottomSheetView>
		</BottomSheet>
	);
});

export default SearchBottomSheet;
