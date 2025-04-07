import React from "react";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import registerNNPushToken from "native-notify";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./redux/store";
import QueryClientProvider from "./utils/ReactQueryProvider";

import RootNavigator from "./components/common/RootNavigator";



export default function App() {
	// Register push notifications - moved inside useEffect in a real component
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
				<GestureHandlerRootView style={{ flex: 1 }}>
					<RootNavigator />
					<Toast />
				</GestureHandlerRootView>
			</Provider>
		</QueryClientProvider>
	);
}
