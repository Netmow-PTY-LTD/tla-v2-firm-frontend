import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
};

const firmAuthSlice = createSlice({
  name: "firmAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      Cookies.set("token", token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setUser, logOut } = firmAuthSlice.actions;

export default firmAuthSlice.reducer;


// Corrected selectors
export const selectCurrentToken = (state) => state.firmAuth.token;
export const selectCurrentUser = (state) => state.firmAuth?.user;