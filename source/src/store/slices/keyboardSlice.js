import { createSlice } from "@reduxjs/toolkit";
import { defaultConfig } from "@/data/stickerConfigs/types";

const initialState = {
  selectedOS: "mac",
  selectedConfig: defaultConfig,
  customStickers: {},
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    setSelectedOS: (state, action) => {
      state.selectedOS = action.payload;
    },
    setSelectedConfig: (state, action) => {
      state.selectedConfig = action.payload;
    },
    setKeySticker: (state, action) => {
      const { keyLabel, stickerData } = action.payload;
      state.customStickers[keyLabel] = stickerData;
    },
    removeKeySticker: (state, action) => {
      const keyLabel = action.payload;
      delete state.customStickers[keyLabel];
    },
  },
});

export const {
  setSelectedOS,
  setSelectedConfig,
  setKeySticker,
  removeKeySticker,
} = keyboardSlice.actions;
export default keyboardSlice.reducer;
