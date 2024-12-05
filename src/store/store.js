import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import keyboardReducer from "./slices/keyboardSlice";
import { stickerRegistry, defaultConfig } from "@/data/stickerConfigs";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["keyboard"],
};

// Validate initial state against available configs
const validateInitialState = (state) => {
  if (!state) return state;

  const validConfig =
    state.keyboard?.selectedConfig &&
    stickerRegistry[state.keyboard.selectedConfig];

  if (!validConfig) {
    return {
      ...state,
      keyboard: {
        ...state.keyboard,
        selectedConfig: defaultConfig,
      },
    };
  }

  return state;
};

const persistedReducer = persistReducer(persistConfig, keyboardReducer);

export const store = configureStore({
  reducer: {
    keyboard: persistedReducer,
  },
  preloadedState: validateInitialState(undefined),
});

export const persistor = persistStore(store);
