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
    console.log("Loading themes...");
    console.log("All available themes:", allThemes);

    const themes = { ...registry };

    // Load all themes from the index file
    Object.entries(allThemes).forEach(([key, theme]) => {
      console.log(`Processing theme: ${key}`, theme);

      // Skip if it's already in registry or is a default theme
      if (key === "defaultConfig" || key === "types") {
        console.log(`Skipping utility: ${key}`);
        return;
      }

      if (themes[key]) {
        console.log(`Theme already loaded: ${key}`);
        return;
      }

      console.log(`Adding theme: ${key}`);
      themes[key] = theme;
    });

    console.log("Final registry:", themes);
    setRegistry(themes);
  }, []);

  return registry;
};
