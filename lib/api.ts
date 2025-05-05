import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../utils/constant";
import Toast from "react-native-toast-message";

const client = axios.create({
	baseURL: baseUrl,
	timeout: 10000,
});

// Function to handle navigation
const navigateToLogin = () => {
	// You can replace this with your actual logic for navigation
	// Example: navigation.navigate('Login');
};

// State to track shown errors
const shownErrors = new Set();

export const fetch = async (config: AxiosRequestConfig<any>) => {
	try {
		let userData = (await AsyncStorage.getItem("userData")) as string;
		let access = JSON.parse(userData).Bearer_token;

		if (access) {
			config.headers = {
				...config.headers,
				Authorization: access ? `Bearer ${access}` : "",
			};
		}

		const response = await client(config);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const { status, data } = error.response || {};
			// Generate a unique key for the error message
			const errorKey = `${status}-${data?.message || "Network Error"}`;

			// Check if the error has been shown already
			if (!shownErrors.has(errorKey)) {
				shownErrors.add(errorKey);

				// Show the error toast
				if (status === 401 || status === 403) {
					// Toast.error(
					//   `Client Error: ${status} - ${
					//     (data as { message?: string })?.message || "Error, try Again"
					//   }`,
					//   'bottom'
					// );

					// Redirect to the login route for authentication
					navigateToLogin();
				} else if (status && status >= 400 && status < 500) {
					// Toast.error(
					//   `Client Error: ${status} - ${
					//     (data as { message?: string })?.message || "Error, try Again"
					//   }`,
					//   'bottom'
					// );
				} else if (status && status >= 500) {
					// Toast.error(
					//   `Server Error: ${status} - ${
					//     (data as { message?: string })?.message || "Error, try Again"
					//   }`,
					//   'bottom'
					// );
				}
			}
		} else {
			// Toast.errror("An Error Occurred: Please try again later", 'bottom');
		}
	}
};

// export const fetch = async (config: AxiosRequestConfig<any>) => {
//   try {
//     let userData = (await AsyncStorage.getItem("userData")) as string;
//     let access = JSON.parse(userData).Bearer_token;

//     if (access) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${access}`,
//       };
//     }

//     const response = await client(config);
//     return response.data;
//   } catch (error) {
//     console.error("Error in fetch:", error); // Log the error for debugging
//     throw error; // Ensure to rethrow the error to propagate it further if needed
//   }
// };

// Add request interceptor to handle auth token
client.interceptors.request.use(
	async (config) => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		} catch (error) {
			return Promise.reject(error);
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add response interceptor to handle errors
client.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (axios.isAxiosError(error)) {
			const { status, data } = error.response || {};
			const errorKey = `${status}-${data?.message || "Network Error"}`;

			if (!shownErrors.has(errorKey)) {
				shownErrors.add(errorKey);

				if (status === 401 || status === 403) {
					// Toast.error(`Client Error: ${status} - ${data?.message || "Error, try Again"}`, 'bottom');
					// Redirect to login
				} else if (status && status >= 400 && status < 500) {
					Toast.show({
						type: "error",
						text1: `Client Error: ${status} - ${
							data?.message || "Error, try Again"
						}`,
					});
				} else if (status && status >= 500) {
					Toast.show({
						type: "error",
						text1: `Server Error: ${status} - ${
							data?.message || "Error, try Again"
						}`,
					});
				}
			}
		} else {
			Toast.show({
				type: "error",
				text1: "An Error Occurred: Please try again later",
			});
		}

		return Promise.reject(error);
	}
);

export default client;
