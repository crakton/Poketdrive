import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navSlice } from "../slices/navSlice";
import airlineReducer from "./features/airlineSlice";

const reducers = combineReducers({
	nav: navSlice.reducer,
	airlines: airlineReducer,
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
