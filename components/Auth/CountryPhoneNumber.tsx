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
import CustomButton from "../ui/CustomButton";
import { login } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { RootStackParamList } from "../../types";

const PhoneNumberInput = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.auth);

	// const { mutateAsync, status } = useMutation({
	// 	mutationFn: (payload: any) => RequestOTP(payload),
	// 	onSuccess: (data) => {
	// 		Toast.show({ type: "success", text1: "OTP sent successfully" });
	// 		navigation.replace("Verification");
	// 	},
	// 	onError: () => {
	// 		Toast.show({ type: "error", text1: "Something went wrong" });
	// 	},
	// });

	const handleSignUp = async () => {
		// Basic validation
		if (!email) {
			Toast.show({ type: "error", text1: "Email is required" });
			return;
		}

		try {
			// Dispatch action to request OTP
			dispatch(login({ email, password })).unwrap();
			Toast.show({ type: "success", text1: "Logged in successfully" });
			navigation.replace("Onboarding");
		} catch (error) {
			const e = error as Error;
			Toast.show({
				type: "error",
				text1: e.message || "Something went wrong",
			});
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={[tailwind`mb-2`, { fontFamily: "Poppins-Regular" }]}>
					Email
				</Text>
				<TextInput
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.input}
					placeholder="Your email address"
					value={email}
					onChangeText={setEmail}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={[tailwind`mb-2`, { fontFamily: "Poppins-Regular" }]}>
					Password
				</Text>
				<TextInput
					keyboardType="default"
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry
					style={styles.input}
					placeholder="Your password"
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<CustomButton
				text="Verify"
				onPress={handleSignUp}
				disabled={!email || !password}
				loading={isLoading}
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
