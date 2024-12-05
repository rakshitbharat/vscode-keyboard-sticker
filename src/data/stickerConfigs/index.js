// Registry for all sticker configurations
import vscodePurple from "./vscodePurple";
import vscodeBlue from "./vscodeBlue";

// Export as a named constant to ensure it's available immediately
export const stickerRegistry = {
  vscodePurple,
  vscodeBlue,
};

// Export default config
export const defaultConfig = "vscodePurple";

// Export individual configs for direct access if needed
export { vscodePurple, vscodeBlue };
