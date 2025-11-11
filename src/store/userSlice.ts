import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    name: "",
    token: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.token = "";
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
