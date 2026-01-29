import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) =>
      (state = {
        isAuthenticated: true,
        user: action.payload,
      }),
    removeAuth: (state) =>
      (state = {
        isAuthenticated: false,
        user: {},
      }),
  },
});

export const { setAuth, removeAuth } = slice.actions;
export default slice.reducer;
