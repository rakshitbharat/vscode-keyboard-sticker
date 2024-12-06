import { combineReducers } from "@reduxjs/toolkit";
import keyboardReducer from "./slices/keyboardSlice";
import stickerThemesReducer from "./slices/stickerThemesSlice";

export const rootReducer = combineReducers({
  keyboard: keyboardReducer,
  stickerThemes: stickerThemesReducer,
});
