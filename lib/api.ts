import axios, { AxiosRequestConfig } from "axios";
import { Toast } from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
  baseURL: "http://142.4.9.152:3033/api/v1/",
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
    let access = await AsyncStorage.getItem('accessToken');

    if (access) {
      config.headers = {
        ...config.headers,
        "X-Api-Key": access ? access : "",
        "uRideAccess": access ? access : "",
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
          Toast.error(
            `Client Error: ${status} - ${
              (data as { message?: string })?.message || "Error, try Again"
            }`,
            'bottom'
          );

          // Redirect to the login route for authentication
          navigateToLogin();
        } else if (status && status >= 400 && status < 500) {
          Toast.error(
            `Client Error: ${status} - ${
              (data as { message?: string })?.message || "Error, try Again"
            }`,
            'bottom'
          );
        } else if (status && status >= 500) {
          Toast.error(
            `Server Error: ${status} - ${
              (data as { message?: string })?.message || "Error, try Again"
            }`,
            'bottom'
          );
        }
      }
    } else {
      Toast.error("An Error Occurred: Please try again later", 'bottom');
    }

    throw error;
  }
};
