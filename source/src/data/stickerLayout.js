export const stickerTypes = {
  BASIC: "basic",
  EDITING: "editing",
  TERMINAL: "terminal",
  DEBUG: "debug",
  GIT: "git",
};

export const defaultStickerType = "basic";

// VSCode sticker layouts
export const stickerLayouts = {
  basic: {
    C: ["Copy", "Copy Line"],
    V: ["Paste", "Paste Line"],
    X: ["Cut", "Cut Line"],
    Z: ["Undo", "Undo Last"],
    S: ["Save", "Save All"],
    F: ["Find", "Find in Files"],
    B: ["Toggle Sidebar"],
    P: ["Command Palette"],
  },
  editing: {
    D: ["Duplicate", "Delete Line"],
    L: ["Select Line", "Select All"],
    "/": ["Comment", "Block Comment"],
    H: ["Replace", "Replace All"],
    R: ["Rename Symbol"],
  },
  terminal: {
    J: ["Terminal", "New Terminal"],
    "\\": ["Split Terminal"],
    T: ["New Tab"],
    K: ["Clear"],
  },
  debug: {
    F5: ["Start/Continue"],
    F9: ["Breakpoint"],
    F10: ["Step Over"],
    F11: ["Step Into"],
  },
  git: {
    G: ["Source Control"],
    C: ["Commit"],
    P: ["Push/Pull"],
    M: ["Merge"],
  },
};
