import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk(
  "@@countries/load-countries",
  (_, { extra: { client, api } }) => client.get(api.ALL_COUNTRIES)
);

const initialState = {
  status: "idle",
  error: null,
  list: [],
};

const countriesSlice = createSlice({
  name: "@@countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.error = action.payload || action.error;
        state.status = "rejected";
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        state.list = action.payload.data;
      });
  },
});

//Selectors
export const counriesReducer = countriesSlice.reducer;

export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectAllCountries = (state) => state.countries.list;
export const selectVisibleCountries = (state, { search = "", region = "" }) => {
  return state.countries.list.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) &&
      country.region.includes(region)
  );
};
