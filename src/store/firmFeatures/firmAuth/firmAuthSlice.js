import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  firm_token: null,
};

const firmAuthSlice = createSlice({
  name: "firmAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, firm_token } = action.payload;
      state.user = user;
      state.firm_token = firm_token;
      Cookies.set("firm_token", firm_token);
    },
    logOut: (state) => {
      state.user = null;
      state.firm_token = null;
      Cookies.remove("firm_token");
    },
  },
});

export const { setUser, logOut } = firmAuthSlice.actions;

export default firmAuthSlice.reducer;


// Corrected selectors
export const selectCurrentToken = (state) => state.firmAuth.token;
export const selectCurrentUser = (state) => state.firmAuth?.user;