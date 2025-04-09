import React, { useEffect, useState } from "react";
import { View } from "react-native";
import PageLoader from "../ui/PageLoader";
import { loadAuthState } from "../../utils/auth";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const [authReady, setAuthReady] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const authState = await loadAuthState();
				console.log("Loaded Auth:", authState);
			} catch (e) {
				console.error("Auth check failed:", e);
			} finally {
				setLoading(false);
				setAuthReady(true);
			}
		};

		checkAuth();
	}, []);

	if (loading || !authReady) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<PageLoader />
			</View>
		);
	}

	return <>{children}</>;
};

export default AuthCheck;
