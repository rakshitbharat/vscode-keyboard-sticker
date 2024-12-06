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
          image: "/themes/vscodePurple/mac/copy.png",
        },
        v: {
          text: ["⌘ + V", "Paste Line"],
          icon: "paste",
          image: "/themes/vscodePurple/mac/paste.png",
        },
        x: {
          text: ["⌘ + X", "Cut Line"],
          icon: "cut",
          image: "/themes/vscodePurple/mac/cut.png",
        },
        z: {
          text: ["⌘ + Z", "Undo"],
          icon: "undo",
          image: "/themes/vscodePurple/mac/undo.png",
        },
        f: ["⌘ + F", "Find"],
        s: ["⌘ + S", "Save"],
        p: ["⌘ + P", "Quick Open"],
        b: ["⌘ + B", "Toggle Sidebar"],
        f1: {
          text: ["Help"],
          image: "/themes/vscodePurple/mac/help.png",
        },
        f2: {
          text: ["Rename Symbol"],
          image: "/themes/vscodePurple/mac/rename.png",
        },
        f3: {
          text: ["Find Next"],
          image: "/themes/vscodePurple/mac/findNext.png",
        },
        f4: {
          text: ["Find Previous"],
          image: "/themes/vscodePurple/mac/findPrevious.png",
        },
        f5: {
          text: ["Start Debug"],
          image: "/themes/vscodePurple/mac/startDebug.png",
        },
        f6: {
          text: ["Focus Editor"],
          image: "/themes/vscodePurple/mac/focusEditor.png",
        },
        f7: {
          text: ["Focus Terminal"],
          image: "/themes/vscodePurple/mac/focusTerminal.png",
        },
        f8: {
          text: ["Focus Problems"],
          image: "/themes/vscodePurple/mac/focusProblems.png",
        },
        f9: {
          text: ["Toggle Breakpoint"],
          image: "/themes/vscodePurple/mac/toggleBreakpoint.png",
        },
        f10: {
          text: ["Show Menu Bar"],
          image: "/themes/vscodePurple/mac/showMenuBar.png",
        },
        f11: {
          text: ["Full Screen"],
          image: "/themes/vscodePurple/mac/fullScreen.png",
        },
        f12: {
          text: ["Dev Tools"],
          image: "/themes/vscodePurple/mac/devTools.png",
        },
      },
    },
    windows: {
      stickers: {
        c: {
          text: ["Ctrl + C", "Copy Line"],
          icon: "copy",
          image: "/themes/vscodePurple/windows/copy.png",
        },
        v: {
          text: ["Ctrl + V", "Paste Line"],
          icon: "paste",
          image: "/themes/vscodePurple/windows/paste.png",
        },
        x: {
          text: ["Ctrl + X", "Cut Line"],
          icon: "cut",
          image: "/themes/vscodePurple/windows/cut.png",
        },
        z: {
          text: ["Ctrl + Z", "Undo"],
          icon: "undo",
          image: "/themes/vscodePurple/windows/undo.png",
        },
        f: ["Ctrl + F", "Find"],
        s: ["Ctrl + S", "Save"],
        p: ["Ctrl + P", "Quick Open"],
        b: ["Ctrl + B", "Toggle Sidebar"],
        f1: {
          text: ["Help"],
          image: "/themes/vscodePurple/windows/help.png",
        },
        f2: {
          text: ["Rename Symbol"],
          image: "/themes/vscodePurple/windows/rename.png",
        },
        f3: {
          text: ["Find Next"],
          image: "/themes/vscodePurple/windows/findNext.png",
        },
        f4: {
          text: ["Find Previous"],
          image: "/themes/vscodePurple/windows/findPrevious.png",
        },
        f5: {
          text: ["Start Debug"],
          image: "/themes/vscodePurple/windows/startDebug.png",
        },
        f6: {
          text: ["Focus Editor"],
          image: "/themes/vscodePurple/windows/focusEditor.png",
        },
        f7: {
          text: ["Focus Terminal"],
          image: "/themes/vscodePurple/windows/focusTerminal.png",
        },
        f8: {
          text: ["Focus Problems"],
          image: "/themes/vscodePurple/windows/focusProblems.png",
        },
        f9: {
          text: ["Toggle Breakpoint"],
          image: "/themes/vscodePurple/windows/toggleBreakpoint.png",
        },
        f10: {
          text: ["Show Menu Bar"],
          image: "/themes/vscodePurple/windows/showMenuBar.png",
        },
        f11: {
          text: ["Full Screen"],
          image: "/themes/vscodePurple/windows/fullScreen.png",
        },
        f12: {
          text: ["Dev Tools"],
          image: "/themes/vscodePurple/windows/devTools.png",
        },
      },
    },
    ubuntu: {
      stickers: {
        c: {
          text: ["Ctrl + C", "Copy Line"],
          icon: "copy",
          image: "/themes/vscodePurple/ubuntu/copy.png",
        },
        v: {
          text: ["Ctrl + V", "Paste Line"],
          icon: "paste",
          image: "/themes/vscodePurple/ubuntu/paste.png",
        },
        x: {
          text: ["Ctrl + X", "Cut Line"],
          icon: "cut",
          image: "/themes/vscodePurple/ubuntu/cut.png",
        },
        z: {
          text: ["Ctrl + Z", "Undo"],
          icon: "undo",
          image: "/themes/vscodePurple/ubuntu/undo.png",
        },
        f: ["Ctrl + F", "Find"],
        s: ["Ctrl + S", "Save"],
        p: ["Ctrl + P", "Quick Open"],
        b: ["Ctrl + B", "Toggle Sidebar"],
        f1: {
          text: ["Help"],
          image: "/themes/vscodePurple/ubuntu/help.png",
        },
        f2: {
          text: ["Rename Symbol"],
          image: "/themes/vscodePurple/ubuntu/rename.png",
        },
        f3: {
          text: ["Find Next"],
          image: "/themes/vscodePurple/ubuntu/findNext.png",
        },
        f4: {
          text: ["Find Previous"],
          image: "/themes/vscodePurple/ubuntu/findPrevious.png",
        },
        f5: {
          text: ["Start Debug"],
          image: "/themes/vscodePurple/ubuntu/startDebug.png",
        },
        f6: {
          text: ["Focus Editor"],
          image: "/themes/vscodePurple/ubuntu/focusEditor.png",
        },
        f7: {
          text: ["Focus Terminal"],
          image: "/themes/vscodePurple/ubuntu/focusTerminal.png",
        },
        f8: {
          text: ["Focus Problems"],
          image: "/themes/vscodePurple/ubuntu/focusProblems.png",
        },
        f9: {
          text: ["Toggle Breakpoint"],
          image: "/themes/vscodePurple/ubuntu/toggleBreakpoint.png",
        },
        f10: {
          text: ["Show Menu Bar"],
          image: "/themes/vscodePurple/ubuntu/showMenuBar.png",
        },
        f11: {
          text: ["Full Screen"],
          image: "/themes/vscodePurple/ubuntu/fullScreen.png",
        },
        f12: {
          text: ["Dev Tools"],
          image: "/themes/vscodePurple/ubuntu/devTools.png",
        },
      },
    },
  },
};
