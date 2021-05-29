import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface RegistrationState {
  loading: boolean;
}

const initialState: RegistrationState = {
   loading: false,
};

export const registartionSlice = createSlice({
   name: "registartion",
   initialState,
   reducers: {
      loading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
      },
   },
});

export const { loading } = registartionSlice.actions;

export const selectLoadingStatus = (state: RootState) => state.registration.loading;

export default registartionSlice.reducer;
