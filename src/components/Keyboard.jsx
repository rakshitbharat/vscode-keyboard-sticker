"use client";
import { Box } from "@mui/material";
import Key from "./Key";
import { keyboardLayout } from "../data/keyboardData";

const Keyboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      {keyboardLayout.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          {row.map((key, keyIndex) => (
            <Key key={`${rowIndex}-${keyIndex}`} keyData={key} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Keyboard;
