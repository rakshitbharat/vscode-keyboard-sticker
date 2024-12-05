// Registry for all sticker configurations
import vscodePurple from "./vscodePurple";
import vscodeBlue from "./vscodeBlue";

const stickerRegistry = {
  vscodePurple,
  vscodeBlue,
  // Add more configs here as they're created
};

export { stickerRegistry };
export const defaultConfig = "vscodePurple";
