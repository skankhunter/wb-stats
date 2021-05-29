import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface LoginState {
  loading: boolean;
}

const initialState: LoginState = {
   loading: false,
};

export const loginSlice = createSlice({
   name: "login",
   initialState,
   reducers: {
      loading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
      },
   },
});

export const { loading } = loginSlice.actions;

export const selectLoadingStatus = (state: RootState) => state.login.loading;

export default loginSlice.reducer;
