export default {
  id: "vscodeBlue",
  name: "VSCode Blue",
  description: "Blue theme for VSCode keyboard stickers",
  author: "Default",
  version: "1.0.0",
  styles: {
    mac: {
      style: {
        backgroundColor: "rgba(0, 122, 204, 0.9)", // VSCode blue
        color: "#FFFFFF",
        fontSize: "0.6em",
        padding: "1px 3px",
        borderRadius: "3px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
      position: "top-right",
    },
    windows: {
      style: {
        backgroundColor: "rgba(28, 146, 255, 0.9)", // Lighter blue for Windows
        color: "#FFFFFF",
        fontSize: "0.6em",
        padding: "1px 3px",
        borderRadius: "3px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
      position: "top-right",
    },
    ubuntu: {
      style: {
        backgroundColor: "rgba(41, 128, 185, 0.9)", // Ubuntu-style blue
        color: "#FFFFFF",
        fontSize: "0.6em",
        padding: "1px 3px",
        borderRadius: "3px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
      position: "top-right",
    },
  },
  osConfigs: {
    mac: {
      stickers: {
        c: {
          text: ["⌘ + C", "Copy Line"],
          icon: "copy",
        },
        v: {
          text: ["⌘ + V", "Paste Line"],
          icon: "paste",
        },
        x: {
          text: ["⌘ + X", "Cut Line"],
          icon: "cut",
        },
        z: {
          text: ["⌘ + Z", "Undo"],
          icon: "undo",
        },
        f: ["⌘ + F", "Find"],
        s: ["⌘ + S", "Save"],
        p: ["⌘ + P", "Quick Open"],
        b: ["⌘ + B", "Toggle Sidebar"],
      },
    },
    windows: {
      stickers: {
        c: {
          text: ["Ctrl + C", "Copy Line"],
          icon: "copy",
        },
        v: {
          text: ["Ctrl + V", "Paste Line"],
          icon: "paste",
        },
        x: {
          text: ["Ctrl + X", "Cut Line"],
          icon: "cut",
        },
        z: {
          text: ["Ctrl + Z", "Undo"],
          icon: "undo",
        },
        f: ["Ctrl + F", "Find"],
        s: ["Ctrl + S", "Save"],
        p: ["Ctrl + P", "Quick Open"],
        b: ["Ctrl + B", "Toggle Sidebar"],
      },
    },
    ubuntu: {
      stickers: {
        c: {
          text: ["Ctrl + C", "Copy Line"],
          icon: "copy",
        },
        v: {
          text: ["Ctrl + V", "Paste Line"],
          icon: "paste",
        },
        x: {
          text: ["Ctrl + X", "Cut Line"],
          icon: "cut",
        },
        z: {
          text: ["Ctrl + Z", "Undo"],
          icon: "undo",
        },
        f: ["Ctrl + F", "Find"],
        s: ["Ctrl + S", "Save"],
        p: ["Ctrl + P", "Quick Open"],
        b: ["Ctrl + B", "Toggle Sidebar"],
      },
    },
    // Common shortcuts for all OS
    f1: ["Help"],
    f2: ["Rename Symbol"],
    f3: ["Find Next"],
    f4: ["Find Previous"],
    f5: ["Start Debug"],
    f6: ["Focus Editor"],
    f7: ["Focus Terminal"],
    f8: ["Focus Problems"],
    f9: ["Toggle Breakpoint"],
    f10: ["Show Menu Bar"],
    f11: ["Full Screen"],
    f12: ["Dev Tools"],
  },
};
