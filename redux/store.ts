import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navSlice } from "../slices/navSlice";
import chatReducer from "./features/chatSlice";
import airlineReducer from "./features/airlineSlice";
import sendReducer from "./features/waterSendSlice";
import flightReducer from "./features/flightSllice";
import userReducer from "./features/userSlice";
import rideScheduleReducer from "./features/rideScheduleSlice";

const reducers = combineReducers({
	nav: navSlice.reducer,
	airlines: airlineReducer,
	sendForm: sendReducer,
	chat: chatReducer,
	flights: flightReducer,
	user: userReducer,
	rideSchedule: rideScheduleReducer,
});

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector<T> = (state: RootState) => T;

export const useAppDispatch = () => store.dispatch;
export const useAppSelector = <T>(selector: AppSelector<T>) => {
	return selector(store.getState());
};
