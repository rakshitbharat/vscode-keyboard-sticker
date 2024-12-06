import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themes: {},
  mediaLibrary: {
    items: {},
    categories: [],
  },
};

const stickerThemesSlice = createSlice({
  name: "stickerThemes",
  initialState,
  reducers: {
    createStickerTheme: (state, action) => {
      state.themes[action.payload.id] = action.payload;
    },
    updateStickerTheme: (state, action) => {
      const { themeId, os, keyName, stickerData } = action.payload;
      state.themes[themeId].osConfigs[os].stickers[keyName] = stickerData;
    },
    deleteStickerTheme: (state, action) => {
      delete state.themes[action.payload];
    },
    addMediaItem: (state, action) => {
      state.mediaLibrary.items[action.payload.id] = action.payload;
    },
    deleteMediaItem: (state, action) => {
      delete state.mediaLibrary.items[action.payload];
    },
  },
});

export const {
  createStickerTheme,
  updateStickerTheme,
  deleteStickerTheme,
  addMediaItem,
  deleteMediaItem,
} = stickerThemesSlice.actions;

export default stickerThemesSlice.reducer;
