import React, {
	useRef,
	useImperativeHandle,
	forwardRef,
	useMemo,
	useEffect,
} from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	NativeSyntheticEvent,
	TextInputChangeEventData,
	KeyboardAvoidingView,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import TourScreen from "../../Air/TourScreen";
import { useAirContext } from "../../../hooks/air/useAirContext";
import { ScrollView } from "react-native-gesture-handler";
import { useAirService } from "../../../hooks/air/useAirService";
import { useAppDispatch } from "../../../redux/store";
import { setAirlines } from "../../../redux/features/airlineSlice";
import { TSearchQueries } from "../../../context/air/AirContextProvider";

const SearchBottomSheet = forwardRef((props, ref) => {
	// Reference to the actual bottom sheet
	const bottomSheetRef = useRef<BottomSheet>(null);
	const inputRef = useRef<TextInput>(null);
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
		[]
	);

	// Expose methods to parent component
	useImperativeHandle(ref, () => methods);

	const dispatch = useAppDispatch();

	const { useGetAirlines } = useAirService();

	// Get airlines data
	const { data: airlines, isLoading, error } = useGetAirlines();

	// Update Redux state ONLY when airlines data changes
	useEffect(() => {
		if (airlines) {
			dispatch(setAirlines(airlines));
		}
	}, [airlines, dispatch]);

	// handle error rendering
	const renderError = () => (
		<View style={tw`flex-1 items-center justify-center`}>
			<Text style={tw`text-red-500`}>Error: {error!.message}</Text>
		</View>
	);

	const handleInputChange = (text: string) => {
		setTourSearchQueries(
			(prev) =>
				({
					...prev,
					currentSearch: text,
				} as TSearchQueries)
		);
	};

	const handleSubmitSearch = () => {
		if (memorizedCurrentSearch && memorizedCurrentSearch.trim() !== "") {
			// Add to recent searches
			setTourSearchQueries(
				(prev) =>
					({
						...prev,
						recentSearches: prev?.recentSearches
							? [
									memorizedCurrentSearch,
									...prev.recentSearches
										.filter((item) => item !== memorizedCurrentSearch)
										.slice(0, 4),
							  ]
							: [memorizedCurrentSearch],
					} as TSearchQueries)
			);
		}
	};

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
						ref={inputRef}
						onChangeText={handleInputChange}
						placeholder="Search for tours"
						style={tw`flex-1`}
						placeholderTextColor="#999"
						autoFocus={true}
						onSubmitEditing={handleSubmitSearch}
					/>
				</View>

				{memorizedRecentSearches && memorizedRecentSearches.length > 0 && (
					<>
						<Text style={tw`font-medium mb-2`}>Recent searches</Text>
						{memorizedRecentSearches.map((item, index) => (
							<TouchableOpacity
								key={index}
								style={tw`flex-row items-center py-3 border-b border-gray-200`}
								onPress={() => handleInputChange(item)}
							>
								<Ionicons
									name="time-outline"
									size={20}
									color="#999"
									style={tw`mr-3`}
								/>
								<Text>{item}</Text>
								<TouchableOpacity
									style={tw`ml-auto`}
									onPress={() => {
										setTourSearchQueries(
											(prev) =>
												({
													...prev,
													recentSearches:
														prev?.recentSearches?.filter(
															(_, i) => i !== index
														) || [],
												} as TSearchQueries)
										);
									}}
								>
									<Ionicons name="close" size={20} color="#999" />
								</TouchableOpacity>
							</TouchableOpacity>
						))}
					</>
				)}

				{memorizedHistories && memorizedHistories.length > 0 && (
					<>
						<Text style={tw`font-medium mt-6 mb-2`}>Popular destinations</Text>
						{memorizedHistories.map((item, index) => (
							<TouchableOpacity
								key={index}
								style={tw`flex-row items-center py-3 border-b border-gray-200`}
								onPress={() => handleInputChange(item)}
							>
								<Ionicons
									name="location-outline"
									size={20}
									color="#FF5722"
									style={tw`mr-3`}
								/>
								<Text>{item}</Text>
							</TouchableOpacity>
						))}
					</>
				)}

				<ScrollView>
					{isLoading ? (
						<ActivityIndicator />
					) : error ? (
						renderError()
					) : (
						<TourScreen />
					)}
				</ScrollView>
			</BottomSheetView>
		</BottomSheet>
	);
});

export default SearchBottomSheet;
