import { useContext, Context } from "react";
import { AirContext } from "../../context/air/AirContextProvider";

export const useAirContext = () => {
	const context = useContext(AirContext);
	if (!context) {
		throw new Error("useAirContext must be used within an AirProvider");
	}
	return context;
};
