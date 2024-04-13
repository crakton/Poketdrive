import { configureStore } from "@reduxjs/toolkit";
import { navSlice } from "./slices/navSlice"; // Corrected import

export const store = configureStore({
  reducer: {
    nav: navSlice.reducer, 
  },
});
