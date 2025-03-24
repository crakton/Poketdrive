import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../types";
import tw from "twrnc";

const DateOfBirthScreen: FC = () => {
	const [month, setMonth] = useState<string>("July");
	const [day, setDay] = useState<string>("08");
	const [year, setYear] = useState<string>("1997");
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	const months = ["June", "July", "August"];
	const days = ["07", "08", "09"];
	const years = ["1996", "1997", "1998"];

	return (
		<View style={tw`flex-1 bg-white px-5 pt-20`}>
			<View>
				<Text
					style={[
						tw`text-2xl text-[#2c3e50]`,
						{ fontFamily: "Poppins-Regular" },
					]}
				>
					Select your
				</Text>
				<Text
					style={[
						tw`text-2xl text-[#ff6347]`,
						{ fontFamily: "Poppins-Regular" },
					]}
				>
					date of birth
				</Text>
			</View>

			<View style={tw`flex-1 justify-center`}>
				<View style={tw`flex-row justify-between`}>
					{/* Month Picker */}
					<View style={tw`flex-1 items-center`}>
						{months.map((m, index) => (
							<TouchableOpacity
								key={index}
								style={[
									tw`py-3 px-4 my-1 w-full items-center`,
									month === m ? tw`bg-gray-100` : null,
									month === m ? tw`rounded-lg` : null,
								]}
								onPress={() => setMonth(m)}
							>
								<Text
									style={[
										tw`text-base`,
										month === m ? tw`text-[#ff6347]` : tw`text-gray-400`,
										{ fontFamily: "Poppins-Regular" },
									]}
								>
									{m}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Day Picker */}
					<View style={tw`flex-1 items-center`}>
						{days.map((d, index) => (
							<TouchableOpacity
								key={index}
								style={[
									tw`py-3 px-4 my-1 w-full items-center`,
									day === d ? tw`bg-gray-100` : null,
									day === d ? tw`rounded-lg` : null,
								]}
								onPress={() => setDay(d)}
							>
								<Text
									style={[
										tw`text-base`,
										day === d ? tw`text-[#ff6347]` : tw`text-gray-400`,
										{ fontFamily: "Poppins-Regular" },
									]}
								>
									{d}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Year Picker */}
					<View style={tw`flex-1 items-center`}>
						{years.map((y, index) => (
							<TouchableOpacity
								key={index}
								style={[
									tw`py-3 px-4 my-1 w-full items-center`,
									year === y ? tw`bg-gray-100` : null,
									year === y ? tw`rounded-lg` : null,
								]}
								onPress={() => setYear(y)}
							>
								<Text
									style={[
										tw`text-base`,
										year === y ? tw`text-[#ff6347]` : tw`text-gray-400`,
										{ fontFamily: "Poppins-Regular" },
									]}
								>
									{y}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</View>

			<View style={tw`pb-10`}>
				<TouchableOpacity
					onPress={() => navigate("Dashboard")} // Update to your app's home screen
					style={[tw`bg-[#ff6347] p-4 rounded-lg w-full items-center`]}
				>
					<Text
						style={[tw`text-white text-lg`, { fontFamily: "Poppins-Regular" }]}
					>
						Next
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default DateOfBirthScreen;
