import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import {
	NavigationContainerRef,
	NavigationState,
	ParamListBase,
} from "@react-navigation/native";
import {
	createNavigationContainerRef,
	DrawerActions,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../types/user";
// Create a ref for the navigation container
export const navigationRef = createNavigationContainerRef<ParamListBase>();

// Define the interface for our context
interface AppNavigationContextType {
	isAuthenticated: boolean;
	isFirstTime: boolean;
	userData: IUser | null;
	token: string | null;
	isLoading: boolean;
	currentNavigator: string | null;
	// Navigation actions
	navigate: (name: string, params?: any) => void;
	goBack: () => void;
	resetRoot: (routeName: string) => void;
	// Drawer actions
	openDrawer: () => void;
	closeDrawer: () => void;
	toggleDrawer: () => void;
	navigateToDrawer: (screenName?: string) => void;
	// Auth actions
	setAuth: (token: string, user: IUser) => Promise<void>;
	clearAuth: () => Promise<void>;
}

// Create the context with a default value
export const AppNavigationContext = createContext<AppNavigationContextType>({
	isAuthenticated: false,
	isFirstTime: false,
	userData: null,
	token: null,
	isLoading: true,
	currentNavigator: null,
	navigate: () => {},
	goBack: () => {},
	resetRoot: () => {},
	openDrawer: () => {},
	closeDrawer: () => {},
	toggleDrawer: () => {},
	navigateToDrawer: () => {},
	setAuth: async () => {},
	clearAuth: async () => {},
});

// Provider component
export const NavigationProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isFirstTime, setIsFirstTime] = useState<boolean>(false);
	const [userData, setUserData] = useState<IUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [currentNavigator, setCurrentNavigator] = useState<string | null>(null);

	// Load authentication data on mount
	useEffect(() => {
		const loadAuthData = async () => {
			try {
				const storedToken = await AsyncStorage.getItem("token");
				const userDataStr = await AsyncStorage.getItem("userData");
				const firstTime = await AsyncStorage.getItem("firstTime");

				const authenticated = !!storedToken && !!userDataStr;
				setIsAuthenticated(authenticated);
				setIsFirstTime(firstTime === "true");

				if (authenticated && userDataStr) {
					setUserData(JSON.parse(userDataStr));
					setToken(storedToken);
				}
			} catch (error) {
				console.error("Error loading auth data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadAuthData();
	}, []);

	// Track current navigator
	const handleNavigationStateChange = (state: NavigationState | undefined) => {
		if (state) {
			// Determine the current active navigator based on route names
			const currentRoute = state.routes[state.index];
			if (currentRoute.name === "LandDrawer") {
				setCurrentNavigator("drawer");
			} else if (
				currentRoute.name === "AirTabBar" ||
				currentRoute.name === "WaterTabBar"
			) {
				setCurrentNavigator("tab");
			} else {
				setCurrentNavigator("stack");
			}
		}
	};

	// Navigation actions
	const navigate = (name: string, params?: any) => {
		if (navigationRef.isReady()) {
			navigationRef.navigate(name, params);
		} else {
			console.warn("Navigation ref is not ready");
		}
	};

	const goBack = () => {
		if (navigationRef.isReady() && navigationRef.canGoBack()) {
			navigationRef.goBack();
		} else {
			console.warn("Cannot go back");
		}
	};

	const resetRoot = (routeName: string) => {
		if (navigationRef.isReady()) {
			navigationRef.resetRoot({
				index: 0,
				routes: [{ name: routeName }],
			});
		}
	};

	// Drawer actions
	const openDrawer = () => {
		if (navigationRef.isReady()) {
			navigationRef.dispatch(DrawerActions.openDrawer());
		}
	};

	const closeDrawer = () => {
		if (navigationRef.isReady()) {
			navigationRef.dispatch(DrawerActions.closeDrawer());
		}
	};

	const toggleDrawer = () => {
		if (navigationRef.isReady()) {
			navigationRef.dispatch(DrawerActions.toggleDrawer());
		}
	};

	const navigateToDrawer = (screenName?: string) => {
		if (navigationRef.isReady()) {
			// First check if we're already in the drawer
			if (currentNavigator !== "drawer") {
				// Navigate to drawer first
				navigationRef.navigate("LandDrawer");

				// If a specific screen inside drawer is requested, wait for navigation
				// to complete then navigate to that screen
				if (screenName) {
					setTimeout(() => {
						navigationRef.dispatch({
							type: "NAVIGATE",
							payload: {
								name: screenName,
							},
						});
					}, 100);
				}
			} else if (screenName) {
				// Already in drawer, just navigate to the screen
				navigationRef.navigate(screenName);
			}
		}
	};

	// Auth actions
	const setAuth = async (newToken: string, user: IUser) => {
		try {
			await AsyncStorage.setItem("token", newToken);
			await AsyncStorage.setItem("userData", JSON.stringify(user));
			setToken(newToken);
			setUserData(user);
			setIsAuthenticated(true);
		} catch (error) {
			console.error("Error saving auth data:", error);
		}
	};

	const clearAuth = async () => {
		try {
			await AsyncStorage.removeItem("token");
			await AsyncStorage.removeItem("userData");
			setToken(null);
			setUserData(null);
			setIsAuthenticated(false);
			resetRoot("CreateAccount");
		} catch (error) {
			console.error("Error clearing auth data:", error);
		}
	};

	const value = {
		isAuthenticated,
		isFirstTime,
		userData,
		token,
		isLoading,
		currentNavigator,
		navigate,
		goBack,
		resetRoot,
		openDrawer,
		closeDrawer,
		toggleDrawer,
		navigateToDrawer,
		setAuth,
		clearAuth,
	};

	return (
		<AppNavigationContext.Provider value={value}>
			{children}
		</AppNavigationContext.Provider>
	);
};
