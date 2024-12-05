import { createSlice } from "@reduxjs/toolkit";
import { defaultConfig } from "@/data/stickerConfigs";

const initialState = {
  selectedOS: "mac",
  selectedConfig: defaultConfig,
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
  },
});

export const { setSelectedOS, setSelectedConfig } = keyboardSlice.actions;
export default keyboardSlice.reducer;
