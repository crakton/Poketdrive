import { EAvailableSeats } from "../airline";

export type TBookFlightWithoutSharedSeatsDTO = {
	scheduleIndex: number;
	passengerInfo: TPassengerDTO;
};

export type TBookFlightWithSharedSeatsDTO = {
	scheduleIndex: number;
	passengerInfo: {
		name: string;
		email: string;
		passportNumber: string;
		dateOfBirth: string | Date;
		address: string;
		country: string;
	};
};

export type TBookSharedFlightDTO = {
	scheduleIndex: string;
	selectedSeat: EAvailableSeats;
	passengerInfo: TPassengerDTO;
};
export type TPassengerDTO = {
	name: string;
	address: string;
	passportNumber: string;
	dateOfBirth: string;
	country: string;
	email?: string;
};
export type FindFlightDTO = {
	departureCity: string;
	destinationCity: string;
};
