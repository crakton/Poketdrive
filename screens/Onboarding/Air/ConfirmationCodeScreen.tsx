import React, { FC, useRef, useState } from "react";
import {
	TextInput,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";
import tw from "twrnc";

const ConfirmationCodeScreen: FC = () => {
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
	const inputRefs = useRef<(TextInput | null)[]>([]);
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	// Check if the code is complete
	const isCodeComplete = () => {
		return code.every((digit) => digit !== "");
	};

	// Handle input change for code digits
	const handleCodeChange = (text: string, index: number) => {
		if (text.length > 1) {
			text = text[text.length - 1];
		}

		const newCode = [...code];
		newCode[index] = text;
		setCode(newCode);

		// Move to next input if current input is filled
		if (text !== "" && index < code.length - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// Handle backspace for empty inputs to go back
	const handleKeyPress = (e: any, index: number) => {
		if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

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
							{ fontFamily: "Poppins-Bold" },
						]}
					>
						Enter the
					</Text>
					<Text
						style={[
							tw`text-2xl text-[#ff6347]`,
							{ fontFamily: "Poppins-Regular" },
						]}
					>
						confirmation code
					</Text>
				</View>

				<View style={tw`flex-row justify-between mt-8`}>
					{code.map((digit, index) => (
						<TextInput
							key={index}
							ref={(ref) => (inputRefs.current[index] = ref)}
							style={[
								tw`w-12 h-12 border ${
									digit ? "border-[#ff6347]" : "border-[#e0e0e0]"
								} 
                   rounded-lg text-center text-lg mr-2`,
								{ fontFamily: "Poppins-Regular" },
							]}
							keyboardType="number-pad"
							maxLength={1}
							value={digit}
							onChangeText={(text) => handleCodeChange(text, index)}
							onKeyPress={(e) => handleKeyPress(e, index)}
						/>
					))}
				</View>

				<View style={tw`flex-1 justify-end pb-10`}>
					<TouchableOpacity
						onPress={() => navigate("DateOfBirthScreen")}
						disabled={!isCodeComplete()}
						style={[
							tw`p-4 rounded-lg w-full items-center`,
							isCodeComplete() ? tw`bg-[#ff6347]` : tw`bg-[#ff6347] opacity-50`,
						]}
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

export default ConfirmationCodeScreen;
