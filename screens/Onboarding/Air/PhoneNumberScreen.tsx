import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { FC, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Platform,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { RootStackParamList } from "../../../types";
import tw from "twrnc";
import { SafeAreaView } from "react-native";

const PhoneNumberScreen: FC = () => {
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<SafeAreaView style={tw`bg-white`}>
			<ScrollView contentContainerStyle={tw`flex-1 w-full`}>
				<View style={[tw`flex-col w-full pt-20`]}>
					<Text
						style={[
							tw`text-2xl text-[#2c3e50]`,
							{ fontFamily: "Poppins-Bold" },
						]}
					>
						Enter <Text style={tw`text-[#ff6347]`}>phone</Text>
					</Text>
					<Text
						style={[
							tw`text-xl text-[#ff6347]`,
							{ fontFamily: "Poppins-Regular" },
						]}
					>
						number
					</Text>
				</View>

				<View style={tw`mt-5`}>
					<View
						style={[
							tw`flex-row items-center w-full border border-[#ff6347] rounded-lg p-3 my-3`,
						]}
					>
						<View style={tw`flex-row items-center mr-2`}>
							<Text>🇷🇺</Text>
							<Text style={tw`ml-2`}>+7</Text>
						</View>
						<TextInput
							style={[tw`flex-1`, { fontFamily: "Poppins-Regular" }]}
							placeholder="999 896 85 85"
							keyboardType="phone-pad"
							value={phoneNumber}
							onChangeText={setPhoneNumber}
						/>
					</View>
				</View>

				<View style={tw`flex-1 justify-end pb-10`}>
					<TouchableOpacity
						onPress={() => navigate("NameScreen")}
						style={[tw`bg-[#ff6347] p-4 rounded-lg w-full items-center`]}
					>
						<Text
							style={[
								tw`text-white text-lg`,
								{ fontFamily: "Poppins-Regular" },
							]}
						>
							Next
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PhoneNumberScreen;
