export default {
  id: "vscodePurple",
  name: "Purple Stickers",
  description: "Classic VSCode theme with purple sticker accents",
  author: "Your Name",
  version: "1.0.0",
  styles: {
    mac: {
      style: {
        backgroundColor: "rgba(156, 39, 176, 0.9)",
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
        backgroundColor: "rgba(68, 138, 255, 0.9)",
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
        backgroundColor: "rgba(233, 84, 32, 0.9)",
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
