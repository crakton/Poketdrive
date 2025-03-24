import React, { createContext, FC, useMemo, useState } from "react";

type AirContextProps = {
	children: React.ReactNode;
};

type TFlightDetails = {
	flightNumber: string;
	departureTime: string;
	departureCode: string;
	departureAirport: string;
	arrivalTime: string;
	arrivalCode: string;
	arrivalAirport: string;
	price: string;
};

type TPassengerDetails = {
	name: string;
	address: string;
	passport: string;
	dob: string;
	country: string;
};

export const AirContext = createContext<{
	selectedSeat: string;
	setSelectedSeat: React.Dispatch<React.SetStateAction<string>>;
	flightDetails: TFlightDetails | undefined;
	setFlightDetails: React.Dispatch<
		React.SetStateAction<TFlightDetails | undefined>
	>;
	passengerDetails: TPassengerDetails | undefined;
	setPassengerDetails: React.Dispatch<
		React.SetStateAction<TPassengerDetails | undefined>
	>;
}>({
	selectedSeat: "",
	setSelectedSeat: () => {},
	flightDetails: undefined,
	setFlightDetails: () => {},
	passengerDetails: undefined,
	setPassengerDetails: () => {},
});
const AirContextProvider: FC<AirContextProps> = (props) => {
	const [selectedSeat, setSelectedSeat] = useState<string>("1A");
	const [flightDetails, setFlightDetails] = useState<TFlightDetails>();
	const [passengerDetails, setPassengerDetails] = useState<TPassengerDetails>();

	const value = useMemo(
		() => ({
			selectedSeat,
			setSelectedSeat,
			flightDetails,
			setFlightDetails,
			passengerDetails,
			setPassengerDetails,
		}),
		[]
	);
	return (
		<AirContext.Provider value={value}>{props.children}</AirContext.Provider>
	);
};

export default AirContextProvider;
