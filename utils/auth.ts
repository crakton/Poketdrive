import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../lib/api";

export const loginUser = async (email: string, password: string) => {
	const response = await api.post("/auth/login", { email, password });
	const { tokens, user, message } = response.data;

	await AsyncStorage.multiSet([
		["token", tokens.access.token],
		["user", JSON.stringify(user)],
		["isAuthenticated", "true"],
		["isFirstTime", "false"],
	]);

	return { user, message };
};

export const loadAuthState = async () => {
	const token = await AsyncStorage.getItem("token");
	const user = await AsyncStorage.getItem("user");
	const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
	const isFirstTime = await AsyncStorage.getItem("isFirstTime");

	return {
		token,
		user: user ? JSON.parse(user) : null,
		isAuthenticated: isAuthenticated === "true",
		isFirstTime: isFirstTime === "true",
	};
};

export const logoutUser = async () => {
	await AsyncStorage.multiRemove([
		"token",
		"user",
		"isAuthenticated",
		"isFirstTime",
	]);
};
