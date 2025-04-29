import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationProvider, navigationRef } from "@context/navigation";
import NavigationTree from "./NavigationTree";
import { ChatProvider } from "@context/chat";

export const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<NavigationProvider>
			<NavigationContainer
				ref={navigationRef}
				onStateChange={(state) => {
					if (navigationRef.current && state) {
						// This will be handled by the context
						navigationRef.current.getCurrentOptions();
					}
				}}
			>
				<ChatProvider>
					<NavigationTree />
				</ChatProvider>
			</NavigationContainer>
		</NavigationProvider>
	);
};
export default RootNavigator;
