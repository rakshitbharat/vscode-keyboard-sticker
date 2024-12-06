import { loadImage } from "@/utils/loadImage";

export default async function handler(req, res) {
  const { path } = req.query;
  const svgPath = Array.isArray(path) ? path.join("/") : path;

  const { content, type } = await loadImage(`/themes/${svgPath}`);

  if (!content) {
    return res.status(404).json({ error: "Image not found" });
  }

  const contentType =
    {
      svg: "image/svg+xml",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
    }[type] || "application/octet-stream";

  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.send(content);
}
