import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MediaLibrary } from "@/components/MediaLibrary";
import {
  createStickerTheme,
  updateStickerTheme,
  deleteStickerTheme,
} from "@/store/slices/stickerThemesSlice";

const Container = styled(motion.div)`
  padding: 2rem;
`;

const ThemeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ThemeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ThemeCard = styled.div`
  border: 1px solid
    ${(props) => (props.theme.background.includes("white") ? "#ddd" : "#333")};
  border-radius: 8px;
  padding: 1rem;
  position: relative;
`;

const StickerThemeManager = () => {
  const [activeTheme, setActiveTheme] = useState(null);
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.stickerThemes.themes);

  const handleCreateTheme = (themeData) => {
    dispatch(
      createStickerTheme({
        ...themeData,
        id: Date.now().toString(),
        stickers: {},
        osConfigs: {
          mac: { stickers: {} },
          windows: { stickers: {} },
          ubuntu: { stickers: {} },
        },
      })
    );
  };

  const handleSaveTheme = () => {
    // Generate theme file content
    const themeContent = generateThemeFile(activeTheme);

    // Create zip with images and theme file
    const zip = new JSZip();
    const themeFolder = zip.folder(activeTheme.name);

    // Add theme file
    themeFolder.file(`${activeTheme.id}.js`, themeContent);

    // Add images
    Object.entries(activeTheme.osConfigs).forEach(([os, config]) => {
      const osFolder = themeFolder.folder(os);
      Object.entries(config.stickers).forEach(([keyName, stickerData]) => {
        if (stickerData.type === "image") {
          osFolder.file(`${keyName}.png`, stickerData.imageBlob);
        }
      });
    });

    // Download zip
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeTheme.name}.zip`;
      a.click();
    });
  };

  return (
    <Container>
      <h1>Sticker Theme Manager</h1>

      {!activeTheme ? (
        <>
          <ThemeList>
            {Object.values(themes).map((theme) => (
              <ThemeCard key={theme.id} onClick={() => setActiveTheme(theme)}>
                <h3>{theme.name}</h3>
                <p>{theme.description}</p>
              </ThemeCard>
            ))}
          </ThemeList>

          <ThemeForm onSubmit={handleCreateTheme}>
            {/* Theme creation form */}
          </ThemeForm>
        </>
      ) : (
        <ThemeEditor
          theme={activeTheme}
          onSave={handleSaveTheme}
          onBack={() => setActiveTheme(null)}
        />
      )}
    </Container>
  );
};

export default StickerThemeManager;
