import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TRideScheduleState = {
	// Define the state properties here
	locationData: {
		from: string;
		to: string;
		stops?: string[];
	};
	vehicleDetails: {
		rideType: string;
		carNumber: string;
		carColor: string;
		carName: string;
		vehicleImage?: string | null;
		dateTime?: Date | string | null;
	};
	ridePreferences: {
		luggageSize: string | null;
		seatingType: string | null;
	};
	backRowSeating: {
		maxPersons: number;
		otherPreferences?: {
			other: string;
			counts: number | null;
		};
	};
	price: number;
};
const initialState = {
	locationData: {
		from: "",
		to: "",
		stops: [],
	},
	vehicleDetails: {
		rideType: "",
		vehicleImage: null,
		carNumber: "",
		carColor: "",
		carName: "",
		dateTime: null as Date | string | null,
	},
	ridePreferences: {
		luggageSize: null,
		seatingType: null,
	},
	backRowSeating: {
		maxPersons: 2,
		otherPreferences: {
			other: "",
			counts: null,
		},
	},
	price: 0,
} as TRideScheduleState;

const rideScheduleSlice = createSlice({
	name: "rideSchedule",
	initialState: initialState,
	reducers: {
		setLocationData: (
			state,
			action: PayloadAction<{ from: string; to: string; stops?: string[] }>
		) => {
			state.locationData = action.payload;
		},
		setVehicleDetails: (
			state,
			action: PayloadAction<{
				rideType: string;
				carNumber: string;
				carColor: string;
				carName: string;
				vehicleImage?: string | null;
				dateTime: Date | string | null;
			}>
		) => {
			state.vehicleDetails = action.payload;
		},
		setRidePreferences: (
			state,
			action: PayloadAction<{
				luggageSize: string | null;
				seatingType: string | null;
			}>
		) => {
			state.ridePreferences = { ...state.ridePreferences, ...action.payload };
		},
		setBackRowSeating: (
			state,
			action: PayloadAction<{
				maxPersons: number;
				otherPreferences?: {
					other: string;
					counts: number | null;
				};
			}>
		) => {
			state.backRowSeating = action.payload;
		},
		setPrice: (state, action: PayloadAction<number>) => {
			state.price = action.payload;
		},
	},
});

export const {
	setLocationData,
	setVehicleDetails,
	setRidePreferences,
	setBackRowSeating,
	setPrice,
} = rideScheduleSlice.actions;
const rideScheduleReducer = rideScheduleSlice.reducer;
export default rideScheduleReducer;
