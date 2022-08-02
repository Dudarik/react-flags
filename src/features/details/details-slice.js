import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCountry: null,
  status: "idle",
  error: null,
  neighbors: [],
};

export const loadCountryByName = createAsyncThunk(
  "@@details/load-country-by-name",
  async (name, { extra: { client, api } }) =>
    client.get(api.searchByCountry(name))
);

export const loadNeighborsByBorder = createAsyncThunk(
  "@@details/load-neighbors-by-border",
  (neighbors, { extra: { client, api } }) =>
    client.get(api.filterByCode(neighbors))
);

export const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.error = action.payload || action.error;
        state.status = "rejected";
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        // console.log(action);
        state.status = "fulfilled";
        state.error = null;

        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        // console.log(action);
        state.neighbors = action.payload.data.map((c) => c.name);
      });
  },
});

export const { clearDetails } = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
