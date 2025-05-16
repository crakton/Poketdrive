import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Text as RNText, // Rename to avoid conflict with @rneui/base
	LogBox,
} from "react-native";
import { CheckBox, Icon, Text } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";
import tw from "twrnc";
import { GOOGLE_MAPS_APIKEY } from "../../utils/constant";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

LogBox.ignoreLogs([
	"VirtualizedLists should never be nested",
	"Encountered two children with the same key",
]);

interface ScheduleFormValues {
	fromwhere: string;
	towhere: string;
	stops: string[];
}

interface RideScheduleFormProps {
	setFormData: (data: any) => void;
	formData: any;
	handleNext: () => void;
}

const validationSchema = yup.object().shape({
	fromwhere: yup.string().required("Start Location is required"),
	towhere: yup.string().required("Destination is required"),
});

// Safe getter function to avoid undefined errors
const safeGet = (obj: any, path: string, defaultValue: any = null) => {
	try {
		const keys = path.split(".");
		let current = obj;

		for (const key of keys) {
			if (current === undefined || current === null) {
				return defaultValue;
			}
			current = current[key];
		}

		return current === undefined || current === null ? defaultValue : current;
	} catch (e) {
		console.error(`Error accessing path: ${path}`, e);
		return defaultValue;
	}
};

