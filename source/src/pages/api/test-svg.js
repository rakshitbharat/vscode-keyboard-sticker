import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  try {
    // List all SVG files
    const macDir = path.join(process.cwd(), "public/themes/vscodePurple/mac");
    const files = await fs.readdir(macDir);
    const svgFiles = files.filter((f) => f.endsWith(".svg"));

    // Read content of first SVG
    const firstSvg = svgFiles[0];
    const svgPath = path.join(macDir, firstSvg);
    const content = await fs.readFile(svgPath, "utf8");

    res.status(200).json({
      files: svgFiles,
      example: {
        file: firstSvg,
        content,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
