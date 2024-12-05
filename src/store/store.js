import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import keyboardReducer from "./slices/keyboardSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["keyboard"], // Only keyboard reducer will be persisted
};

const rootReducer = combineReducers({
  keyboard: keyboardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
