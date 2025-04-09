import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAirline, IAirlineCities, IFlights } from "../../types/airline";

const airlineSlice = createSlice({
	name: "airline",
	initialState: {
		airlines: [] as IAirline[],
		flights: [] as IFlights[],
		airlineCities: [] as IAirlineCities[],
		selectedAirline: null as IAirline | null,
	},
	reducers: {
		setAirlines: (state, action: PayloadAction<IAirline[]>) => {
			state.airlines = action.payload;
		},
		setSelectedAirline: (state, action: PayloadAction<IAirline | null>) => {
			state.selectedAirline = action.payload;
		},
		setAirlineCities: (state, action: PayloadAction<IAirlineCities[]>) => {
			state.airlineCities = action.payload;
		},
		setFlights: (state, action: PayloadAction<IFlights[]>) => {
			state.flights = action.payload;
		},
	},
});

export const { setAirlines, setSelectedAirline, setAirlineCities, setFlights } =
	airlineSlice.actions;
const airlineReducer = airlineSlice.reducer;
export default airlineReducer;
