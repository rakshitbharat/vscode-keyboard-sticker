import { useState, useEffect } from "react";
import vscodePurple from "@/data/stickerConfigs/vscodePurple";
import vscodeBlue from "@/data/stickerConfigs/vscodeBlue";
import * as allThemes from "@/data/stickerConfigs";

export const useStickerRegistry = () => {
  const [registry, setRegistry] = useState({
    vscodePurple,
    vscodeBlue,
  });

  useEffect(() => {
    const loadThemes = () => {
      try {
        console.log("Current registry:", registry);
        console.log("All available themes:", allThemes);

        const themes = { ...registry };

        // Load all themes from the index file
        Object.entries(allThemes).forEach(([key, theme]) => {
          console.log(`Processing theme: ${key}`, theme);

          // Skip if it's already in registry or is a default theme
          if (key === "vscodePurple" || key === "vscodeBlue" || themes[key]) {
            console.log(`Skipping theme: ${key}`);
            return;
          }

          // Ensure theme is a valid configuration
          if (theme && theme.id && theme.styles) {
            console.log(`Adding theme: ${key}`);
            themes[key] = theme;
          } else {
            console.warn(`Invalid theme configuration for: ${key}`, theme);
          }
        });

        console.log("Updated registry:", themes);
        setRegistry(themes);
      } catch (error) {
        console.error("Error loading themes:", error);
      }
    };

    loadThemes();
  }, []);

  // Add a useEffect to log when registry changes
  useEffect(() => {
    console.log("Registry updated:", registry);
  }, [registry]);

  return registry;
};
