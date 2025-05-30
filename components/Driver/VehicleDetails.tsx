import React, { useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	TextInput,
	StatusBar,
	Platform,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik, FormikValues } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { format } from "date-fns";
import { setVehicleDetails } from "@redux/features/rideScheduleSlice";

const validationSchema = yup.object().shape({
	carNumber: yup.string().required("Car number is required"),
	carColor: yup.string().required("Car color is required"),
	carName: yup.string().required("Car name is required"),
	dateTime: yup.date().required("Date and time is required"),
	rideType: yup
		.string()
		.oneOf(["one-time", "recurring"])
		.required("Ride type is required"),
});

const VehicleDetails: React.FC<{ onNext: () => void }> = ({ onNext }) => {
	const { vehicleDetails } = useAppSelector((state) => state.rideSchedule);
	const dispatch = useAppDispatch();
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [dateText, setDateText] = useState("Date");
	const [timeText, setTimeText] = useState("00:00am");
	const handleSubmit = React.useCallback(
		(values: typeof vehicleDetails) => {
			dispatch(
				setVehicleDetails({
					rideType: values.rideType,
					carNumber: values.carNumber,
					carColor: values.carColor,
					carName: values.carName,
					vehicleImage: vehicleDetails.vehicleImage,
					dateTime: date,
				})
			);
			onNext();
		},
		[date, dispatch, vehicleDetails.vehicleImage]
	);
	const onDateChange = React.useCallback(
		(event: any, selectedDate?: Date) => {
			const currentDate = selectedDate || date;
			setShowDatePicker(false);
			setDate(currentDate);
			setDateText(format(currentDate, "MMM dd, yyyy"));

			if (Platform.OS === "android") {
				// On Android, show time picker after date is selected
				setShowTimePicker(true);
			}
		},
		[date]
	);

	const onTimeChange = React.useCallback(
		(event: any, selectedTime?: Date) => {
			const currentTime = selectedTime || date;
			setShowTimePicker(false);

			// Update the time portion of our date
			const updatedDate = new Date(date);
			updatedDate.setHours(currentTime.getHours());
			updatedDate.setMinutes(currentTime.getMinutes());

			setDate(updatedDate);
			setTimeText(format(updatedDate, "hh:mma"));
		},
		[date]
	);

	const showDatepicker = React.useCallback(() => {
		setShowDatePicker(true);
	}, []);

	const showTimepicker = React.useCallback(() => {
		setShowTimePicker(true);
	}, []);

	return (
		<View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
			<StatusBar translucent backgroundColor="transparent" />
			<ScrollView>
				<Formik
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
					initialValues={vehicleDetails}
				>
					{({ errors, setFieldValue, touched, values, handleSubmit }) => (
						<>
							<View style={tw`flex mb-5 items-start`}>
								<Text
									style={[tw`text-[18px]`, { fontFamily: "Poppins-semibold" }]}
								>
									Vehicle Details
								</Text>
							</View>

							<View
								style={tw`flex flex-row items-center justify-center gap-10 pb-5`}
							>
								<View style={tw`border p-1 rounded-md w-[40%] h-25`}>
									<Image
										source={require("../../assets/urideCar.png")}
										style={tw`w-full h-full`}
										resizeMode="cover"
									/>
								</View>
								<View>
									<TouchableOpacity
										style={tw`border p-1 rounded-lg w-[8rem] h-25 items-center justify-center`}
									>
										<Icon
											name="add-outline"
											type="ionicon"
											size={60}
											color="black"
										/>
										<Text style={tw`text-[12px]`}>Add Car Image</Text>
									</TouchableOpacity>
								</View>
							</View>

							<View style={tw`flex flex-row justify-between gap-4`}>
								<View style={tw`w-[47%]`}>
									<Text
										style={[
											tw`text-16px text-center`,
											{ fontFamily: "Poppins-Light" },
										]}
									>
										Car No.
									</Text>
									<TextInput
										style={tw`w-[100%] bg-[#D9D9D9] p-2 rounded-full h-10 text-center`}
										placeholder="ABC 1234"
										onChangeText={(text) => {
											setFieldValue("carNumber", text);
										}}
									/>
									{errors.carNumber && touched.carNumber && (
										<Text style={styles.error}>{errors.carNumber}</Text>
									)}
								</View>
								<View style={tw`w-[47%]`}>
									<Text
										style={[
											tw`text-16px text-center`,
											{ fontFamily: "Poppins-Light" },
										]}
									>
										Car Color
									</Text>
									<TextInput
										style={[
											tw`w-[100%] bg-[#D9D9D9] p-2 rounded-full h-10 text-center`,
											{ fontFamily: "Poppins-Regular" },
										]}
										placeholder="Red"
										onChangeText={(text) => {
											setFieldValue("carColor", text);
										}}
									/>
									{errors.carColor && touched.carColor && (
										<Text style={styles.error}>{errors.carColor}</Text>
									)}
								</View>
							</View>

							<View style={tw`mt-3`}>
								<Text
									style={[
										tw`text-16px text-center`,
										{ fontFamily: "Poppins-Light" },
									]}
								>
									Car Name
								</Text>
								<TextInput
									style={[
										tw`w-[100%] bg-[#D9D9D9] p-2 rounded-full h-10 text-center`,
										{ fontFamily: "Poppins-Regular" },
									]}
									placeholder="Car name"
									onChangeText={(text) => {
										setFieldValue("carName", text);
									}}
								/>
								{errors.carName && touched.carName && (
									<Text style={styles.error}>{errors.carName}</Text>
								)}
							</View>

							<View style={tw`flex pt-5 items-start`}>
								<Text
									style={[
										tw`text-[18px] px-5`,
										{ fontFamily: "Poppins-SemiBold" },
									]}
								>
									Ride Schedule
								</Text>
								<Text
									style={[
										tw`text-[14px] px-5 pt-2`,
										{ fontFamily: "Poppins-Light" },
									]}
								>
									Enter a precise date and time indicating (Morning)am and
									(afternoon)pm
								</Text>
								<View style={tw`flex flex-row px-5 pb-5`}>
									<View style={tw`flex flex-row items-center justify-start`}>
										<Text
											style={[
												tw`text-[14px]`,
												{ fontFamily: "Poppins-SemiBold" },
											]}
										>
											One-Time
										</Text>
										<CheckBox
											checkedColor="green"
											uncheckedColor="black"
											size={30}
											checked={values.rideType === "one-time"}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											onPress={() => {
												setFieldValue(
													"rideType",
													values.rideType === "one-time"
														? "recurring"
														: "one-time"
												);
											}}
										/>
									</View>
									<View style={tw`flex flex-row items-center justify-start`}>
										<Text
											style={[
												tw`text-[14px]`,
												{ fontFamily: "Poppins-SemiBold" },
											]}
										>
											Recurring
										</Text>
										<CheckBox
											checkedColor="green"
											uncheckedColor="black"
											size={30}
											checked={values.rideType === "recurring"}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											onPress={() => {
												setFieldValue(
													"rideType",
													values.rideType === "recurring"
														? "one-time"
														: "recurring"
												);
											}}
										/>
									</View>
								</View>
								{errors.rideType && touched.rideType && (
									<Text style={[styles.error, { paddingHorizontal: 24 }]}>
										{errors.rideType}
									</Text>
								)}
							</View>

							<View style={tw`flex flex-row px-5 my-2 gap-2 items-center`}>
								<TouchableOpacity
									style={tw`w-[50%] bg-[#D9D9D9] p-2 rounded-lg h-20 justify-center items-center`}
									onPress={showDatepicker}
								>
									<Text style={tw`text-center`}>{dateText}</Text>
								</TouchableOpacity>

								<TouchableOpacity onPress={showTimepicker}>
									<Icon name="time" type="ionicon" size={30} color="black" />
								</TouchableOpacity>

								<TouchableOpacity
									style={tw`w-[30%] bg-[#D9D9D9] p-2 rounded-lg h-20 justify-center items-center`}
									onPress={showTimepicker}
								>
									<Text style={tw`text-center`}>{timeText}</Text>
								</TouchableOpacity>
							</View>
							{errors.dateTime && touched.dateTime && (
								<Text style={[styles.error, { paddingHorizontal: 24 }]}>
									{errors.dateTime}
								</Text>
							)}

							{showDatePicker && (
								<DateTimePicker
									value={date}
									mode="date"
									display={Platform.OS === "ios" ? "spinner" : "default"}
									onChange={(event, selectedDate) => {
										onDateChange(event, selectedDate);
										setFieldValue("dateTime", selectedDate || date);
									}}
									minimumDate={new Date()}
								/>
							)}

							{showTimePicker && (
								<DateTimePicker
									value={date}
									mode="time"
									display={Platform.OS === "ios" ? "spinner" : "default"}
									onChange={(event, selectedTime) => {
										onTimeChange(event, selectedTime);
										const updatedDate = selectedTime || date;
										setFieldValue("dateTime", updatedDate);
									}}
									is24Hour={false}
								/>
							)}

							<TouchableOpacity
								onPress={() => handleSubmit()}
								style={tw`rounded bg-[#404040] w-full rounded-lg p-3 mt-10`}
							>
								<Text style={tw`text-center text-white text-[20px] font-bold`}>
									Next
								</Text>
							</TouchableOpacity>
						</>
					)}
				</Formik>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	error: {
		color: "red",
		fontSize: 12,
		fontFamily: "Poppins-Regular",
	},
});

export default VehicleDetails;
