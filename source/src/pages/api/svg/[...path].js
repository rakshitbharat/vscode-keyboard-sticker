import { loadSvg } from "@/utils/loadSvg";

export default async function handler(req, res) {
  const { path } = req.query;
  const svgPath = Array.isArray(path) ? path.join("/") : path;

  const content = await loadSvg(`/themes/${svgPath}`);

  if (!content) {
    return res.status(404).json({ error: "SVG not found" });
  }

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.send(content);
}
