"use client";
import { Box, Typography } from "@mui/material";

const Key = ({ keyData }) => {
  const { label, width = 60, height = 60, shortcut } = keyData;

  return (
    <Box
      sx={{
        width: width,
        height: height,
        backgroundColor: "#f5f5f5",
        border: "1px solid #ccc",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "2px",
        cursor: "default",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
        position: "relative",
      }}
    >
      <Typography variant="body2">{label}</Typography>
      {shortcut && (
        <Box
          sx={{
            position: "absolute",
            bottom: "2px",
            fontSize: "8px",
            color: "#666",
          }}
        >
          {shortcut}
        </Box>
      )}
    </Box>
  );
};

export default Key;
