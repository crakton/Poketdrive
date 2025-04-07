import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navSlice } from "../slices/navSlice";
import chatReducer from "./features/chatSlice";
import airlineReducer from "./features/airlineSlice";
import authReducer from "./features/authSlice";
import flightReducer from "./features/flightSllice";

const reducers = combineReducers({
	nav: navSlice.reducer,
	auth: authReducer,
	airlines: airlineReducer,
	chat: chatReducer,
	flights: flightReducer,
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
