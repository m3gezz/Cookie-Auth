import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {},
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) =>
      (state = {
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      }),
    removeAuth: (state) =>
      (state = {
        isAuthenticated: false,
        isLoading: false,
        user: {},
      }),
  },
});

export const { setAuth, removeAuth } = slice.actions;
export default slice.reducer;
