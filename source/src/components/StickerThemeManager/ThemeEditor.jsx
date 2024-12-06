import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MediaLibrary } from "@/components/MediaLibrary";
import { updateStickerTheme } from "@/store/slices/stickerThemesSlice";

const OSSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const KeyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const ContributeButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${(props) => props.theme.accent.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ContributeModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.sectionBg};
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
`;

const ThemeEditor = ({ theme, onSave, onBack }) => {
  const [selectedOS, setSelectedOS] = useState("mac");
  const [selectedKey, setSelectedKey] = useState(null);
  const [showContribute, setShowContribute] = useState(false);
  const dispatch = useDispatch();

  const handleStickerUpdate = (keyName, stickerData) => {
    dispatch(
      updateStickerTheme({
        themeId: theme.id,
        os: selectedOS,
        keyName,
        stickerData,
      })
    );
  };

  const handleImageUpload = async (keyName, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `/api/themes/${theme.id}/images?os=${selectedOS}&keyName=${keyName}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      dispatch(
        updateStickerTheme({
          themeId: theme.id,
          os: selectedOS,
          keyName,
          stickerData: {
            type: "image",
            path: data.path,
          },
        })
      );
    }
  };

  return (
    <div>
      <button onClick={onBack}>← Back to Themes</button>
      <h2>Editing: {theme.name}</h2>

      <OSSelector>
        {["mac", "windows", "ubuntu"].map((os) => (
          <button
            key={os}
            onClick={() => setSelectedOS(os)}
            className={selectedOS === os ? "active" : ""}
          >
            {os}
          </button>
        ))}
      </OSSelector>

      <KeyGrid>
        {/* Render keyboard layout for selected OS */}
        {/* When a key is clicked, show MediaLibrary */}
      </KeyGrid>

      {selectedKey && (
        <MediaLibrary
          onSelect={(media) => handleStickerUpdate(selectedKey, media)}
          onClose={() => setSelectedKey(null)}
          initialTab="upload"
          allowedTypes={["image"]}
          maxSize={1024 * 1024} // 1MB
          aspectRatio={1}
          currentValue={theme.osConfigs[selectedOS].stickers[selectedKey]}
        />
      )}

      <button onClick={onSave}>Export Theme</button>

      <ContributeButton onClick={() => setShowContribute(true)}>
        Contribute This Theme
      </ContributeButton>

      {showContribute && (
        <ContributeModal
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>How to Contribute</h3>
          <p>Your theme has been generated at:</p>
          <code>src/data/stickerConfigs/{theme.id}.js</code>
          <p>Images are stored in:</p>
          <code>public/themes/{theme.id}/[os]/</code>
          <p>
            You can now create a pull request with these files to contribute
            your theme to the project!
          </p>
          <button onClick={() => setShowContribute(false)}>Close</button>
        </ContributeModal>
      )}
    </div>
  );
};

export default ThemeEditor;
