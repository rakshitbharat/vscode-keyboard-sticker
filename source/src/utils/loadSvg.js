import fs from "fs/promises";
import path from "path";

export async function loadSvg(svgPath) {
  try {
    const fullPath = path.join(process.cwd(), "public", svgPath);
    const content = await fs.readFile(fullPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error loading SVG:", error);
    return null;
  }
}
