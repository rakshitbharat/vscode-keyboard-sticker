import { combineReducers } from "@reduxjs/toolkit";
import keyboardReducer from "./slices/keyboardSlice";

export const rootReducer = combineReducers({
  keyboard: keyboardReducer,
});
