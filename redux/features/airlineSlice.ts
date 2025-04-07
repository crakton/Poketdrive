import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAirline, IAirlineCities } from "../../types/airline";

const airlineSlice = createSlice({
	name: "airline",
	initialState: {
		airlines: [] as IAirline[],
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
	},
});

export const { setAirlines, setSelectedAirline, setAirlineCities } =
	airlineSlice.actions;
const airlineReducer = airlineSlice.reducer;
export default airlineReducer;
