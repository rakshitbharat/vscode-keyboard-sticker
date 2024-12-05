export const stickerTypes = {
  BASIC: "basic", // Basic VSCode stickers
  INTELLIJ: "intellij", // IntelliJ-style stickers
  SUBLIME: "sublime", // Sublime Text style stickers
  CUSTOM: "custom", // Custom sticker layout
};

export const defaultStickerType = "basic";

// Each sticker config defines which keys should have stickers
export const stickerLayouts = {
  basic: {
    // Key label -> sticker content
    Z: "Undo",
    X: "Cut",
    C: "Copy",
    V: "Paste",
    F: "Find",
    N: "New File",
    S: "Save",
    A: "Select All",
    B: "Toggle Sidebar",
    "/": "Comment",
    P: "Command Palette",
    "[": "Go to Definition",
    "]": "Go Back",
    F1: "Help",
    F5: "Debug",
    F9: "Breakpoint",
    F11: "Full Screen",
    F12: "Dev Tools",
  },
  intellij: {
    // IntelliJ-style stickers
    N: "New",
    E: "Extract",
    R: "Refactor",
    D: "Debug",
    F: "Find",
    G: "Generate",
    T: "Test",
    B: "Build",
    Q: "Quick Fix",
    "[": "Previous",
    "]": "Next",
  },
  sublime: {
    // Sublime Text style stickers
    D: "Duplicate",
    J: "Join Lines",
    L: "Select Line",
    "/": "Comment",
    F: "Find",
    H: "Replace",
    P: "Go to File",
    R: "Go to Symbol",
  },
  custom: {
    // Users can define their own sticker layout
  },
};
