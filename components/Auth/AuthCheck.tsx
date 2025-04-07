import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AuthService from "../../services/authService";
import { loadUser, setFirstTimeUser } from "../../redux/features/authSlice";
import PageLoader from "../ui/PageLoader";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.auth);
	useEffect(() => {
		const checkAuthState = async () => {
			try {
				// Load user authentication state first
				await dispatch(loadUser());

				// Check first time user
				const isFirstTime = await AuthService.isFirstTime();

				// Only set first time flag if it actually is first time
				if (isFirstTime) {
					dispatch(setFirstTimeUser(true));
				} else {
					dispatch(setFirstTimeUser(false));
				}
			} catch (error) {
				console.error("Auth check error:", error);
			}
		};

		checkAuthState();
	}, [dispatch]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<PageLoader />
			</View>
		);
	}

	return <>{children}</>;
};

export default AuthCheck;
