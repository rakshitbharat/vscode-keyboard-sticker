const baseSize = 60;

// Add OS-specific configurations
export const osConfigs = {
  mac: {
    modifierKeys: {
      control: { label: "control" },
      option: { label: "option" },
      command: { label: "command" },
      shift: { label: "shift" },
    },
    specialKeys: {
      delete: { label: "delete" },
      return: { label: "return" },
    },
  },
  windows: {
    modifierKeys: {
      control: { label: "ctrl" },
      option: { label: "alt" },
      command: { label: "win" },
      shift: { label: "shift" },
    },
    specialKeys: {
      delete: { label: "backspace" },
      return: { label: "enter" },
    },
  },
  ubuntu: {
    modifierKeys: {
      control: { label: "ctrl" },
      option: { label: "alt" },
      command: { label: "super" },
      shift: { label: "shift" },
    },
    specialKeys: {
      delete: { label: "backspace" },
      return: { label: "enter" },
    },
  },
};

// Update the keyboard layout generation to use OS-specific labels
export const getKeyboardLayout = (osType) => {
  const config = osConfigs[osType];

  // Create a deep copy of the layouts
  const mainLayout = JSON.parse(JSON.stringify(mainKeyboardLayout));
  const extendedLayout = JSON.parse(JSON.stringify(extendedKeyboardLayout));
  const numLayout = JSON.parse(JSON.stringify(numpadLayout));

  // Update the labels based on OS configuration
  mainLayout.forEach((row) => {
    row.forEach((key) => {
      if (key.label) {
        const lowerLabel = key.label.toLowerCase();
        const modifierKey = Object.keys(config.modifierKeys).find(
          (k) => k === lowerLabel
        );
        if (modifierKey) {
          key.label = config.modifierKeys[modifierKey].label;
        }
        const specialKey = Object.keys(config.specialKeys).find(
          (k) => k === lowerLabel
        );
        if (specialKey) {
          key.label = config.specialKeys[specialKey].label;
        }
      }
    });
  });

  return {
    mainKeyboardLayout: mainLayout,
    extendedKeyboardLayout: extendedLayout,
    numpadLayout: numLayout,
  };
};

// Main keyboard section
export const mainKeyboardLayout = [
  // Function key row
  [
    { label: "esc" },
    { label: "F1" },
    { label: "F2" },
    { label: "F3" },
    { label: "F4" },
    { label: "F5" },
    { label: "F6" },
    { label: "F7" },
    { label: "F8" },
    { label: "F9" },
    { label: "F10" },
    { label: "F11" },
    { label: "F12" },
  ],

  // Number row
  [
    { label: "`\n~" },
    { label: "1\n!" },
    { label: "2\n@" },
    { label: "3\n#" },
    { label: "4\n$" },
    { label: "5\n%" },
    { label: "6\n^" },
    { label: "7\n&" },
    { label: "8\n*" },
    { label: "9\n(" },
    { label: "0\n)" },
    { label: "-\n_" },
    { label: "=\n+" },
    { label: "delete", width: baseSize * 1.5 },
  ],

  // QWERTY row
  [
    { label: "tab", width: baseSize * 1.5 },
    { label: "Q" },
    { label: "W" },
    { label: "E" },
    { label: "R" },
    { label: "T" },
    { label: "Y" },
    { label: "U" },
    { label: "I" },
    { label: "O" },
    { label: "P" },
    { label: "[\n{" },
    { label: "]\n}" },
    { label: "\\\n|", width: baseSize * 1.5 },
  ],

  // Home row
  [
    { label: "caps lock", width: baseSize * 1.75 },
    { label: "A" },
    { label: "S" },
    { label: "D" },
    { label: "F" },
    { label: "G" },
    { label: "H" },
    { label: "J" },
    { label: "K" },
    { label: "L" },
    { label: ";\n:" },
    { label: "'\n\"" },
    { label: "return", width: baseSize * 2.25 },
  ],

  // Shift row
  [
    { label: "shift", width: baseSize * 2.25 },
    { label: "Z" },
    { label: "X" },
    { label: "C" },
    { label: "V" },
    { label: "B" },
    { label: "N" },
    { label: "M" },
    { label: "<\n," },
    { label: ">\n." },
    { label: "?\n/" },
    { label: "shift", width: baseSize * 2.25 },
  ],

  // Bottom row
  [
    { label: "control", width: baseSize * 1.5 },
    { label: "option", width: baseSize * 1.25 },
    { label: "command", width: baseSize * 1.5 },
    { label: "", width: baseSize * 5.5 }, // Space bar
    { label: "command", width: baseSize * 1.5 },
    { label: "option", width: baseSize * 1.25 },
    { label: "control", width: baseSize * 1.5 },
  ],
];

// Extended section (navigation only)
export const extendedKeyboardLayout = [
  // Function keys F13-F19
  [
    { label: "F13" },
    { label: "F14" },
    { label: "F15" },
    { label: "F16" },
    { label: "F17" },
    { label: "F18" },
    { label: "F19" },
  ],

  // Navigation cluster top row
  [
    { label: "fn" },
    { label: "home" },
    { label: "page\nup" },
    { label: "clear" },
  ],

  // Navigation cluster bottom row
  [{ label: "⌦\ndelete" }, { label: "end" }, { label: "page\ndown" }],

  // Arrow keys
  [{ spacer: true, width: baseSize }, { label: "↑" }],
  [{ label: "←" }, { label: "↓" }, { label: "→" }],
];

// Separate numpad layout
export const numpadLayout = [
  // Top row
  [{ label: "=" }, { label: "/" }, { label: "*" }, { label: "-" }],

  // 789 + plus key
  [
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "+", height: baseSize * 2 },
  ],

  // 456
  [{ label: "4" }, { label: "5" }, { label: "6" }],

  // 123 + enter key
  [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "enter", height: baseSize * 2 },
  ],

  // 0.
  [{ label: "0", width: baseSize * 2 }, { label: "." }],
];
