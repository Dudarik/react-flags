import axios from "axios";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import * as api from "./config";
import { themeReducer } from "./features/theme/theme-slice";
import { controlsReducer } from "./features/controls/constrols-slice";
import { counriesReducer } from "./features/counries/countries-slice";
import { detailsReducer } from "./features/details/details-slice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    countries: counriesReducer,
    details: detailsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});
