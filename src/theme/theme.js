"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1a1a1a",
      paper: "#252525",
    },
    primary: {
      main: "#bb86fc",
    },
    key: {
      main: "#2d2d2d",
      border: "#3d3d3d",
      hover: "#3a3a3a",
      text: "#ffffff",
    },
  },
});
