import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./firmFeatures/firmAuth/firmAuthSlice";
import lawFirmRegistrationReducer from "./firmFeatures/firmAuth/lawFirmRegistrationSlice";
import { baseApi } from "./baseApi/baseApi";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { firmBaseApi } from "./baseApi/firmBaseApi";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [firmBaseApi.reducerPath]: firmBaseApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    lawFirmRegistration: lawFirmRegistrationReducer, // ,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(firmBaseApi.middleware) //  add both middlewares,
      .concat(baseApi.middleware)
});

export const persistor = persistStore(store);
