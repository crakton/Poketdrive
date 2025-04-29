import { navigationRef } from "@components/common/RootNavigator";
import { DrawerActions } from "@react-navigation/native";

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
 * Safe way to navigate to drawer and toggle it
 */
export function navigateToDrawerAndToggle() {
	if (navigationRef.isReady()) {
		// First get the current navigation state
		const state = navigationRef.current?.getState();

		// Try to find the drawer navigator in the state tree
		let isDrawerInState = false;
		state?.routes.forEach((route) => {
			if (route.name === "LandDrawer") {
				isDrawerInState = true;
			}
		});

		if (!isDrawerInState) {
			// If not in drawer state, navigate to it first
			navigationRef.current?.navigate("LandDrawer");

			// Wait for navigation to complete
			setTimeout(() => {
				try {
					navigationRef.current?.dispatch(DrawerActions.openDrawer());
				} catch (e) {
					console.warn("Could not open drawer:", e);
				}
			}, 300);
		} else {
			// If already in drawer state, just toggle
			try {
				navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
			} catch (e) {
				console.warn("Could not toggle drawer:", e);
			}
		}
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
