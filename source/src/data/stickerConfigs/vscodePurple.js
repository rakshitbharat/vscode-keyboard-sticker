import MyCustomComponent from "@/components/stickers/MyCustomComponent";

export default {
  id: "vscodePurple",
  name: "Purple Stickers",
  description: "Classic VSCode theme with purple sticker accents",
  author: "Default",
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
        command: {
          image: "/themes/vscodePurple/mac/svg/command.svg",
        },
        option: {
          image: "/themes/vscodePurple/mac/svg/command.svg",
        },
        control: {
          image: "/themes/vscodePurple/mac/svg/command.svg",
        },
        c: {
          text: ["⌘ + C", "Copy Line"],
          icon: "copy",
          image: "/themes/vscodePurple/mac/png/copy.png",
        },
        v: {
          text: ["⌘ + V", "Paste"],
          icon: "paste",
          image: "/themes/vscodePurple/mac/png/paste.png",
        },
        x: {
          text: ["⌘ + X", "Cut"],
          icon: "cut",
          image: "/themes/vscodePurple/mac/png/scissors.png",
        },
        z: {
          text: ["⌘ + Z", "Undo"],
          icon: "undo",
          image: "/themes/vscodePurple/mac/png/rotate-left.png",
        },
        f1: {
          text: ["Help"],
          image: "/themes/vscodePurple/mac/svg/circle-question.svg",
        },
        f2: {
          text: ["Rename"],
          image: "/themes/vscodePurple/mac/svg/pen-to-square.svg",
        },
        f: {
          text: ["⌘ + F", "Find"],
          image: "/themes/vscodePurple/mac/png/magnifying-glass.png",
        },
        b: {
          text: ["⌘ + B", "Toggle Sidebar"],
          image: "/themes/vscodePurple/mac/png/table-columns.png",
        },
        s: {
          text: ["⌘ + S", "Save"],
          image: "/themes/vscodePurple/mac/png/floppy-disk.png",
        },
        p: {
          text: ["⌘ + P", "Quick Open"],
          image: "/themes/vscodePurple/mac/png/folder-open.png",
        },
        f5: {
          text: ["Debug"],
          image: "/themes/vscodePurple/mac/png/bug.png",
        },
        f6: {
          text: ["Focus Editor"],
          image: "/themes/vscodePurple/mac/png/pen.png",
        },
        f7: {
          text: ["Terminal"],
          image: "/themes/vscodePurple/mac/png/terminal.png",
        },
        f8: {
          text: ["Problems"],
          image: "/themes/vscodePurple/mac/png/triangle-exclamation.png",
        },
        f9: {
          text: ["Breakpoint"],
          image: "/themes/vscodePurple/mac/png/circle-dot.png",
        },
        f10: {
          text: ["Menu"],
          image: "/themes/vscodePurple/mac/png/bars.png",
        },
        f11: {
          text: ["Full Screen"],
          image: "/themes/vscodePurple/mac/png/expand.png",
        },
        f12: {
          text: ["Dev Tools"],
          image: "/themes/vscodePurple/mac/png/wrench.png",
        },
      },
    },
    windows: {
      stickers: {
        super: {
          image: "/themes/vscodePurple/windows/circle-dot.svg",
        },
        control: {
          image: "/themes/vscodePurple/windows/circle-dot.svg",
        },
        alt: {
          image: "/themes/vscodePurple/windows/circle-dot.svg",
        },
        c: {
          text: ["Ctrl + C", "Copy"],
          icon: "copy",
          image: "/themes/vscodePurple/windows/copy.svg",
        },
        v: {
          text: ["Ctrl + V", "Paste"],
          icon: "paste",
          image: "/themes/vscodePurple/windows/paste.svg",
        },
        x: {
          text: ["Ctrl + X", "Cut"],
          icon: "cut",
          image: "/themes/vscodePurple/windows/scissors.svg",
        },
        z: {
          text: ["Ctrl + Z", "Undo"],
          icon: "undo",
          image: "/themes/vscodePurple/windows/rotate-left.svg",
        },
        f: {
          text: ["Ctrl + F", "Find"],
          image: "/themes/vscodePurple/windows/magnifying-glass.svg",
        },
        b: {
          text: ["Ctrl + B", "Toggle Sidebar"],
          image: "/themes/vscodePurple/windows/table-columns.svg",
        },
        s: {
          text: ["Ctrl + S", "Save"],
          image: "/themes/vscodePurple/windows/floppy-disk.svg",
        },
        p: {
          text: ["Ctrl + P", "Quick Open"],
          image: "/themes/vscodePurple/windows/folder-open.svg",
        },
        f1: {
          text: ["Help"],
          image: "/themes/vscodePurple/windows/circle-question.svg",
        },
        f2: {
          text: ["Rename"],
          image: "/themes/vscodePurple/windows/pen-to-square.svg",
        },
        f3: {
          text: ["Find Next"],
          image: "/themes/vscodePurple/windows/magnifying-glass.svg",
        },
        f4: {
          text: ["Find Previous"],
          image: "/themes/vscodePurple/windows/magnifying-glass.svg",
        },
        f5: {
          text: ["Debug"],
          image: "/themes/vscodePurple/windows/bug.svg",
        },
        f6: {
          text: ["Focus Editor"],
          image: "/themes/vscodePurple/windows/pen.svg",
        },
        f7: {
          text: ["Terminal"],
          image: "/themes/vscodePurple/windows/terminal.svg",
        },
        f8: {
          text: ["Problems"],
          image: "/themes/vscodePurple/windows/triangle-exclamation.svg",
        },
        f9: {
          text: ["Breakpoint"],
          image: "/themes/vscodePurple/windows/circle-dot.svg",
        },
        f10: {
          text: ["Menu"],
          image: "/themes/vscodePurple/windows/bars.svg",
        },
        f11: {
          text: ["Full Screen"],
          image: "/themes/vscodePurple/windows/expand.svg",
        },
        f12: {
          text: ["Dev Tools"],
          image: "/themes/vscodePurple/windows/wrench.svg",
        },
      },
    },
    ubuntu: {
      stickers: {
        super: {
          image: "/themes/vscodePurple/ubuntu/circle-dot.svg",
        },
        control: {
          image: "/themes/vscodePurple/ubuntu/circle-dot.svg",
        },
        alt: {
          image: "/themes/vscodePurple/ubuntu/circle-dot.svg",
        },
        c: {
          text: ["Ctrl + C", "Copy"],
          icon: "copy",
          image: "/themes/vscodePurple/ubuntu/copy.svg",
        },
        v: {
          text: ["Ctrl + V", "Paste"],
          icon: "paste",
          image: "/themes/vscodePurple/ubuntu/paste.svg",
        },
        x: {
          text: ["Ctrl + X", "Cut"],
          icon: "cut",
          image: "/themes/vscodePurple/ubuntu/scissors.svg",
        },
        z: {
          text: ["Ctrl + Z", "Undo"],
          icon: "undo",
          image: "/themes/vscodePurple/ubuntu/rotate-left.svg",
        },
        f: {
          text: ["Ctrl + F", "Find"],
          image: "/themes/vscodePurple/ubuntu/magnifying-glass.svg",
        },
        b: {
          text: ["Ctrl + B", "Toggle Sidebar"],
          image: "/themes/vscodePurple/ubuntu/table-columns.svg",
        },
        s: {
          text: ["Ctrl + S", "Save"],
          image: "/themes/vscodePurple/ubuntu/floppy-disk.svg",
        },
        p: {
          text: ["Ctrl + P", "Quick Open"],
          image: "/themes/vscodePurple/ubuntu/folder-open.svg",
        },
        f1: {
          text: ["Help"],
          image: "/themes/vscodePurple/ubuntu/circle-question.svg",
        },
        f2: {
          text: ["Rename"],
          image: "/themes/vscodePurple/ubuntu/pen-to-square.svg",
        },
        f3: {
          text: ["Find Next"],
          image: "/themes/vscodePurple/ubuntu/magnifying-glass.svg",
        },
        f4: {
          text: ["Find Previous"],
          image: "/themes/vscodePurple/ubuntu/magnifying-glass.svg",
        },
        f5: {
          text: ["Debug"],
          image: "/themes/vscodePurple/ubuntu/bug.svg",
        },
        f6: {
          text: ["Focus Editor"],
          image: "/themes/vscodePurple/ubuntu/pen.svg",
        },
        f7: {
          text: ["Terminal"],
          image: "/themes/vscodePurple/ubuntu/terminal.svg",
        },
        f8: {
          text: ["Problems"],
          image: "/themes/vscodePurple/ubuntu/triangle-exclamation.svg",
        },
        f9: {
          text: ["Breakpoint"],
          image: "/themes/vscodePurple/ubuntu/circle-dot.svg",
        },
        f10: {
          text: ["Menu"],
          image: "/themes/vscodePurple/ubuntu/bars.svg",
        },
        f11: {
          text: ["Full Screen"],
          image: "/themes/vscodePurple/ubuntu/expand.svg",
        },
        f12: {
          text: ["Dev Tools"],
          image: "/themes/vscodePurple/ubuntu/wrench.svg",
        },
      },
    },
  },
};
