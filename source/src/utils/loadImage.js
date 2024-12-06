import fs from "fs/promises";
import path from "path";

export async function loadImage(imagePath) {
  try {
    const ext = path.extname(imagePath).slice(1).toLowerCase();
    const fullPath = path.join(process.cwd(), "public", imagePath);

    // For SVGs, return text content
    if (ext === "svg") {
      const content = await fs.readFile(fullPath, "utf8");
      return { content, type: "svg" };
    }

    // For other images, return buffer
    const content = await fs.readFile(fullPath);
    return { content, type: ext };
  } catch (error) {
    console.error("Error loading image:", error);
    return { content: null, type: null };
  }
}
