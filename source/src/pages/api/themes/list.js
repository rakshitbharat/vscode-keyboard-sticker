import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const configsDir = path.join(process.cwd(), "src/data/stickerConfigs");
      const files = await fs.readdir(configsDir);

      const themes = {};

      for (const file of files) {
        // Skip non-theme files
        if (
          file === "index.js" ||
          file === "types.js" ||
          file === "template.js" ||
          !file.endsWith(".js")
        ) {
          continue;
        }

        try {
          // Get theme name from filename
          const themeName = file.replace(".js", "");

          // Import theme dynamically
          const themeModule = await import(
            `@/data/stickerConfigs/${themeName}`
          );
          const theme = themeModule.default;

          // Validate theme structure
          if (theme && theme.id && theme.name) {
            themes[themeName] = theme;
            console.log(`Loaded theme: ${themeName}`, theme);
          } else {
            console.warn(`Invalid theme structure in ${file}`);
          }
        } catch (error) {
          console.error(`Error loading theme ${file}:`, error);
        }
      }

      // Log all loaded themes
      console.log("All loaded themes:", Object.keys(themes));

      res.status(200).json({ themes });
    } catch (error) {
      console.error("Error listing themes:", error);
      res.status(500).json({ error: "Failed to list themes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
