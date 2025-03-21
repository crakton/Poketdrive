import React, { useEffect, useMemo, useState } from "react";
import {
	Alert,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Formik } from "formik";
import * as yup from "yup";
import { Schedule, useSchedule } from "../../hooks/reactQuery/useSchedule";
import Loader from "../loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { text } from "stream/consumers";

interface PricingProps {
	setFormData: any;
	formData: any;
	handleNext: any;
}

const PriceSetting: React.FC<PricingProps> = ({
	setFormData,
	formData,
	handleNext,
}) => {
	const navigation = useNavigation();
	const { mutate, isPending } = useSchedule();
	const [userData, setUserData] = useState<any>(null);
	const [loading, setLoading] = useState(false); // Loading state
	const [retryCount, setRetryCount] = useState(0); // Retry counter
	const [retrying, setRetrying] = useState(false); // Retry state

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem("userData");
				if (jsonValue != null) {
					setUserData(JSON.parse(jsonValue));
				}
			} catch (e) {
				console.log("Error fetching user data:", e);
			}
		};

		fetchUserData();
	}, []);

	useEffect(() => {
		if (retrying) {
			Pricing();
		}
	}, [retrying]);

	const validationSchema = yup.object().shape({
		price: yup
			.number()
			.typeError("Price must be a number")
			.required("Price is required"),
	});

	const formatRideSchedulData = useMemo(() => {
		if (formData) {
			const data: Schedule = {
				brs: formData.brs,
				carColor: formData.carColor,
				carName: formData.carName,
				carNumber: formData.carNumber,
				creator: userData!.email!,
				departure_time:
					formData.departure_time.length > 1
						? formData.departure_time[1].date.toString() +
						  " " +
						  formData.departure_time[1].time.toString()
						: formData.departure_time[0].date.toString() +
						  " " +
						  formData.departure_time[0].time.toString(), // backend requires a string therefore, I will convert the the outgoing time if present
				destination: formData.destination,
				luggage_type: formData.luggage_type,
				origin: formData.origin,
				other: formData.other,
				price: formData.price,
				remaining_capacity: formData.total_capacity,
				riders: [],
				stops: formData.stops,
				total_capacity: formData.total_capacity,
				type: formData.type,
			};
			return data;
		}
		return;
	}, [formData]);

	const Pricing = () => {
		setLoading(true); // Start loading
		console.log("data being sent:", formatRideSchedulData);
		mutate(formatRideSchedulData!, {
			onSuccess: (data) => {
				if (data.success) {
					console.log("Success Response:", data);
					setLoading(false); // Stop loading on success
					Toast.show({
						type: "success",
						text1: "Trip added succesfully",
					});
					navigation.reset({
						index: 0,
						routes: [{ name: "ManageTrips" as never }],
					});
				} else {
					console.log("First attempt failed, retrying...");
					setLoading(false); // Stop loading before retry
					setRetryCount((prev) => prev + 1);
					if (retryCount < 1) {
						setRetrying(true); // Trigger retry
					} else {
						console.log("Failed to schedule ride after retry");
						Toast.show({
							type: "error",
							text1: "Failed to schedule ride after retry",
						});
					}
				}
			},
			onError: (error) => {
				console.log("Error Response:", error);
				setLoading(false); // Stop loading before retry
				setRetryCount((prev) => prev + 1);
				if (retryCount < 1) {
					setRetrying(true); // Trigger retry
				} else {
					console.log("Failed to schedule ride after retry");
					Toast.show({
						type: "error",
						text1: "Failed to schedule ride after retry",
					});
				}
			},
		});
	};

	return (
		<View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
			<StatusBar translucent backgroundColor="transparent" />
			<ScrollView>
				{loading || isPending ? (
					<Loader /> // Show loader while mutation is pending
				) : (
					<Formik
						initialValues={{ price: formData.price || "" }}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							setFormData({
								...formData,
								price: Number(values.price),
								creator: userData?.email,
							});
							Pricing();
						}}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
							touched,
						}) => (
							<View style={tw`px-5`}>
								<View>
									<Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
										Pricing
									</Text>
									<Text
										style={[
											tw`text-[16px]  pt-2`,
											{ fontFamily: "Poppins-Light" },
										]}
									>
										Set a price that each seat would pay to cover your fuel and
										other expenses{" "}
									</Text>
									<Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
										Prices are in naira
									</Text>
								</View>

								<View style={tw`flex mt-5 justify-center`}>
									<Text style={[tw`text-lg`, { fontFamily: "Poppins-Bold" }]}>
										Enter a price in naira
									</Text>
									<View
										style={tw`flex flex-row items-center border rounded-lg  my-5 py-2 px-2  justify-center w-[13rem]`}
									>
										<TextInput
											style={styles.input}
											placeholder="Enter a Price"
											keyboardType="numeric"
											value={values.price}
											onChangeText={handleChange("price")}
											onBlur={handleBlur("price")}
										/>
										<TouchableOpacity>
											<Text style={[tw``, { fontFamily: "Poppins-Bold" }]}>
												Naira
											</Text>
										</TouchableOpacity>
									</View>
									{touched.price && typeof errors.price === "string" && (
										<Text style={tw`text-red-500 ml-2`}>{errors.price}</Text>
									)}
								</View>

								<TouchableOpacity
									style={tw`rounded-[1rem] bg-[#404040] p-3 mt-[19rem] mx-5`}
									onPress={() => handleSubmit()}
								>
									<Text
										style={[
											tw`text-center text-xl text-white`,
											{ fontFamily: "Poppins-Bold" },
										]}
									>
										Post a Trip
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
				)}
			</ScrollView>
		</View>
	);
};

export default PriceSetting;

const styles = StyleSheet.create({
	input: {
		flex: 1,
		height: 40,
		paddingHorizontal: 10,
		fontFamily: "Poppins-Regular",
	},
});
