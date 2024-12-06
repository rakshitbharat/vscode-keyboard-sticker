import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ImageUploader from "./ImageUploader";
import StickerPreview from "./StickerPreview";
import {
  STICKER_CONSTRAINTS,
  STICKER_POSITIONS,
} from "@/data/stickerConfigs/types";

const Container = styled(motion.div)`
  background: ${(props) => props.theme.sectionBg};
  border-radius: 16px;
  padding: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: ${(props) =>
    props.theme.background.includes("white") ? "#333" : "#fff"};
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ExportButton = styled(motion.button)`
  background: ${(props) => props.theme.accent.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 2rem;

  &:hover {
    background: ${(props) => props.theme.accent.secondary};
  }
`;

const StickerManager = () => {
  const [stickerConfig, setStickerConfig] = useState({
    name: "",
    description: "",
    author: "",
    version: "1.0.0",
    stickers: {}, // { keyName: { image: File, position: string } }
  });

  const handleImageUpload = (keyName, file, position) => {
    setStickerConfig((prev) => ({
      ...prev,
      stickers: {
        ...prev.stickers,
        [keyName]: {
          image: file,
          position: position || "top-right",
        },
      },
    }));
  };

  const handleExport = async () => {
    // Create a zip file with images and config
    const zip = new JSZip();
    const configFolder = zip.folder(stickerConfig.name);

    // Add images
    for (const [keyName, data] of Object.entries(stickerConfig.stickers)) {
      const imageBlob = await fetch(URL.createObjectURL(data.image)).then((r) =>
        r.blob()
      );
      configFolder.file(`${keyName}.png`, imageBlob);
    }

    // Create config file
    const config = {
      ...stickerConfig,
      stickers: Object.entries(stickerConfig.stickers).reduce(
        (acc, [key, data]) => ({
          ...acc,
          [key]: {
            image: `${key}.png`,
            position: data.position,
          },
        }),
        {}
      ),
    };

    configFolder.file("config.json", JSON.stringify(config, null, 2));

    // Generate and download zip
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${stickerConfig.name}.zip`;
    a.click();
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Title>Sticker Manager</Title>
      <Grid>
        <ImageUploader
          onUpload={handleImageUpload}
          constraints={STICKER_CONSTRAINTS}
          positions={STICKER_POSITIONS}
        />
        <StickerPreview
          stickers={stickerConfig.stickers}
          onRemove={(keyName) => {
            const newStickers = { ...stickerConfig.stickers };
            delete newStickers[keyName];
            setStickerConfig((prev) => ({ ...prev, stickers: newStickers }));
          }}
        />
      </Grid>
      <ExportButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExport}
      >
        Export Sticker Pack
      </ExportButton>
    </Container>
  );
};

export default StickerManager;
