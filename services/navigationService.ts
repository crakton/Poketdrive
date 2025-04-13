import { CommonActions, DrawerActions } from "@react-navigation/native";
import { navigationRef } from "../components/common/RootNavigator";

/**
 * Opens the drawer navigation
 */
export function openDrawer() {
	if (navigationRef.isReady()) {
		navigationRef.current?.dispatch(DrawerActions.openDrawer());
	}
}

/**
 * Closes the drawer navigation
 */
export function closeDrawer() {
	if (navigationRef.isReady()) {
		navigationRef.current?.dispatch(DrawerActions.closeDrawer());
	}
}

/**
 * Toggles the drawer navigation
 */
export function toggleDrawer() {
	if (navigationRef.isReady()) {
		navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
	}
}

/**
 * Navigate to drawer screen first, then toggle it
 * Use this when you're outside the drawer navigator context
 */
export function navigateToDrawerAndToggle() {
	if (navigationRef.isReady()) {
		// First navigate to the drawer
		navigationRef.current?.navigate("LandDrawer");

		// Give it a moment to complete navigation
		setTimeout(() => {
			toggleDrawer();
		}, 100);
	}
}

/**
 * General navigate function
 */
export function navigate(name: string, params?: any) {
	if (navigationRef.isReady()) {
		navigationRef.current?.navigate(name, params);
	}
}

/**
 * Go back function
 */
export function goBack() {
	if (navigationRef.isReady()) {
		navigationRef.current?.goBack();
	}
}
