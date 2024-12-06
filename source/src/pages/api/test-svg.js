import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  try {
    const svgPath = path.join(
      process.cwd(),
      "public/themes/vscodePurple/mac/copy.svg"
    );
    const exists = await fs
      .access(svgPath)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      res.status(404).json({ error: "SVG file not found" });
      return;
    }

    const content = await fs.readFile(svgPath, "utf8");
    res.status(200).json({
      exists: true,
      path: svgPath,
      content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
