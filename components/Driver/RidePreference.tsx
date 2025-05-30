import React from "react";
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Dimensions,
	FlatList,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { Formik } from "formik";
import * as Yup from "yup";
import { setRidePreferences } from "@redux/features/rideScheduleSlice";

const validationSchema = Yup.object().shape({
	luggageSize: Yup.string().required("Luggage preference is required"),
	seatingType: Yup.string().required("Back row seating preference is required"),
});

const RidePreference: React.FC<{ onNext: () => void }> = ({ onNext }) => {
	const windowHeight = Dimensions.get("window").height;
	const ridePreferences = useAppSelector(
		(state) => state.rideSchedule.ridePreferences
	);
	const dispatch = useAppDispatch();

	const carSeatSvg = `
    <svg width="20" height="20" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6594 2.716C12.9614 4.297 12.2984 7.588 11.0714 10.593C8.96643 15.749 8.96043 15.754 5.06743 15.232C0.517429 14.622 -0.98557 16.119 0.62743 19.658C1.54643 21.674 2.41343 22 6.86543 22C11.2464 22 12.1974 21.657 13.0944 19.75C14.8934 15.926 16.2004 9.718 16.2514 4.75C16.2944 0.59 16.0424 0 14.2204 0C12.4964 0 12.2294 0.465 12.6594 2.716Z" fill="#565656"/>
    </svg>
  `;

	const handleSubmit = (values: typeof ridePreferences) => {
		dispatch(setRidePreferences(values));
		onNext();
	};

	return (
		<View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
			<ScrollView>
				<Formik
					validationSchema={validationSchema}
					initialValues={ridePreferences}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{({ setFieldValue, values, errors, touched, handleSubmit }) => (
						<View>
							<ImageBackground
								source={require("../../assets/urideCar.png")}
								style={[styles.backgroundImage, { height: windowHeight / 4 }]}
							>
								{/* Overlay text or components */}
							</ImageBackground>

							<View style={tw`flex my-5 items-start`}>
								<Text style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}>
									Preference
								</Text>
								<Text
									style={[
										tw`text-[14px] pt-2`,
										{ fontFamily: "Poppins-Light" },
									]}
								>
									This informs passengers of how much space you have for luggage
									and extras before they book
								</Text>
							</View>

							<View style={tw`flex`}>
								<Text
									style={[
										tw`text-[16px] pb-2`,
										{ fontFamily: "Poppins-SemiBold" },
									]}
								>
									Luggage
								</Text>
								<View style={tw`w-[100%] flex`}>
									<FlatList
										data={["None", "small", "medium", "large"]}
										keyExtractor={(item, index) => index.toString()}
										horizontal
										renderItem={({ item }) => {
											const isSelected = values.luggageSize === item;
											return (
												<TouchableOpacity
													onPress={() => setFieldValue("luggageSize", item)}
													style={[
														tw`flex flex-row mx-1 items-center justify-center gap-5 rounded-lg border px-6 py-2`,
														isSelected
															? tw`bg-[#F25B3E] border-[#F25B3E]`
															: tw`bg-[#FFFFFF] border-[#D9D9D9]`,
													]}
												>
													<Icon name="briefcase" type="ionicon" color="black" />
													<Text style={tw`text-center`}>{item}</Text>
												</TouchableOpacity>
											);
										}}
									/>
								</View>
								{touched.luggageSize && errors.luggageSize ? (
									<Text style={tw`text-red-500 text-xs mt-1`}>
										{errors.luggageSize}
									</Text>
								) : null}
							</View>

							<View style={tw`flex py-5`}>
								<Text
									style={[tw`text-[16px] pb-2`, { fontFamily: "Poppins-Bold" }]}
								>
									Back row Seating
								</Text>
								<View style={tw`flex flex-row items-center justify-center`}>
									<TouchableOpacity
										style={[
											tw`flex flex-row ml-11 items-center justify-center px-6 rounded p-2`,
											values.seatingType === "2-max"
												? tw`bg-[#F25B3E]`
												: tw`bg-[#FFFFFF]`,
										]}
										onPress={() => setFieldValue("seatingType", "2-max")}
									>
										<Text
											style={[
												tw`text-[14px] pt-2`,
												{ fontFamily: "Poppins-Regular" },
												values.seatingType === "2-max"
													? tw`text-[#333333]`
													: tw`text-[#999999]`,
											]}
										>
											Max (Two)
										</Text>
										<SvgXml xml={carSeatSvg} />
										<SvgXml xml={carSeatSvg} />
									</TouchableOpacity>

									<View style={styles.verticalLine} />

									<TouchableOpacity
										style={[
											tw`flex flex-row mr-11 items-center justify-center rounded p-2`,
											values.seatingType === "3-max"
												? tw`bg-[#F25B3E]`
												: tw`bg-[#FFFFFF]`,
										]}
										onPress={() => setFieldValue("seatingType", "3-max")}
									>
										<Text
											style={[
												tw`text-[14px] pt-2`,
												{ fontFamily: "Poppins-Regular" },
												values.seatingType === "3-max"
													? tw`text-[#333333]`
													: tw`text-[#999999]`,
											]}
										>
											Max (Three)
										</Text>
										<SvgXml xml={carSeatSvg} />
										<SvgXml xml={carSeatSvg} />
										<SvgXml xml={carSeatSvg} />
									</TouchableOpacity>
								</View>
								{touched.seatingType && errors.seatingType ? (
									<Text style={tw`text-red-500 text-xs mt-1`}>
										{errors.seatingType}
									</Text>
								) : null}
							</View>

							<TouchableOpacity
								onPress={() => handleSubmit()}
								style={[tw`rounded-[1rem] bg-[#333333] p-3 my-2`]}
							>
								<Text
									style={[
										tw`text-center text-xl text-white`,
										{ fontFamily: "Poppins-Bold" },
									]}
								>
									Next
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</Formik>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		resizeMode: "cover",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	verticalLine: {
		width: 1.5,
		backgroundColor: "#D9D9D9",
		marginHorizontal: 11.3,
		height: 20,
	},
});

export default RidePreference;
