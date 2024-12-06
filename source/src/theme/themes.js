export const themes = {
  mac: {
    background: `white`,
    keyboardBg: `white`,
    sectionBg: `linear-gradient(
      135deg,
      rgba(218, 218, 220, 0.95),
      rgba(195, 195, 197, 0.9)
    )`,
    accent: {
      primary: "#0A84FF",
      secondary: "#0066CC",
    },
    brand: {
      gradient: "linear-gradient(135deg, #0A84FF 0%, #0066CC 100%)",
      shadow: "0 0 150px rgba(10, 132, 255, 0.15)",
    },
  },
  windows: {
    background: `linear-gradient(135deg, #003366 0%, #004080 25%, #0066CC 75%, #0080FF 100%)`,
    keyboardBg: `linear-gradient(
      145deg,
      rgba(0, 77, 153, 0.95),
      rgba(0, 102, 204, 0.9)
    )`,
    sectionBg: `linear-gradient(
      135deg,
      rgba(0, 51, 102, 0.95),
      rgba(0, 77, 153, 0.9)
    )`,
    accent: {
      primary: "#60CDFF",
      secondary: "#4CC2FF",
    },
    brand: {
      gradient: "linear-gradient(135deg, #60CDFF 0%, #4CC2FF 100%)",
      shadow: "0 0 150px rgba(96, 205, 255, 0.3)",
    },
  },
  ubuntu: {
    background: "linear-gradient(135deg, #2c001e 0%, #500a28 100%)",
    keyboardBg: "linear-gradient(145deg, #500a28, #77172e)",
    sectionBg: "linear-gradient(135deg, #77172e, #500a28)",
    accent: {
      primary: "#E95420",
      secondary: "#DD4814",
    },
    brand: {
      gradient: "linear-gradient(135deg, #E95420 0%, #DD4814 100%)",
      shadow: "0 0 120px rgba(233, 84, 32, 0.1)",
    },
  },
};
