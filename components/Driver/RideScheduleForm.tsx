import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { CheckBox, Icon, Text } from "@rneui/base";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import tw from "twrnc";
import { GOOGLE_MAPS_APIKEY } from "../../utils/constant";
import {
	useGoogleAutocomplete,
	GoogleLocationResult,
} from "@appandflow/react-native-google-autocomplete";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AutocompleteInput from "@components/ui/AutocompleteInput";
import * as Location from "expo-location";
import { setLocationData } from "@redux/features/rideScheduleSlice";

const validationSchema = yup.object().shape({
	from: yup.string().required("Start Location is required"),
	to: yup.string().required("Destination is required"),
});

interface Stop {
	id: string;
	address: string;
	details?: any;
}

const RideScheduleForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
	const { locationData } = useAppSelector((state) => state.rideSchedule);
	const [stopEnabled, setStopEnabled] = useState(false);
	const [stops, setStops] = useState<Stop[]>([]);
	const [activeInput, setActiveInput] = useState<string | null>(null);
	const [userLocation, setUserLocation] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const dispatch = useAppDispatch();

	// Initialize stops from locationData and set stopEnabled if there are existing stops
	useEffect(() => {
		if (locationData.stops && locationData.stops.length > 0) {
			const initialStops: Stop[] = locationData.stops.map((address, index) => ({
				id: `stop-${index}`,
				address: address,
			}));
			setStops(initialStops);
			setStopEnabled(true);
		}
	}, []);

	// Get user's current location
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setUserLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
		})();
	}, []);

	// Common autocomplete config with Nigeria restriction and location biasing
	const getAutocompleteConfig = () => ({
		language: "en",
		debounce: 300, // Increased debounce for better performance
		minLength: 3, // Increased minimum length
		components: "country:ng", // Restrict to Nigeria
		// For even more comprehensive results
		types: "establishment|geocode|lodging|food|gas_station|hospital|school",
		location: userLocation
			? `${userLocation.lat},${userLocation.lng}`
			: undefined,
		radius: userLocation ? "50000" : undefined, // 50km radius around user
		strictbounds: false, // Allow results outside the radius but prefer those inside
		fields: "place_id,formatted_address,name,geometry,types,address_components", // Request comprehensive data
		sessiontoken: true, // Use session tokens for better API usage
	});

	// Create separate autocomplete instances with unique keys
	const startLocation = useGoogleAutocomplete(GOOGLE_MAPS_APIKEY, {
		...getAutocompleteConfig(),
	});

	const destination = useGoogleAutocomplete(GOOGLE_MAPS_APIKEY, {
		...getAutocompleteConfig(),
	});

	const stopAutocomplete = useGoogleAutocomplete(GOOGLE_MAPS_APIKEY, {
		...getAutocompleteConfig(),
	});

	const handleSearch = React.useCallback(
		(values: FormikValues) => {
			const formData = {
				from: values.from,
				to: values.to,
				stops: stops
					.filter((stop) => stop.address.trim() !== "")
					.map((stop) => stop.address),
			};

			console.log("Form Data:", formData);
			dispatch(setLocationData(formData));
			onNext();
		},
		[stops]
	);

	const handleLocationSelect = async (
		result: GoogleLocationResult,
		type: "from" | "to" | "stop",
		setFieldValue: (field: string, value: any) => void,
		stopIndex?: number
	) => {
		try {
			// Clear other autocomplete results to prevent interference
			if (type === "from") {
				destination.clearSearch();
				stopAutocomplete.clearSearch();
			} else if (type === "to") {
				startLocation.clearSearch();
				stopAutocomplete.clearSearch();
			} else if (type === "stop") {
				startLocation.clearSearch();
				destination.clearSearch();
			}

			const details = await (type === "from"
				? startLocation
				: type === "to"
				? destination
				: stopAutocomplete
			).searchDetails(result.place_id);

			// Use the full formatted address for better location identification
			const fullAddress =
				result.structured_formatting.main_text || result.description;

			if (type === "from") {
				setFieldValue("from", fullAddress);
				setFieldValue("fromDetails", details);
				dispatch(setLocationData({ ...locationData, from: fullAddress }));
				startLocation.setTerm(fullAddress);
				startLocation.clearSearch();
			} else if (type === "to") {
				setFieldValue("to", fullAddress);
				setFieldValue("toDetails", details);
				dispatch(setLocationData({ ...locationData, to: fullAddress }));
				destination.setTerm(fullAddress);
				destination.clearSearch();
			} else if (type === "stop" && stopIndex !== undefined) {
				const updatedStops = [...stops];
				updatedStops[stopIndex] = {
					...updatedStops[stopIndex],
					address: fullAddress,
					details: details,
				};
				setStops(updatedStops);
				dispatch(
					setLocationData({
						...locationData,
						stops: updatedStops.map((stop) => stop.address),
					})
				);
				stopAutocomplete.setTerm(fullAddress);
				stopAutocomplete.clearSearch();
			}
			setActiveInput(null);
		} catch (error) {
			console.error("Error getting location details:", error);
		}
	};

	const addStop = () => {
		const newStop: Stop = {
			id: Date.now().toString(),
			address: "",
		};
		const updatedStops = [...stops, newStop];
		setStops(updatedStops);
		// Update Redux store
		dispatch(
			setLocationData({
				...locationData,
				stops: updatedStops.map((stop) => stop.address),
			})
		);
	};

	const removeStop = (index: number) => {
		const updatedStops = stops.filter((_, i) => i !== index);
		setStops(updatedStops);
		// Update Redux store
		dispatch(
			setLocationData({
				...locationData,
				stops: updatedStops.map((stop) => stop.address),
			})
		);
	};

	return (
		// <SafeAreaView style={tw`flex-1 bg-white p-4`}>
		<Formik
			initialValues={{
				from: locationData.from,
				to: locationData.to,
				stops: stops.map((stop) => stop.address), // Initialize with current stops
				fromDetails: null,
				toDetails: null,
			}}
			onSubmit={handleSearch}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{({ values, handleSubmit, setFieldValue, errors, touched }) => (
				<View>
					<View style={tw`py-4`}>
						{/* Start Location */}
						<View style={tw`mb-4`}>
							<Text style={tw`text-sm font-semibold mb-1`}>Start Location</Text>
							<View style={tw`flex-row items-start`}>
								<Icon
									name="location"
									type="ionicon"
									color="red"
									size={20}
									style={tw`mr-2 mt-3`}
								/>
								<AutocompleteInput
									placeholder="From where?"
									value={locationData.from}
									onChangeText={(text) => {
										// Clear other searches to prevent interference
										destination.clearSearch();
										stopAutocomplete.clearSearch();

										startLocation.setTerm(text);
										setFieldValue("from", text);
										dispatch(
											setLocationData({
												...locationData,
												from: text,
											})
										);
									}}
									results={startLocation.locationResults}
									onSelect={(result) =>
										handleLocationSelect(result, "from", setFieldValue)
									}
									isActive={activeInput === "from"}
									onFocus={() => {
										setActiveInput("from");
										// Clear other searches when focusing
										destination.clearSearch();
										stopAutocomplete.clearSearch();
									}}
									onBlur={() => setActiveInput(null)}
									error={touched.from ? (errors.from as string) : undefined}
								/>
							</View>
						</View>

						{/* Destination */}
						<View style={tw`mb-4`}>
							<Text style={tw`text-sm font-semibold mb-1`}>Destination</Text>
							<View style={tw`flex-row items-start`}>
								<Icon
									name="location"
									type="ionicon"
									color="green"
									size={20}
									style={tw`mr-2 mt-3`}
								/>
								<AutocompleteInput
									placeholder="To where?"
									value={locationData.to}
									onChangeText={(text) => {
										// Clear other searches to prevent interference
										startLocation.clearSearch();
										stopAutocomplete.clearSearch();

										destination.setTerm(text);
										setFieldValue("to", text);
										dispatch(
											setLocationData({
												...locationData,
												to: text,
											})
										);
									}}
									results={destination.locationResults}
									onSelect={(result) =>
										handleLocationSelect(result, "to", setFieldValue)
									}
									isActive={activeInput === "to"}
									onFocus={() => {
										setActiveInput("to");
										// Clear other searches when focusing
										startLocation.clearSearch();
										stopAutocomplete.clearSearch();
									}}
									onBlur={() => setActiveInput(null)}
									error={touched.to ? (errors.to as string) : undefined}
								/>
							</View>
						</View>

						{/* Stops Checkbox */}
						<View style={tw`mb-4`}>
							<Text style={tw`text-sm font-semibold mb-1`}>Stops?</Text>
							<View style={tw`flex-row items-center`}>
								<View style={tw`rounded-full overflow-hidden`}>
									<CheckBox
										checkedColor="green"
										uncheckedColor="black"
										size={20}
										checked={stopEnabled}
										onPress={() => {
											const newStopEnabled = !stopEnabled;
											setStopEnabled(newStopEnabled);
											if (newStopEnabled && stops.length === 0) {
												addStop();
											} else if (!newStopEnabled) {
												// Clear all stops when unchecked
												setStops([]);
												dispatch(
													setLocationData({
														...locationData,
														stops: [],
													})
												);
											}
										}}
										checkedIcon="dot-circle-o"
										uncheckedIcon="circle-o"
									/>
								</View>
								<Text style={tw`text-xs text-gray-600 ml-1`}>
									Add a stop to get more bookings
								</Text>
							</View>
						</View>

						{/* Stops list */}
						{stopEnabled && (
							<View style={tw`mb-4`}>
								{stops.map((stop, index) => (
									<View key={stop.id} style={tw`flex-row items-start mb-3`}>
										<TouchableOpacity onPress={() => removeStop(index)}>
											<Icon
												name="remove-circle-outline"
												type="ionicon"
												color="red"
												size={24}
												style={tw`mr-2 mt-2`}
											/>
										</TouchableOpacity>
										<AutocompleteInput
											placeholder="Enter a stop"
											value={stop.address}
											onChangeText={(text) => {
												// Clear other searches to prevent interference
												startLocation.clearSearch();
												destination.clearSearch();

												stopAutocomplete.setTerm(text);
												const updatedStops = [...stops];
												updatedStops[index] = {
													...updatedStops[index],
													address: text,
												};
												setStops(updatedStops);
												dispatch(
													setLocationData({
														...locationData,
														stops: updatedStops.map((stop) => stop.address),
													})
												);
											}}
											results={stopAutocomplete.locationResults}
											onSelect={(result) =>
												handleLocationSelect(
													result,
													"stop",
													setFieldValue,
													index
												)
											}
											isActive={activeInput === `stop-${index}`}
											onFocus={() => {
												setActiveInput(`stop-${index}`);
												// Clear other searches when focusing
												startLocation.clearSearch();
												destination.clearSearch();
											}}
											onBlur={() => setActiveInput(null)}
										/>
									</View>
								))}

								<TouchableOpacity
									onPress={addStop}
									style={tw`flex-row items-center py-2`}
								>
									<Icon
										name="add-circle-outline"
										type="ionicon"
										color="green"
										size={24}
										style={tw`mr-1`}
									/>
									<Text style={tw`text-green-600 ml-1`}>Add another stop</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>

					{/* Submit Button */}
					<TouchableOpacity
						onPress={() => handleSubmit()}
						style={tw`bg-[#404040] w-full rounded-lg p-3`}
					>
						<Text style={tw`text-center text-white text-lg font-bold`}>
							Next
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</Formik>
		// </SafeAreaView>
	);
};

export default RideScheduleForm;
