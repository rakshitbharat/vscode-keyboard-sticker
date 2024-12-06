import fs from "fs/promises";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { themeId } = req.query;
      const { os, keyName } = req.query;

      const form = formidable({
        uploadDir: path.join(process.cwd(), "public/themes", themeId, os),
        keepExtensions: true,
        filename: (name, ext) => `${keyName}${ext}`,
      });

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve([fields, files]);
        });
      });

      const file = files.image;
      const relativePath = `/themes/${themeId}/${os}/${file.newFilename}`;

      res.status(200).json({
        success: true,
        path: relativePath,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
