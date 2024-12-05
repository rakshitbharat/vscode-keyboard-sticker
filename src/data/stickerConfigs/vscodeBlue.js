export default {
  id: "vscodeBlue",
  name: "VSCode Blue",
  description: "Modern VSCode theme with blue accents",
  author: "Your Name",
  version: "1.0.0",
  styles: {
    mac: {
      style: {
        backgroundColor: "rgba(0, 122, 204, 0.9)",
        color: "#FFFFFF",
        fontSize: "0.65em",
        padding: "2px 4px",
        borderRadius: "3px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
      position: "top-right",
    },
    windows: {
      style: {
        backgroundColor: "rgba(0, 122, 204, 0.9)",
        color: "#FFFFFF",
        fontSize: "0.65em",
        padding: "2px 4px",
        borderRadius: "3px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
      position: "top-right",
    },
    ubuntu: {
      style: {
        backgroundColor: "rgba(0, 122, 204, 0.9)",
        color: "#FFFFFF",
        fontSize: "0.65em",
        padding: "2px 4px",
        borderRadius: "3px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
      position: "top-right",
    },
  },
  layout: {
    C: ["Copy", "Copy Line"],
    V: ["Paste", "Paste Line"],
    X: ["Cut", "Cut Line"],
    Z: ["Undo", "Undo Last"],
    S: ["Save", "Save All"],
    F: ["Find", "Find in Files"],
    B: ["Toggle Sidebar"],
    P: ["Command Palette"],
  },
};
