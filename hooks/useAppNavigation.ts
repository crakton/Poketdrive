import { AppNavigationContext } from "@context/navigation";
import { useContext } from "react";

// Export the navigation reference hook separately
export const useAppNavigation = () => {
	const context = useContext(AppNavigationContext);
	if (context === undefined) {
		throw new Error(
			"useAppNavigation must be used within a NavigationProvider"
		);
	}
	return context;
};
