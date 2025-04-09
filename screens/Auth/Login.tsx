import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Alert,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CheckBox, Image } from "@rneui/base";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../../redux/store";
import { loginUser } from "../../utils/auth";
import * as WebBroswer from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { fetch } from "../../lib/api";
import { ResponseType } from "expo-auth-session";
import { AuthStackParamList } from "../../nav";
import CustomButton from "@components/ui/CustomButton";
import { setUser } from "@redux/features/userSlice";
import { RootStackParamList } from "../../types/index";

WebBroswer.maybeCompleteAuthSession();

const LoginScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const [request, response, promptAsync] = useAuthRequest(
		{
			clientId:
				"463687535027-cdhalaasercs9i92aslf424ekdujge8b.apps.googleusercontent.com", // android client id
			redirectUri: "com.omenvc.urride:/oauthredirect",
			responseType: ResponseType.IdToken,
			scopes: ["profile", "email"],
		},
		{
			scheme: "ur-ride",
		}
	);

	useEffect(() => {
		if (response?.type === "success") {
			// For ID token flow, access the id_token
			const { id_token } = response.params;
			console.log("ID token:", id_token);
		}
	}, [response]);

	const handleSignWithGoogle = useCallback(async () => {
		try {
			const google_res = await promptAsync();
			if (google_res.type !== "success") return;

			const res = await fetch({
				method: "POST",
				data: { idToken: google_res.params.id_token },
				url: "/auth/google-signin",
			});
			if (res) {
				// Handle navigate to app entrance
				navigation.reset({
					index: 0,
					routes: [{ name: "Onboarding" }],
				});
			}
		} catch (err) {
			console.log("error faced: ", err);
			Alert.alert("Error", "Failed to sign in with Google");
		}
	}, [promptAsync, navigation]);

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert(
				"Error",
				!email ? "Email is required" : "Password is required"
			);
			return;
		}

		try {
			setIsLoading(true);
			const { user, message } = await loginUser(email, password);

			if (user) {
				dispatch(setUser(user));
				Toast.show({
					type: "success",
					text1: "Welcome back",
					text2: message,
				});
				navigation.reset({
					index: 0,
					routes: [{ name: "Onboarding" }],
				});
			}
		} catch (error: any) {
			Alert.alert("Error", error?.response?.data?.message || "Login failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ScrollView contentContainerStyle={tw`px-4 py-6  bg-white flex-1`}>
			<View style={tw`flex-1 justify-center`}>
				<Text
					style={[tw`text-2xl font-bold mb-6`, { fontFamily: "Poppins-Bold" }]}
				>
					Welcome Back
				</Text>
				<Text
					style={[tw`text-gray-500 mb-8`, { fontFamily: "Poppins-Regular" }]}
				>
					Login to your account to continue
				</Text>

				<View style={styles.inputContainer}>
					<Text style={[tw`mb-2`, { fontFamily: "Poppins-Regular" }]}>
						Email address
					</Text>
					<View style={[tw`bg-slate-500`, styles.passwordInputContainer]}>
						<TextInput
							style={styles.input}
							placeholder="Enter your email"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
						/>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<Text style={[tw`mb-2`, { fontFamily: "Poppins-Regular" }]}>
						Password
					</Text>
					<View style={[tw`bg-slate-500`, styles.passwordInputContainer]}>
						<TextInput
							style={styles.input}
							placeholder="Enter your password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry={!showPassword}
						/>
						<TouchableOpacity
							style={styles.eyeIconContainer}
							onPress={togglePasswordVisibility}
						>
							<Ionicons
								name={showPassword ? "eye-off" : "eye"}
								size={24}
								color="#666"
							/>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity
					style={tw`mb-6 self-end`}
					onPress={() => navigation.navigate("ForgotPassword")}
				>
					<Text style={[tw`text-[#F25B3E]`, { fontFamily: "Poppins-Regular" }]}>
						Forgot Password?
					</Text>
				</TouchableOpacity>

				<CustomButton
					text="Login"
					onPress={handleLogin}
					loading={isLoading}
					disabled={false}
				/>

				<View style={tw`flex flex-row items-center justify-center mt-6`}>
					<Text style={[tw`text-center`, { fontFamily: "Poppins-Regular" }]}>
						Don't have an account?{" "}
						<Text
							style={[tw`text-[#F25B3E]`, { fontFamily: "Poppins-Bold" }]}
							onPress={() => navigation.replace("CreateAccount")}
						>
							Register
						</Text>
					</Text>
				</View>

				<View
					style={tw`flex flex-row items-center py-2 px-10 justify-center mt-4`}
				>
					<View style={tw`flex-1 h-px bg-[#F25B3E] `} />
					<Text
						style={[tw`mx-2 text-gray-500`, { fontFamily: "Poppins-Regular" }]}
					>
						or login with
					</Text>
					<View style={tw`flex-1 h-px bg-[#F25B3E]`} />
				</View>

				<TouchableOpacity
					onPress={handleSignWithGoogle}
					style={tw`flex flex-row items-center justify-center gap-3 py-2 px-10 bg-slate-600 rounded-md mt-4`}
				>
					<Image
						style={tw`w-8 h-8`}
						source={require("../../assets/google.png")}
					/>
					<Text style={[tw`text-white`, { fontFamily: "Poppins-Regular" }]}>
						Sign In with Google
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 20,
	},
	passwordInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F2F2F2",
		borderRadius: 5,
	},
	eyeIconContainer: {
		padding: 10,
	},
	input: {
		height: 50,
		borderRadius: 5,
		backgroundColor: "#F2F2F2",
		paddingHorizontal: 10,
		fontFamily: "Poppins-Regular",
		flex: 1,
	},
	helperText: {
		fontSize: 12,
		color: "#666",
	},
});

export default LoginScreen;
