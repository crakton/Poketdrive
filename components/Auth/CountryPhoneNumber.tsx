import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import { RequestOTP } from "../../lib/api/functions/register";
import ContinueButton from "../ui/ContinueButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const PhoneNumberInput = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList, "Login">>();

	const [email, setEmail] = useState("");

	const { mutateAsync, status } = useMutation({
		mutationFn: (payload: any) => RequestOTP(payload),
		onSuccess: (data) => {
			Toast.show({ type: "success", text1: "OTP sent successfully" });
			navigation.replace("Verification");
		},
		onError: () => {
			Toast.show({ type: "error", text1: "Something went wrong" });
		},
	});

	const handleSignUp = async () => {
		// Basic validation
		if (!email) {
			Toast.show({ type: "error", text1: "Email is required" });
			return;
		}
		const payload = { email };
		await AsyncStorage.setItem("email", email);

		// Call the mutation function to request OTP
		await mutateAsync(payload);
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={[tailwind`mb-2`, { fontFamily: "Poppins-Regular" }]}>
					Email
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Your email address"
					value={email}
					autoCapitalize="none"
					onChangeText={setEmail}
				/>
			</View>
			<ContinueButton
				text="Verify"
				onPress={handleSignUp}
				disabled={!email}
				loading={status === "pending"}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	inputContainer: {
		marginBottom: 20,
	},
	input: {
		height: 50,
		borderRadius: 5,
		backgroundColor: "#F2F2F2",
		paddingHorizontal: 10,
		fontFamily: "Poppins-Regular",
	},
	button: {
		marginTop: 20,
		padding: 15,
		backgroundColor: "#F25B3E",
		borderRadius: 5,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default PhoneNumberInput;
