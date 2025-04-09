import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IWallet } from "../../types/user";

// Initial state
const initialState = {
	user: {} as IUser,
	wallet: {} as IWallet,
};

// Create slice
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = {} as IUser;
		},
		setWallet: (state, action: PayloadAction<IWallet>) => {
			state.wallet = action.payload;
		},
		clearWallet: (state) => {
			state.wallet = {} as IWallet;
		},
	},
});

export const { clearUser, clearWallet, setUser, setWallet } = userSlice.actions;

export default userSlice.reducer;
