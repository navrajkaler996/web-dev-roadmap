import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
};

const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.email = action.payload;
    },
    logout(state, action) {
      (state.isLoggedIn = false), (state.email = null);
    },
  },
});

export const { login, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;
