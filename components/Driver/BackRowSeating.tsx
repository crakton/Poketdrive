import React from "react";
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import * as Yup from "yup";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setBackRowSeating } from "@redux/features/rideScheduleSlice";

const validationSchema = Yup.object().shape({
	maxPersons: Yup.number().required("Maximum number of persons is required"),
});

const BackRowSeating: React.FC<{ onNext: () => void }> = ({ onNext }) => {
	const { backRowSeating } = useAppSelector((state) => state.rideSchedule);
	const [maxPersons, setMaxPersons] = React.useState(
		backRowSeating.maxPersons || 2
	);
	const [otherPrefs, setOtherPrefs] = React.useState<{
		other: string;
		counts: number;
	}>({ counts: 0, other: "" });

	const dispatch = useAppDispatch();

	const handleSubmit = React.useCallback(
		(values: typeof backRowSeating) => {
			dispatch(
				setBackRowSeating({
					maxPersons: maxPersons,
					otherPreferences: otherPrefs.counts > 0 ? otherPrefs : undefined,
				})
			);
			onNext();
		},
		[dispatch, maxPersons, onNext, otherPrefs]
	);
	const handleAddPerson = React.useCallback(
		(setFieldValue: any) => {
			if (maxPersons < 5) {
				const newMaxPersons = maxPersons + 1;
				setFieldValue("maxPersons", newMaxPersons);
				setMaxPersons(newMaxPersons);
			}
		},
		[maxPersons]
	);
	const handleRemovePerson = React.useCallback(
		(setFieldValue: any) => {
			if (maxPersons > 1) {
				const newMaxPersons = maxPersons - 1;
				setFieldValue("maxPersons", newMaxPersons);
				setMaxPersons(newMaxPersons);
			}
		},
		[maxPersons]
	);

	return (
		<View style={[tw`bg-[#FFFFFF]`, { paddingTop: StatusBar.currentHeight }]}>
			<Formik
				validationSchema={validationSchema}
				initialValues={backRowSeating}
				onSubmit={handleSubmit}
			>
				{({ errors, setFieldValue, handleSubmit, touched }) => (
					<ScrollView>
						<View style={tw``}>
							<View>
								<Text style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}>
									Back row seating
								</Text>
								<Text
									style={[
										tw`text-[14px] pt-2`,
										{ fontFamily: "Poppins-Light" },
									]}
								>
									Pledge to a maximum of 2 people in the back for better reviews
								</Text>
							</View>

							<View style={tw`flex flex-row items-center justify-center`}>
								<View
									style={tw`flex flex-row items-center rounded-lg my-5 py-2 bg-[#F25B3E] justify-center w-[13rem] gap-5 px-5`}
								>
									<TouchableOpacity
										onPress={() => handleRemovePerson(setFieldValue)}
									>
										<Icon
											name="remove-outline"
											type="ionicon"
											size={24}
											color="white"
										/>
									</TouchableOpacity>
									<Text
										style={[
											tw`text-[13px] text-white`,
											{ fontFamily: "Poppins-Bold" },
										]}
									>
										{maxPersons} Person{maxPersons > 1 ? "s" : ""}
									</Text>
									<TouchableOpacity
										onPress={() => handleAddPerson(setFieldValue)}
									>
										<Icon
											name="add-outline"
											type="ionicon"
											size={24}
											color="white"
										/>
									</TouchableOpacity>
								</View>
								{errors.maxPersons && touched.maxPersons && (
									<Text style={tw`text-red-500 text-xs`}>
										{errors.maxPersons}
									</Text>
								)}
							</View>

							<View>
								<Text style={[tw`text-[16px]`, { fontFamily: "Poppins-Bold" }]}>
									Others
								</Text>
								<View
									style={tw`flex flex-row items-center mt-2 justify-start gap-5`}
								>
									{["Pets", "Foods"].map((item) => (
										<TouchableOpacity
											key={item}
											style={tw`border rounded-lg px-2 ${
												item === otherPrefs.other
													? "bg-[#F25B3E] border-[#F25B3E]"
													: "bg-[#FFFFFF] border-[#D9D9D9]"
											}`}
											onPress={() => {
												setOtherPrefs((prev) => ({
													...prev,
													other: item,
												}));
											}}
										>
											<Text
												style={[
													tw`text-[14px] ${
														item === otherPrefs.other
															? "text-white"
															: "text-[#333333]"
													} rounded-lg`,
													{ fontFamily: "Poppins-Light" },
												]}
											>
												{item}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

							<View
								style={tw`flex flex-row items-center mt-10 justify-start gap-2`}
							>
								{["1", "2", "3", "4", "5", "6", "7"].map((number) => (
									<TouchableOpacity
										key={number}
										style={[
											tw`border rounded-xl px-2 ${
												Number(number) === otherPrefs.counts
													? "bg-[#F25B3E] border-[#F25B3E]"
													: "bg-[#FFFFFF] border-[#D9D9D9]"
											}`,
										]}
										onPress={() => {
											setOtherPrefs((prev) => ({
												...prev,
												counts: parseInt(number, 10),
											}));
										}}
									>
										<Text
											style={[
												tw`text-[16px] rounded-xl ${
													Number(number) === otherPrefs.counts
														? "text-white"
														: "text-[#333333]"
												}`,
												{ fontFamily: "Poppins-Regular" },
											]}
										>
											{number}
										</Text>
									</TouchableOpacity>
								))}
							</View>

							<TouchableOpacity
								onPress={() => handleSubmit()}
								style={[tw`rounded-[1rem] bg-[#333333] p-3 mt-[19rem] mx-5`]}
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
					</ScrollView>
				)}
			</Formik>
		</View>
	);
};

export default BackRowSeating;
