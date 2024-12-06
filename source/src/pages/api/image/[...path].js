import { loadImage } from "@/utils/loadImage";

export default async function handler(req, res) {
  const { path } = req.query;
  const imagePath = Array.isArray(path) ? path.join("/") : path;

  const { content, type } = await loadImage(`/themes/${imagePath}`);

  if (!content) {
    console.error(`Failed to load image: /themes/${imagePath}`);
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

  // For SVGs, send as text; for others, send as buffer
  if (type === "svg") {
    res.send(content);
  } else {
    res.send(Buffer.from(content));
  }
}
