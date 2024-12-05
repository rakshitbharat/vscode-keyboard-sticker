export const stickerTypes = {
  BASIC: "basic",
  TRANSPARENT: "transparent",
  GRADIENT: "gradient",
  NEON: "neon",
};

export const defaultOS = "mac";
export const defaultStickerType = "basic";

export const stickerConfigs = {
  basic: {
    mac: {
      style: {
        backgroundColor: "#2D2D2D",
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid #3D3D3D",
      },
      position: "top-right",
    },
    windows: {
      style: {
        backgroundColor: "#264F78",
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid #3794FF",
      },
      position: "top-right",
    },
    ubuntu: {
      style: {
        backgroundColor: "#E95420",
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid #DD4814",
      },
      position: "top-right",
    },
  },
  transparent: {
    mac: {
      style: {
        backgroundColor: "rgba(45, 45, 45, 0.8)",
        backdropFilter: "blur(4px)",
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid rgba(61, 61, 61, 0.5)",
      },
      position: "top-right",
    },
    windows: {
      style: {
        backgroundColor: "rgba(38, 79, 120, 0.8)",
        backdropFilter: "blur(4px)",
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid rgba(55, 148, 255, 0.5)",
      },
      position: "top-right",
    },
    ubuntu: {
      style: {
        backgroundColor: "rgba(233, 84, 32, 0.8)",
        backdropFilter: "blur(4px)",
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid rgba(221, 72, 20, 0.5)",
      },
      position: "top-right",
    },
  },
  gradient: {
    mac: {
      style: {
        background: "linear-gradient(135deg, #0A84FF, #0066CC)",
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      },
      position: "top-right",
    },
    windows: {
      style: {
        background: "linear-gradient(135deg, #60CDFF, #4CC2FF)",
        color: "#000000",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      },
      position: "top-right",
    },
    ubuntu: {
      style: {
        background: "linear-gradient(135deg, #E95420, #DD4814)",
        color: "#FFFFFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      },
      position: "top-right",
    },
  },
  neon: {
    mac: {
      style: {
        backgroundColor: "#000000",
        color: "#0A84FF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid #0A84FF",
        boxShadow: "0 0 8px #0A84FF",
        textShadow: "0 0 5px #0A84FF",
      },
      position: "top-right",
    },
    windows: {
      style: {
        backgroundColor: "#000000",
        color: "#60CDFF",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid #60CDFF",
        boxShadow: "0 0 8px #60CDFF",
        textShadow: "0 0 5px #60CDFF",
      },
      position: "top-right",
    },
    ubuntu: {
      style: {
        backgroundColor: "#000000",
        color: "#E95420",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "0.7em",
        fontWeight: "500",
        border: "1px solid #E95420",
        boxShadow: "0 0 8px #E95420",
        textShadow: "0 0 5px #E95420",
      },
      position: "top-right",
    },
  },
};
