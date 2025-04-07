export interface IAirline {
	_id: string;
	name: string;
	code: string;
	country: string;
	fleetSize: number;
	logo: string;
	image: string;
	pilots: any[];
	reviews: any[];
}

export interface IFlightDeparture {
	_id: string;
	name: string;
	code: string;
	city: string;
	country: string;
	type: string;
}
export interface IFlightDestination {
	_id: string;
	name: string;
	code: string;
	city: string;
	country: string;
	type: string;
}

export interface FlightAvailabiltyShedule {
	availableSeats: EAvailableSeats[];
	additionalCharge: number;
	jetShare: boolean;
	sharedPassengers: number;
	_id: string;
	departureTime: string | Date;
	arrivalTime: string | Date;
	totalSeats: number;
}
// export interface IFlight {
// 	status: EFlightStatus;
// 	_id: string;
// 	airline: IAirline;
// 	flightNumber: string;
// 	departure: IFlightDeparture;
// 	destination: IFlightDestination;
// 	fixedPrice: number;
// 	availableSchedules: FlightAvailabiltyShedule[];
// }

export enum EBookFlightType {
	"WITHOUTSHAREDSEATS" = "WITHOUTSHAREDSEATS",
	"WITHSHAREDSEATS" = "WITHSHAREDSEATS",
	"SHAREDSEATS" = "SHAREDSEATS",
}
export enum EFlightStatus {
	"open" = "open",
	"fully-booked" = "fully-booked",
}
export enum EAvailableSeats {
	"1A" = "1A",
	"1B" = "1B",
	"2A" = "2A",
	"2B" = "2B",
	"3A" = "3A",
	"3B" = "3B",
	"4A" = "4A",
	"4B" = "4B",
}

export interface ISearchFlightAvaiSchedule {
	availableSeats: EAvailableSeats[];
	additionalCharge: number;
	jetShare: false;
	sharedPassengers: number;
	_id: string;
	departureTime: string | Date;
	arrivalTime: string | Date;
	totalSeats: number;
}
export interface ISearchFlight {
	_id: string;
	airline: { reviews: []; _id: string; name: string };
	flightNumber: string;
	departure: { _id: string; city: string };
	destination: { _id: string; city: string };
	availableSchedules: ISearchFlightAvaiSchedule[];
}

export interface IFlight {
	status: EFlightStatus;
	_id: string;
	airline: any;
	flightNumber: string;
	departure: IFlightDeparture;
	destination: IFlightDestination;
	fixedPrice: number;
	availableSchedules: ISearchFlightAvaiSchedule[];
}

export interface IAirlineCities {
	code: string;
	city: string;
}
export interface IBookingData {
	// Core flight information
	flight: ISearchFlight;
	selectedFlight: IFlight;
	scheduledIndex: number;
	departureTime: string;

	// Booking options
	isTour: boolean;
	isSharedFlight: boolean;
	isRoundTrip: boolean;

	// Pricing and passengers
	passengers: number;
	pricePerSeat: number;

	// Seat selection (filled later in flow)
	selectedSeatId?: string;
}
