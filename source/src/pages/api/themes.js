import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const themeData = req.body;

      // Read template file
      const templatePath = path.join(
        process.cwd(),
        "src/data/stickerConfigs/template.js"
      );

      // Check if template exists
      try {
        await fs.access(templatePath);
      } catch (error) {
        throw new Error("Template file not found");
      }

      let templateContent = await fs.readFile(templatePath, "utf8");

      // Replace placeholders
      templateContent = templateContent
        .replace(/THEME_ID/g, themeData.id)
        .replace(/THEME_NAME/g, themeData.name)
        .replace(/THEME_DESCRIPTION/g, themeData.description || "")
        .replace(/THEME_AUTHOR/g, themeData.author);

      // Create directories
      const publicThemePath = path.join(
        process.cwd(),
        "public/themes",
        themeData.id
      );
      const configPath = path.join(
        process.cwd(),
        "src/data/stickerConfigs",
        `${themeData.id}.js`
      );

      // Create directories
      await fs.mkdir(path.join(process.cwd(), "public/themes"), {
        recursive: true,
      });
      await fs.mkdir(publicThemePath, { recursive: true });

      // Create OS-specific directories
      await Promise.all([
        fs.mkdir(path.join(publicThemePath, "mac"), { recursive: true }),
        fs.mkdir(path.join(publicThemePath, "windows"), { recursive: true }),
        fs.mkdir(path.join(publicThemePath, "ubuntu"), { recursive: true }),
      ]);

      // Write theme file
      await fs.writeFile(configPath, templateContent);

      // Update index file
      const indexPath = path.join(
        process.cwd(),
        "src/data/stickerConfigs/index.js"
      );
      let indexContent = await fs.readFile(indexPath, "utf8");
      const exportStatement = `export { default as ${themeData.id} } from "./${themeData.id}";\n`;

      // Add new export if it doesn't exist
      if (!indexContent.includes(exportStatement)) {
        indexContent += exportStatement;
        await fs.writeFile(indexPath, indexContent);
      }

      console.log("Theme file created:", configPath);
      console.log("Index file updated with:", exportStatement);

      // Add verification
      try {
        const newThemeContent = await fs.readFile(configPath, "utf8");
        console.log("New theme content:", newThemeContent);

        const newIndexContent = await fs.readFile(indexPath, "utf8");
        console.log("Updated index content:", newIndexContent);
      } catch (error) {
        console.error("Verification failed:", error);
      }

      res.status(200).json({
        success: true,
        themeId: themeData.id,
        message: "Theme created successfully",
      });
    } catch (error) {
      console.error("Error creating theme:", error);
      res.status(500).json({
        error: "Failed to create theme",
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
