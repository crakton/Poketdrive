import React, { useEffect, useState, useRef, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useMutation } from "@tanstack/react-query";
import { VerifytOTP, RequestOTP } from "../../lib/api/functions/register";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useToast } from "react-native-toast-notifications";
import { registerIndieID } from "native-notify";
import axios from "axios";
import ContinueButton from "../ui/ContinueButton";
import Toast from "react-native-toast-message";

const CELL_COUNT = 6;

const CodeVerification = () => {
	const navigation =
		useNavigation<
			NativeStackNavigationProp<AuthStackParamList, "Verification">
		>();

	// const toast = useToast();
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const [value, setValue] = useState("");
	const [isCodeComplete, setIsCodeComplete] = useState(false);
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const [countdown, setCountdown] = useState(60);
	const [isResendDisabled, setIsResendDisabled] = useState(true);

	const renderCell = ({
		index,
		symbol,
		isFocused,
	}: {
		index: number;
		symbol: string;
		isFocused: boolean;
	}) => {
		let textChild = null;
		if (symbol) {
			textChild = symbol;
		} else if (isFocused) {
			textChild = <Cursor />;
		}
		return (
			<Text
				key={index}
				style={[
					styles.cell,
					isFocused && styles.focusCell,
					// value[index] && styles.filledCell,
				]}
				onLayout={getCellOnLayoutHandler(index)}
			>
				{textChild}
			</Text>
		);
	};

	useEffect(() => {
		// Focus the code field when the component mounts
		ref.current?.focus();
	}, []);

	useEffect(() => {
		// Check if the code input is complete
		setIsCodeComplete(value.length === CELL_COUNT);
	}, [value]);

	useEffect(() => {
		if (countdown > 0) {
			timerRef.current = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
		} else {
			setIsResendDisabled(false);
		}
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [countdown]);

	const handleResendCode = useCallback(async () => {
		try {
			const email = await AsyncStorage.getItem("email");
			if (!email) {
				throw new Error("Email not found");
			}
			await RequestOTP({ email });
			setCountdown(60);
			setIsResendDisabled(true);
			Toast.show({ type: "success", text1: "OTP sent successfully" });
		} catch (error: any) {
			Toast.show({ type: "error", text1: "Something went wront" });
			console.log("Error on resend code: ", error);
		}
	}, []);

	const { mutateAsync, status } = useMutation({
		mutationFn: (payload: any) => VerifytOTP(payload),
		onSuccess: async (data) => {
			await AsyncStorage.setItem("userData", JSON.stringify(data));
			await AsyncStorage.setItem("token", data.Bearer_token);

			navigation.replace("Onboarding" as any);
			registerIndieID(`${data.id}`, 22387, "Wl0rlWhlSiad3m2ob0v2aB");
		},
		onError: (error) => {
			Toast.show({ type: "error", text1: "Something went wrong" });
			console.log("Error on otp verification: ", error);
		},
	});

	const handleSubmit = async () => {
		const payload = { otp: value };
		await mutateAsync(payload);
	};

	return (
		<SafeAreaView style={tw`bg-[#FFFFFF] h-full`}>
			<View style={{ flex: 1, alignItems: "center" }}>
				<View style={{ width: "100%", paddingHorizontal: 22 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							marginBottom: 30,
						}}
					>
						<CodeField
							ref={ref}
							{...props}
							value={value}
							onChangeText={setValue}
							cellCount={CELL_COUNT}
							keyboardType="number-pad"
							textContentType="oneTimeCode"
							renderCell={renderCell}
							autoFocus={true}
						/>
					</View>
					<View
						style={[
							tw`flex flex-row justify-center items-center`,
							{ marginTop: 20 },
						]}
					>
						<Text
							style={[
								tw`text-center text-lg`,
								{ fontFamily: "Poppins-Regular" },
							]}
						>
							Didn’t receive code{" "}
						</Text>
						<TouchableOpacity
							onPress={handleResendCode}
							disabled={isResendDisabled}
						>
							<Text
								style={[
									tw`text-center text-lg`,
									{
										fontFamily: "Poppins-Regular",
										color: isResendDisabled ? "#999999" : "#F25B3E",
									},
								]}
							>
								{isResendDisabled ? `Resend in ${countdown}s` : "Resend Code"}
							</Text>
						</TouchableOpacity>
					</View>
					<ContinueButton
						text="Verify"
						onPress={handleSubmit}
						disabled={!isCodeComplete}
						loading={status === "pending"}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default CodeVerification;

const styles = StyleSheet.create({
	root: { padding: 20, minHeight: 300 },
	title: { textAlign: "center", fontSize: 30 },
	fieldRow: {
		marginTop: 20,
		flexDirection: "row",
		marginLeft: 8,
	},

	cell: {
		width: 40,
		height: 40,
		lineHeight: 45,
		fontSize: 22,
		fontFamily: "Poppins-Regular",
		fontWeight: "600",
		textAlign: "center",
		marginHorizontal: 8,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#E0E0E0",
		color: "tomato",
		backgroundColor: "#F8F8F8",
	},
	focusCell: {
		borderColor: "#F25B3E",
	},
	filledCell: {
		backgroundColor: "#F25B3E",
		color: "white",
	},
});
