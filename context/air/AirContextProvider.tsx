import React, { createContext, FC, useMemo, useState } from "react";
import { IFlight } from "../../types/airline";

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

type TTourDetails = {
	id: string;
	name: string;
	image: any;
	rating: number;
	airfield: string;
	passengers: number;
	isFavorite: boolean;
};

type TPassengerDetails = {
	name: string;
	address: string;
	passport: string;
	dob: string;
	country: string;
};

export type TSearchQueries = {
	currentSearch: string;
	history: never[];
	recentSearches: never[];
};

export const AirContext = createContext<{
	selectedSeat: string;
	setSelectedSeat: React.Dispatch<React.SetStateAction<string>>;
	flightDetails: IFlight | undefined;
	setFlightDetails: React.Dispatch<React.SetStateAction<IFlight | undefined>>;
	tourDetails: TTourDetails | undefined;
	setTourDetails: React.Dispatch<
		React.SetStateAction<TTourDetails | undefined>
	>;
	passengerDetails: TPassengerDetails | undefined;
	setPassengerDetails: React.Dispatch<
		React.SetStateAction<TPassengerDetails | undefined>
	>;
	setTourSearchQueries: React.Dispatch<
		React.SetStateAction<TSearchQueries | undefined>
	>;
	setFlightSearchQueries: React.Dispatch<
		React.SetStateAction<TSearchQueries | undefined>
	>;
	tourSearchQueries: TSearchQueries | undefined;
	flightSearchQueries: TSearchQueries | undefined;
	tourPassengers: number;
	setTourPassengers: React.Dispatch<React.SetStateAction<number>>;
	flightPassengers: number;
	setFlightPassengers: React.Dispatch<React.SetStateAction<number>>;
}>({
	selectedSeat: "",
	setSelectedSeat: () => {},
	flightDetails: undefined,
	setFlightDetails: () => {},
	tourDetails: undefined,
	setTourDetails: () => {},
	passengerDetails: undefined,
	setPassengerDetails: () => {},
	setTourSearchQueries: () => {},
	setFlightSearchQueries: () => {},
	tourSearchQueries: undefined,
	flightSearchQueries: undefined,
	tourPassengers: 1,
	setTourPassengers: () => {},
	flightPassengers: 1,
	setFlightPassengers: () => {},
});
const AirContextProvider: FC<AirContextProps> = (props) => {
	const [tourSearchQueries, setTourSearchQueries] = useState<TSearchQueries>();
	const [flightSearchQueries, setFlightSearchQueries] =
		useState<TSearchQueries>();
	const [selectedSeat, setSelectedSeat] = useState<string>("1A");
	const [tourDetails, setTourDetails] = useState<TTourDetails>();
	const [flightDetails, setFlightDetails] = useState<IFlight>();
	const [passengerDetails, setPassengerDetails] = useState<TPassengerDetails>();
	const [tourPassengers, setTourPassengers] = useState<number>(1);
	const [flightPassengers, setFlightPassengers] = useState<number>(1);

	const value = useMemo(
		() => ({
			selectedSeat,
			setSelectedSeat,
			flightDetails,
			setFlightDetails,
			tourDetails,
			setTourDetails,
			passengerDetails,
			setPassengerDetails,
			setTourSearchQueries,
			setFlightSearchQueries,
			tourSearchQueries,
			flightSearchQueries,
			tourPassengers,
			setTourPassengers,
			flightPassengers,
			setFlightPassengers,
		}),
		[
			selectedSeat,
			flightDetails,
			tourDetails,
			passengerDetails,
			tourSearchQueries,
			flightSearchQueries,
			tourPassengers,
			flightPassengers,
		]
	);
	return (
		<AirContext.Provider value={value}>{props.children}</AirContext.Provider>
	);
};

export default AirContextProvider;
