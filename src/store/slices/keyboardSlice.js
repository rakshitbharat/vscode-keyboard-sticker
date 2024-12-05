import { createSlice } from "@reduxjs/toolkit";
import { defaultOS, defaultShortcutType } from "@/data/shortcutConfigs";
import { defaultStickerType } from "@/data/stickerLayout";

const initialState = {
  selectedOS: defaultOS,
  shortcutType: defaultShortcutType,
  stickerType: defaultStickerType,
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    setSelectedOS: (state, action) => {
      state.selectedOS = action.payload;
    },
    setShortcutType: (state, action) => {
      state.shortcutType = action.payload;
    },
    setStickerType: (state, action) => {
      state.stickerType = action.payload;
    },
  },
});

export const { setSelectedOS, setShortcutType, setStickerType } =
  keyboardSlice.actions;
export default keyboardSlice.reducer;
