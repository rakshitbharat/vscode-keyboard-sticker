import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import keyboardReducer from "./slices/keyboardSlice";
import { stickerRegistry } from "@/data/stickerConfigs";
import { defaultConfig } from "@/data/stickerConfigs/types";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["keyboard"],
};

const persistedReducer = persistReducer(persistConfig, keyboardReducer);

// Create store with middleware to handle initialization
export const store = configureStore({
  reducer: {
    keyboard: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Initialize store with default values if needed
store.dispatch({
  type: "keyboard/setSelectedConfig",
  payload: defaultConfig,
});

export const persistor = persistStore(store);
