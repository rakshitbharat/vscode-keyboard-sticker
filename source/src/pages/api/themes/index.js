import fs from "fs/promises";
import path from "path";
import { generateThemeFile } from "@/utils/themeGenerator";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const themeData = req.body;

      // Create theme directory in public folder
      const publicThemePath = path.join(
        process.cwd(),
        "public",
        "themes",
        themeData.id
      );
      await fs.mkdir(publicThemePath, { recursive: true });

      // Create OS-specific folders
      await Promise.all(
        ["mac", "windows", "ubuntu"].map((os) =>
          fs.mkdir(path.join(publicThemePath, os), { recursive: true })
        )
      );

      // Generate and save theme file
      const themeContent = generateThemeFile(themeData);
      const configPath = path.join(
        process.cwd(),
        "src/data/stickerConfigs",
        `${themeData.id}.js`
      );
      await fs.writeFile(configPath, themeContent);

      // Update index.js to include new theme
      await updateConfigIndex(themeData.id);

      res.status(200).json({ success: true, themeId: themeData.id });
    } catch (error) {
      console.error("Error creating theme:", error);
      res.status(500).json({ error: "Failed to create theme" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function updateConfigIndex(themeId) {
  const indexPath = path.join(
    process.cwd(),
    "src/data/stickerConfigs/index.js"
  );
  const content = await fs.readFile(indexPath, "utf8");

  const newExport = `export { default as ${themeId} } from "./${themeId}";`;
  const updatedContent = content + "\n" + newExport;

  await fs.writeFile(indexPath, updatedContent);
}
