import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOS: "mac",
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    setSelectedOS: (state, action) => {
      state.selectedOS = action.payload;
    },
  },
});

export const { setSelectedOS } = keyboardSlice.actions;
export default keyboardSlice.reducer;
