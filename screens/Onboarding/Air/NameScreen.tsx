import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { FC, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../../types";
import tw from "twrnc";

const NameScreen: FC = () => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={tw`flex-1 bg-white`}
		>
			<ScrollView contentContainerStyle={tw`flex-1 px-5 pt-20`}>
				<View>
					<Text
						style={[
							tw`text-2xl text-[#2c3e50]`,
							{ fontFamily: "Poppins-Regular" },
						]}
					>
						Enter <Text style={tw`text-[#ff6347]`}>first &</Text>
					</Text>
					<Text
						style={[
							tw`text-2xl text-[#ff6347]`,
							{ fontFamily: "Poppins-Regular" },
						]}
					>
						last name
					</Text>
				</View>

				<View style={tw`mt-5`}>
					<TextInput
						style={[
							tw`border border-[#ff6347] rounded-lg p-3 my-3`,
							{ fontFamily: "Poppins-Regular" },
						]}
						placeholder="First name"
						value={firstName}
						onChangeText={setFirstName}
					/>
					<TextInput
						style={[
							tw`border border-[#e0e0e0] rounded-lg p-3 my-3`,
							{ fontFamily: "Poppins-Regular" },
						]}
						placeholder="Фамилия"
						value={lastName}
						onChangeText={setLastName}
					/>
				</View>

				<View style={tw`flex-1 justify-end pb-10`}>
					<TouchableOpacity
						onPress={() => navigate("ConfirmationCodeScreen")}
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
		</KeyboardAvoidingView>
	);
};

export default NameScreen;
