import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Airline } from "../../types/airline";

const airlineSlice = createSlice({
	name: "airline",
	initialState: {
		airlines: [] as Airline[],
		selectedAirline: null as Airline | null,
	},
	reducers: {
		setAirlines: (state, action: PayloadAction<Airline[]>) => {
			state.airlines = action.payload;
		},
		setSelectedAirline: (state, action: PayloadAction<Airline | null>) => {
			state.selectedAirline = action.payload;
		},
	},
});

export const { setAirlines, setSelectedAirline } = airlineSlice.actions;
const airlineReducer = airlineSlice.reducer;
export default airlineReducer;
