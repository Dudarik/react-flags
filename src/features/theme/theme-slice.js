import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "@@theme",
  initialState: "light",
  reducers: {
    setTheme: (_, action) => action.payload,
  },
});

export const themeReducer = themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
