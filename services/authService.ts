import { QueryClient, MutationFunction } from "@tanstack/react-query";
import { baseUrl } from "../utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { User } from "./UserService";

// Define types for auth responses and requests
export interface LoginResponse {
	user: {
		water: {
			ordersTo: [];
			ordersFrom: [];
		};
		role: string;
		rides: [];
		ridesCreated: [];
		coupons: [];
		firstName: string;
		lastName: string;
		email: string;
		id: string;
	};
	tokens: {
		access: {
			token: string;
			expires: string | Date;
		};
		refresh: {
			token: string;
			expires: string | Date;
		};
	};
}

export interface RegisterDTO {
	email: string;
}
export interface LoginDTO {
	email: string;
	password: string;
}

export interface OTPVerificationDTO {
	email: string;
	otp: number;
}

export default class AuthService {
	private queryClient: QueryClient;
	private static TOKEN_KEY = "auth_token";
	private static USER_KEY = "user_data";
	private static IS_FIRST_TIME = "is_first_time";

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient;
	}

	// Method to set auth token in axios defaults and AsyncStorage
	static setAuthToken = async (token: string) => {
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			await AsyncStorage.setItem(AuthService.TOKEN_KEY, token);
		} else {
			delete axios.defaults.headers.common["Authorization"];
			await AsyncStorage.removeItem(AuthService.TOKEN_KEY);
		}
	};

	// Method to get token from AsyncStorage
	static getToken = async (): Promise<string | null> => {
		const token = await AsyncStorage.getItem(AuthService.TOKEN_KEY);
		console.log("Token from storage:", token);

		return token;
	};

	// Method to save user data
	static saveUser = async (userData: any) => {
		await AsyncStorage.setItem(AuthService.USER_KEY, JSON.stringify(userData));
	};

	// Method to get user data
	static getUser = async () => {
		const userData = await AsyncStorage.getItem(AuthService.USER_KEY);
		return userData ? JSON.parse(userData) : null;
	};

	// Method to check if it's user's first time
	static isFirstTime = async (): Promise<boolean> => {
		const value = await AsyncStorage.getItem(AuthService.IS_FIRST_TIME);
		return value === null;
	};

	// Method to set first time flag
	static setFirstTimeFlag = async () => {
		await AsyncStorage.setItem(AuthService.IS_FIRST_TIME, "false");
	};

	// Method to clear auth data
	static logout = async () => {
		await AsyncStorage.removeItem(AuthService.TOKEN_KEY);
		await AsyncStorage.removeItem(AuthService.USER_KEY);
		delete axios.defaults.headers.common["Authorization"];
	};

	// Authentication API methods
	registerUser: MutationFunction<any, RegisterDTO> = async (registerData) => {
		const response = await fetch(`${baseUrl}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registerData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Registration failed");
		}

		return response.json();
	};
	// Login API methods
	loginUser: MutationFunction<any, LoginDTO> = async (payload) => {
		const response = await fetch(`${baseUrl}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Registration failed");
		}
		const responseData = await response.json();
		// Store token in AsyncStorage and set axios default header
		await AuthService.setAuthToken(responseData.tokens.access.token);
		await AuthService.saveUser(responseData.user);
		return responseData;
	};

	requestOTP: MutationFunction<any, { email: string }> = async (data) => {
		const response = await fetch(`${baseUrl}/auth/send-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to send OTP");
		}

		return response.json();
	};

	verifyOTP: MutationFunction<LoginResponse, OTPVerificationDTO> = async (
		data
	) => {
		const response = await fetch(`${baseUrl}/auth/verify-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "OTP verification failed");
		}

		const responseData = await response.json();

		// Store token in AsyncStorage and set axios default header
		if (responseData.token) {
			await AuthService.setAuthToken(responseData.token);
			await AuthService.saveUser(responseData.user);
		}

		return responseData;
	};
}
