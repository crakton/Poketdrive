import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = axios.create({
  baseURL: "http://142.93.40.82:3033/api/v1/",
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
      // console.log(status, data, 'status')
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
