import React from "react";

import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import registerNNPushToken from "native-notify";
import { store } from "./store";

import QueryClientProvider from "./utils/ReactQueryProvider";

import DrawerContainer from "./components/Drawer/Index";

export default function App() {
	registerNNPushToken(22387, "Wl0rlWhlSiad3m2ob0v2aB");
	const [fontsLoaded] = useFonts({
		"Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
		"Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
		"Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
		"Poppins-SemiBold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
		"Poppins-ExtraBold": require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
		"Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
		"Poppins-Black": require("./assets/fonts/Poppins/Poppins-Black.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<QueryClientProvider>
			<Provider store={store}>
				<NavigationContainer>
					<DrawerContainer />
				</NavigationContainer>
				<Toast />
			</Provider>
		</QueryClientProvider>
	);
}