const RideScheduleForm: React.FC<RideScheduleFormProps> = (props) => {
	console.log("RideScheduleForm rendering with props:", JSON.stringify(props));

	// Create local copies to avoid direct access to potentially undefined properties
	const setFormData = props.setFormData || (() => {});
	const formData = props.formData || {};
	const handleNext = props.handleNext || (() => {});

	// Safe initialization
	const [stopEnabled, setStopEnabled] = useState(false);

	// Log formData for debugging
	useEffect(() => {
		console.log("Current formData:", JSON.stringify(formData));
		console.log("formData.stops:", formData.stops);

		// Safe initialization of stopEnabled based on formData
		const hasStops = Array.isArray(formData.stops) && formData.stops.length > 0;
		console.log("hasStops:", hasStops);
		setStopEnabled(hasStops);
	}, [formData]);

	// Safe initialization of initialValues
	const initialValues = useMemo(() => {
		console.log("Initializing form values");

		const stops = Array.isArray(formData.stops) ? [...formData.stops] : [];
		console.log("initialValues.stops:", stops);

		return {
			fromwhere: safeGet(formData, "origin", ""),
			towhere: safeGet(formData, "destination", ""),
			stops: stops.length > 0 ? stops : [""],
		};
	}, [formData]);

	const handleSearch = useCallback(
		(values: any) => {
			console.log("handleSearch with values:", JSON.stringify(values));

			try {
				// Safe data preparation
				const origin = values.fromwhere || "";
				const destination = values.towhere || "";
				const stops = Array.isArray(values.stops)
					? values.stops.filter((stop: any) => !!stop)
					: [];

				console.log("Prepared data:", { origin, destination, stops });

				// Safe update to formData
				const updatedFormData = {
					...formData,
					origin,
					destination,
					stops,
				};

				console.log("Updating formData:", JSON.stringify(updatedFormData));

				setFormData(updatedFormData);
				handleNext();
			} catch (error) {
				console.error("Error in handleSearch:", error);
				// Handle error (could show alert if needed)
			}
		},
		[formData, handleNext, setFormData]
	);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSearch}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{({ values, handleSubmit, setFieldValue, errors, touched }) => {
				console.log("Formik rendering with values:", JSON.stringify(values));

				// Ensure stops is always an array
				if (!Array.isArray(values.stops)) {
					console.log("Resetting stops to empty array");
					setFieldValue("stops", []);
				}

				return (
					<View style={tw`flex gap-2`}>
						<RNText style={tw`text-black text-sm`}>
							Debug: StopEnabled: {stopEnabled ? "true" : "false"}
						</RNText>

						{/* Start Location */}
						<View>
							<Text style={[tw`text-[14px]`, styles.label]}>
								Start Location
							</Text>
							<View style={styles.inputContainer}>
								<Icon
									name="location"
									type="ionicon"
									color="red"
									size={20}
									style={styles.icon}
								/>
								<View style={styles.autocompleteContainer}>
									<GooglePlacesAutocomplete
										placeholder="From where?"
										fetchDetails={true}
										onPress={(data, details = null) => {
											console.log("Start location selected:", data.description);
											setFieldValue("fromwhere", data.description);
										}}
										query={{
											key: GOOGLE_MAPS_APIKEY,
											language: "en",
										}}
										onFail={(error) => console.error(error)}
										requestUrl={{
											url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
											useOnPlatform: "web",
										}}
										styles={{
											textInput: styles.autocompleteInput,
											container: styles.autocompleteInnerContainer,
											listView: styles.listView,
										}}
										enablePoweredByContainer={false}
										nearbyPlacesAPI="GooglePlacesSearch"
									/>
								</View>
							</View>
							{touched.fromwhere && errors.fromwhere && (
								<Text style={styles.error}>{errors.fromwhere as string}</Text>
							)}
						</View>

						{/* Destination */}
						<View>
							<Text style={[tw`text-[14px]`, styles.label]}>Destination</Text>
							<View style={styles.inputContainer}>
								<Icon
									name="location"
									type="ionicon"
									color="green"
									size={20}
									style={styles.icon}
								/>
								<View style={styles.autocompleteContainer}>
									<GooglePlacesAutocomplete
										placeholder="To where?"
										fetchDetails={true}
										onPress={(data, details = null) => {
											console.log("Destination selected:", data.description);
											setFieldValue("towhere", data.description);
										}}
										query={{
											key: GOOGLE_MAPS_APIKEY,
											language: "en",
										}}
										styles={{
											textInput: styles.autocompleteInput,
											container: styles.autocompleteInnerContainer,
											listView: styles.listView,
										}}
										enablePoweredByContainer={false}
										nearbyPlacesAPI="GooglePlacesSearch"
									/>
								</View>
							</View>
							{touched.towhere && errors.towhere && (
								<Text style={styles.error}>{errors.towhere as string}</Text>
							)}
						</View>

						{/* Stops Checkbox */}
						<View style={tw`flex gap-1`}>
							<Text style={[tw`text-[14px]`, styles.label]}>Stops?</Text>
							<View style={styles.checkboxOuterContainer}>
								<View style={styles.checkboxContainer}>
									<CheckBox
										checkedColor="green"
										uncheckedColor="black"
										size={20}
										checked={stopEnabled}
										onPress={() => {
											const newStopEnabled = !stopEnabled;
											console.log("Toggling stopEnabled to:", newStopEnabled);
											setStopEnabled(newStopEnabled);

											if (newStopEnabled) {
												console.log("Setting stops to ['']");
												setFieldValue("stops", [""]);
											} else {
												console.log("Setting stops to []");
												setFieldValue("stops", []);
											}
										}}
										checkedIcon="dot-circle-o"
										uncheckedIcon="circle-o"
									/>
								</View>
								<Text style={styles.checkboxLabel}>
									Add a stop to get more bookings
								</Text>
							</View>
						</View>

						{/* Stops list */}
						{stopEnabled && (
							<View>
								{Array.isArray(values.stops) &&
									values.stops.map((stop, index) => (
										<View style={styles.inputContainer} key={`stop-${index}`}>
											<TouchableOpacity
												onPress={() => {
													console.log("Removing stop at index:", index);
													if (Array.isArray(values.stops)) {
														const newStops = values.stops.filter(
															(_, i) => i !== index
														);
														console.log("New stops after removal:", newStops);
														setFieldValue(
															"stops",
															newStops.length > 0 ? newStops : [""]
														);
													}
												}}
											>
												<Icon
													name="remove-circle-outline"
													type="ionicon"
													color="red"
													size={24}
													style={styles.icon}
												/>
											</TouchableOpacity>

											<View style={styles.autocompleteContainer}>
												<GooglePlacesAutocomplete
													placeholder="Enter a stop"
													fetchDetails={true}
													onPress={(data, details = null) => {
														console.log(
															`Stop ${index} selected:`,
															data.description
														);
														if (Array.isArray(values.stops)) {
															const newStops = [...values.stops];
															newStops[index] = data.description;
															console.log("Updated stops array:", newStops);
															setFieldValue("stops", newStops);
														}
													}}
													query={{
														key: GOOGLE_MAPS_APIKEY,
														language: "en",
													}}
													onFail={(error) => console.error(error)}
													requestUrl={{
														url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
														useOnPlatform: "web",
													}}
													styles={{
														textInput: styles.autocompleteInput,
														container: styles.autocompleteInnerContainer,
														listView: styles.listView,
													}}
													enablePoweredByContainer={false}
													nearbyPlacesAPI="GooglePlacesSearch"
													keyboardShouldPersistTaps="handled"
												/>
											</View>
										</View>
									))}

								<TouchableOpacity
									onPress={() => {
										console.log("Adding new stop");
										if (Array.isArray(values.stops)) {
											const newStops = [...values.stops, ""];
											console.log("New stops array after adding:", newStops);
											setFieldValue("stops", newStops);
										} else {
											console.log("stops is not an array, setting to ['']");
											setFieldValue("stops", [""]);
										}
									}}
									style={tw`flex flex-row items-center py-2`}
								>
									<Icon
										name="add-circle-outline"
										type="ionicon"
										color="green"
										size={24}
										style={styles.addIcon}
									/>
									<Text style={tw`text-green-600 ml-2`}>Add another stop</Text>
								</TouchableOpacity>
							</View>
						)}

						{/* Submit Button */}
						<TouchableOpacity
							onPress={() => {
								console.log("Next button pressed");
								handleSubmit();
							}}
							style={tw`rounded bg-[#404040] w-full rounded-lg p-3 mt-[90%]`}
						>
							<Text style={tw`text-center text-white text-[20px] font-bold`}>
								Next
							</Text>
						</TouchableOpacity>
					</View>
				);
			}}
		</Formik>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		marginBottom: 20,
		borderRadius: 5,
		paddingHorizontal: 10,
		alignItems: "center",
	},
	icon: {
		marginRight: 10,
	},
	addIcon: {
		marginRight: 5,
	},
	error: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
	},
	label: {
		fontFamily: "Poppins-SemiBold",
		marginBottom: 5,
	},
	checkboxOuterContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	checkboxContainer: {
		borderRadius: 1000,
		overflow: "hidden",
	},
	checkboxLabel: {
		fontFamily: "Poppins-Light",
		fontSize: 12,
		marginLeft: 7,
	},
	autocompleteContainer: {
		flex: 1,
		zIndex: 1,
	},
	autocompleteInnerContainer: {
		flex: 1,
	},
	autocompleteInput: {
		height: 45,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: "#F5F5F5",
		fontFamily: "Poppins-Regular",
		fontSize: 14,
	},
	listView: {
		borderWidth: 1,
		borderColor: "#DDD",
		backgroundColor: "#FFF",
		marginTop: 5,
		borderRadius: 5,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		zIndex: 9999,
	},
});

export default RideScheduleForm;
