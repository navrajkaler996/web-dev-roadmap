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
  },
});

export const { login } = loggedInSlice.actions;
export default loggedInSlice.reducer;
