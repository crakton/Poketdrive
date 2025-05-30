import React, { useState } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	Alert,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { Icon, Text } from "@rneui/base";
import { AuthStackParamList } from "../../nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSearchRide } from "../../hooks/reactQuery/useTrips";
import ContinueButton from "../ui/ContinueButton";
import {
	useGoogleAutocomplete,
	GoogleLocationResult,
} from "@appandflow/react-native-google-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../../utils/constant";
import tw from "twrnc";
import * as Location from "expo-location";
import AutocompleteInput from "@components/ui/AutocompleteInput";

// Validation schema
const TripFormSchema = Yup.object().shape({
	fromwhere: Yup.string().required("From where is required"),
	towhere: Yup.string().required("To where is required"),
});

const TripForm = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList, "TripForm">>();

	const { data, mutate } = useSearchRide();
	const [loading, setLoading] = useState(false);
	const [activeInput, setActiveInput] = useState<string | null>(null);
	const [userLocation, setUserLocation] = useState<{
		lat: number;
		lng: number;
	} | null>(null);

	// Get user's current location
	React.useEffect(() => {
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

	// Create separate autocomplete instances
	const fromLocation = useGoogleAutocomplete(GOOGLE_MAPS_APIKEY, {
		...getAutocompleteConfig(),
	});

	const toLocation = useGoogleAutocomplete(GOOGLE_MAPS_APIKEY, {
		...getAutocompleteConfig(),
	});

	const handleLocationSelect = async (
		result: GoogleLocationResult,
		type: "from" | "to",
		setFieldValue: (field: string, value: any) => void
	) => {
		try {
			// Clear other autocomplete results to prevent interference
			if (type === "from") {
				toLocation.clearSearch();
			} else {
				fromLocation.clearSearch();
			}

			const details = await (type === "from"
				? fromLocation
				: toLocation
			).searchDetails(result.place_id);

			// Use the full formatted address for better location identification
			const fullAddress =
				result.structured_formatting.main_text || result.description;

			if (type === "from") {
				setFieldValue("fromwhere", fullAddress);
				setFieldValue("fromDetails", details);
				fromLocation.setTerm(fullAddress);
				fromLocation.clearSearch();
			} else {
				setFieldValue("towhere", fullAddress);
				setFieldValue("toDetails", details);
				toLocation.setTerm(fullAddress);
				toLocation.clearSearch();
			}
			setActiveInput(null);
		} catch (error) {
			console.error("Error getting location details:", error);
			// Fallback to just use the description
			if (type === "from") {
				setFieldValue("fromwhere", result.description);
				fromLocation.clearSearch();
			} else {
				setFieldValue("towhere", result.description);
				toLocation.clearSearch();
			}
			setActiveInput(null);
		}
	};

	const handleSubmit = (values: any) => {
		setLoading(true);
		mutate(
			{
				origin: values.fromwhere,
				destination: values.towhere,
			},
			{
				onSuccess: (data) => {
					setLoading(false);
					navigation.navigate("RideSelection", { data });
				},
				onError: (error) => {
					setLoading(false);
					Alert.alert("Error", "Failed to search ride");
				},
			}
		);
	};

	return (
		<Formik
			initialValues={{
				fromwhere: "",
				towhere: "",
				fromDetails: null,
				toDetails: null,
			}}
			validationSchema={TripFormSchema}
			onSubmit={handleSubmit}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldValue,
			}) => (
				<View style={tw`flex justify-between h-full pb-40`}>
					<View>
						{/* From Location */}
						<View style={tw`py-4`}>
							<View style={tw`mb-4`}>
								<Text style={tw`text-sm font-semibold mb-1`}>
									Start Location
								</Text>
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
										value={values.fromwhere}
										onChangeText={(text) => {
											// Clear other searches to prevent interference
											toLocation.clearSearch();
											fromLocation.setTerm(text);
											setFieldValue("fromwhere", text);
										}}
										results={fromLocation.locationResults}
										onSelect={(result) =>
											handleLocationSelect(result, "from", setFieldValue)
										}
										isActive={activeInput === "from"}
										onFocus={() => {
											setActiveInput("from");
											// Clear other searches when focusing
											toLocation.clearSearch();
										}}
										onBlur={() => setActiveInput(null)}
										error={
											touched.fromwhere
												? (errors.fromwhere as string)
												: undefined
										}
									/>
								</View>
							</View>

							{/* To Location */}
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
										value={values.towhere}
										onChangeText={(text) => {
											// Clear other searches to prevent interference
											fromLocation.clearSearch();
											toLocation.setTerm(text);
											setFieldValue("towhere", text);
										}}
										results={toLocation.locationResults}
										onSelect={(result) =>
											handleLocationSelect(result, "to", setFieldValue)
										}
										isActive={activeInput === "to"}
										onFocus={() => {
											setActiveInput("to");
											// Clear other searches when focusing
											fromLocation.clearSearch();
										}}
										onBlur={() => setActiveInput(null)}
										error={
											touched.towhere ? (errors.towhere as string) : undefined
										}
									/>
								</View>
							</View>
						</View>
					</View>
					<ContinueButton
						text={"Search"}
						onPress={() => handleSubmit()}
						disabled={false}
						loading={loading}
					/>
				</View>
			)}
		</Formik>
	);
};

export default TripForm;
