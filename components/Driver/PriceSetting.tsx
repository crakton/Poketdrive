import React from "react";
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import tw from "twrnc";
import * as Yup from "yup";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setPrice } from "@redux/features/rideScheduleSlice";
import Loader from "@components/loader/Loader";

const validationSchema = Yup.object().shape({
	price: Yup.number()
		.required("Price is required")
		.min(1, "Price must be greater than 0"),
});

const PriceSetting: React.FC<{ onNext: () => void; isSubmitting: boolean }> = ({
	onNext,
	isSubmitting,
}) => {
	const { price } = useAppSelector((state) => state.rideSchedule);
	const dispatch = useAppDispatch();
	const handleSubmit = React.useCallback(
		(values: { price: string | number }) => {
			const numericPrice =
				typeof values.price === "string"
					? parseFloat(values.price)
					: values.price;

			dispatch(setPrice(numericPrice));
			onNext();
		},
		[dispatch, onNext]
	);
	return (
		<View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
			<ScrollView>
				<Formik
					initialValues={{ price }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ handleSubmit, errors, setFieldValue, touched, values }) => (
						<View style={tw``}>
							<View>
								<Text
									style={[tw`text-[16px]`, { fontFamily: "Poppins-SemiBold" }]}
								>
									Pricing
								</Text>
								<Text
									style={[
										tw`text-[14px] pt-2`,
										{ fontFamily: "Poppins-Light" },
									]}
								>
									Set a price that each seat would pay to cover your fuel and
									other expenses{" "}
								</Text>
								<Text
									style={[tw`text-[14px]`, { fontFamily: "Poppins-SemiBold" }]}
								>
									Prices are in naira
								</Text>
							</View>

							<View style={tw`flex mt-5 justify-center`}>
								<View>
									<Text
										style={[
											tw`text-[14px]`,
											{ fontFamily: "Poppins-SemiBold" },
										]}
									>
										Enter a price in naira
									</Text>
									<View
										style={tw`flex flex-row items-center border rounded-lg my-5 px-2 justify-center w-[13rem]`}
									>
										<TextInput
											style={styles.input}
											placeholder="Enter a Price"
											keyboardType="numeric"
											onChangeText={(text) => {
												const numericValue = text.replace(/[^0-9.]/g, "");
												setFieldValue("price", numericValue);
												dispatch(setPrice(Number(numericValue)));
											}}
											value={values.price.toString()}
											onBlur={() => {
												// Format the number when leaving the field
												if (values.price) {
													setFieldValue("price", values.price);
													dispatch(setPrice(values.price));
												}
											}}
										/>
										<TouchableOpacity>
											<Text style={[tw``, { fontFamily: "Poppins-Bold" }]}>
												Naira
											</Text>
										</TouchableOpacity>
									</View>
									{touched.price && errors.price && (
										<Text style={tw`text-red-500 text-xs mt-1`}>
											{errors.price}
										</Text>
									)}
								</View>
							</View>

							<TouchableOpacity
								style={tw`rounded-[1rem] bg-[#404040] p-3 mt-[19rem] mx-5`}
								onPress={() => handleSubmit()}
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<Loader />
								) : (
									<Text
										style={{
											...tw`text-center text-xl text-white`,
											fontFamily: "Poppins-Bold",
										}}
									>
										Post a trip
									</Text>
								)}
							</TouchableOpacity>
						</View>
					)}
				</Formik>
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
