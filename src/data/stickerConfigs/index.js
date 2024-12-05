// Registry for all sticker configurations
import vscodePurple from "./vscodePurple";
import vscodeBlue from "./vscodeBlue";
import { defaultConfig } from "./types";

// Initialize registry immediately
const registry = {
  vscodePurple,
  vscodeBlue,
};

// Export as a frozen object to prevent modifications
export const stickerRegistry = Object.freeze(registry);
export { defaultConfig };

// Debug logs
console.log("stickerRegistry initialized with configs:", Object.keys(registry));
