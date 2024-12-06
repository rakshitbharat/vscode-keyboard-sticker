export const shortcutTypes = {
  BASIC: "basic", // Basic editing shortcuts
  NAVIGATION: "navigation", // Navigation and search shortcuts
  GIT: "git", // Git related shortcuts
  DEBUG: "debug", // Debugging shortcuts
};

export const defaultShortcutType = "basic";

export const shortcutConfigs = {
  basic: {
    mac: {
      "⌘X": "Cut line",
      "⌘C": "Copy line",
      "⌘V": "Paste",
      "⌘Z": "Undo",
      "⌘S": "Save",
      "⌘B": "Toggle sidebar",
    },
    windows: {
      "Ctrl+X": "Cut line",
      "Ctrl+C": "Copy line",
      "Ctrl+V": "Paste",
      "Ctrl+Z": "Undo",
      "Ctrl+S": "Save",
      "Ctrl+B": "Toggle sidebar",
    },
    ubuntu: {
      "Ctrl+X": "Cut line",
      "Ctrl+C": "Copy line",
      "Ctrl+V": "Paste",
      "Ctrl+Z": "Undo",
      "Ctrl+S": "Save",
      "Ctrl+B": "Toggle sidebar",
    },
  },
  navigation: {
    mac: {
      "⌘P": "Quick open",
      "⌘⇧P": "Command palette",
      "⌘⇧O": "Go to symbol",
      "⌘⇧F": "Find in files",
    },
    windows: {
      "Ctrl+P": "Quick open",
      "Ctrl+Shift+P": "Command palette",
      "Ctrl+Shift+O": "Go to symbol",
      "Ctrl+Shift+F": "Find in files",
    },
    ubuntu: {
      "Ctrl+P": "Quick open",
      "Ctrl+Shift+P": "Command palette",
      "Ctrl+Shift+O": "Go to symbol",
      "Ctrl+Shift+F": "Find in files",
    },
  },
  git: {
    mac: {
      "⌘⇧G": "Source control",
      "⌘Enter": "Stage changes",
      "⌘⇧Enter": "Commit",
    },
    windows: {
      "Ctrl+Shift+G": "Source control",
      "Ctrl+Enter": "Stage changes",
      "Ctrl+Shift+Enter": "Commit",
    },
    ubuntu: {
      "Ctrl+Shift+G": "Source control",
      "Ctrl+Enter": "Stage changes",
      "Ctrl+Shift+Enter": "Commit",
    },
  },
  debug: {
    mac: {
      F5: "Start/Continue",
      "⇧F5": "Stop",
      F9: "Toggle breakpoint",
      F10: "Step over",
      F11: "Step into",
    },
    windows: {
      F5: "Start/Continue",
      "Shift+F5": "Stop",
      F9: "Toggle breakpoint",
      F10: "Step over",
      F11: "Step into",
    },
    ubuntu: {
      F5: "Start/Continue",
      "Shift+F5": "Stop",
      F9: "Toggle breakpoint",
      F10: "Step over",
      F11: "Step into",
    },
  },
};
