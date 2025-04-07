import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EBookFlightType, IFlight } from "../../types/airline";

const flightSlice = createSlice({
	name: "flights",
	initialState: {
		allFlights: [] as IFlight[],
		findFlights: [] as IFlight[],
		bookFlightType: null as EBookFlightType | null,
	},
	reducers: {
		setFlights: (state, action: PayloadAction<IFlight[]>) => {
			state.allFlights = action.payload;
		},
		findFlights: (state, action: PayloadAction<IFlight[]>) => {
			state.findFlights = action.payload;
			console.log(state.findFlights);
		},
		setBookFlightType: (
			state,
			action: PayloadAction<EBookFlightType | null>
		) => {
			state.bookFlightType = action.payload;
		},
	},
});

export const { setFlights, findFlights, setBookFlightType } =
	flightSlice.actions;
const airlineReducer = flightSlice.reducer;
export default airlineReducer;
