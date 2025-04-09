import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navSlice } from "../slices/navSlice";
import chatReducer from "./features/chatSlice";
import airlineReducer from "./features/airlineSlice";
<<<<<<< HEAD
import sendReducer from "./features/waterSendSlice";

const reducers = combineReducers({
  nav: navSlice.reducer,
  airlines: airlineReducer,
  sendForm: sendReducer,
=======
import flightReducer from "./features/flightSllice";
import userReducer from "./features/userSlice";

const reducers = combineReducers({
	nav: navSlice.reducer,
	airlines: airlineReducer,
	chat: chatReducer,
	flights: flightReducer,
	user: userReducer,
>>>>>>> 3cd2cf17ad2ca487c09b65969c224c9e6b1da61b
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
