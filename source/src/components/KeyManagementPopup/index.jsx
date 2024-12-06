import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import { HexColorPicker } from "react-colorful";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "react-image-crop/dist/ReactCrop.css";
import { setKeySticker, removeKeySticker } from "@/store/slices/keyboardSlice";
import { STICKER_CONSTRAINTS } from "@/data/stickerConfigs/types";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled(motion.div)`
  background: ${(props) => props.theme.sectionBg};
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  position: relative;
  color: ${(props) =>
    props.theme.background.includes("white") ? "#333" : "#fff"};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  margin: 0 0 2rem;
  font-size: 1.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${(props) =>
    props.$active ? props.theme.accent.primary : "transparent"};
  color: ${(props) => (props.$active ? "#fff" : "inherit")};
  border: 1px solid
    ${(props) => (props.$active ? props.theme.accent.primary : "currentColor")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.$active ? props.theme.accent.primary : "rgba(255, 255, 255, 0.1)"};
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$primary
      ? `
    background: ${props.theme.accent.primary};
    color: white;
    border: none;

    &:hover {
      background: ${props.theme.accent.secondary};
    }
  `
      : `
    background: transparent;
    color: inherit;
    border: 1px solid currentColor;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `}
`;

const DropzoneArea = styled.div`
  border: 2px dashed
    ${(props) => (props.isDragActive ? props.theme.accent.primary : "#666")};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: ${(props) =>
    props.isDragActive ? `${props.theme.accent.primary}0a` : "transparent"};
`;

const EditingTools = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const Tool = styled.button`
  padding: 0.5rem;
  border: 1px solid currentColor;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: ${(props) => props.theme.accent.primary};
    color: white;
    border-color: ${(props) => props.theme.accent.primary};
  }
`;

const ColorPickerContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${(props) => props.theme.sectionBg};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const KeyManagementPopup = ({ open, onClose, keyData }) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState();
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editingMode, setEditingMode] = useState("crop"); // crop, adjust, background
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage({
            file,
            preview: reader.result,
            backgroundColor,
          });
        };
        reader.readAsDataURL(file);
      }
    },
    [backgroundColor]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: STICKER_CONSTRAINTS.maxSize,
  });

  const handleSave = () => {
    if (selectedImage) {
      // Apply crop, background color, and other edits
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = STICKER_CONSTRAINTS.dimensions.width;
        canvas.height = STICKER_CONSTRAINTS.dimensions.height;

        // Draw background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw cropped image
        if (crop) {
          ctx.drawImage(
            img,
            (crop.x * img.width) / 100,
            (crop.y * img.height) / 100,
            (crop.width * img.width) / 100,
            (crop.height * img.height) / 100,
            0,
            0,
            canvas.width,
            canvas.height
          );
        } else {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        const finalImage = canvas.toDataURL("image/png");
        dispatch(
          setKeySticker({
            keyLabel: keyData.label,
            stickerData: {
              type: "image",
              url: finalImage,
              backgroundColor,
            },
          })
        );
        onClose();
      };

      img.src = selectedImage.preview;
    }
  };

  const handleRemove = () => {
    dispatch(removeKeySticker(keyData.label));
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <PopupContainer
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>×</CloseButton>
          <Title>Customize Key: {keyData.label}</Title>

          <TabContainer>
            <Tab
              $active={activeTab === "upload"}
              onClick={() => setActiveTab("upload")}
            >
              Upload Image
            </Tab>
            <Tab
              $active={activeTab === "gallery"}
              onClick={() => setActiveTab("gallery")}
            >
              Gallery
            </Tab>
          </TabContainer>

          {activeTab === "upload" && (
            <>
              <DropzoneArea {...getRootProps()} isDragActive={isDragActive}>
                <input {...getInputProps()} />
                <p>Drag & drop an image here, or click to select</p>
                <small>
                  {STICKER_CONSTRAINTS.dimensions.width}x
                  {STICKER_CONSTRAINTS.dimensions.height}px, max{" "}
                  {Math.round(STICKER_CONSTRAINTS.maxSize / 1024)}KB
                </small>
              </DropzoneArea>

              {selectedImage && (
                <>
                  <EditingTools>
                    <Tool
                      className={editingMode === "crop" ? "active" : ""}
                      onClick={() => setEditingMode("crop")}
                    >
                      Crop
                    </Tool>
                    <Tool
                      className={editingMode === "background" ? "active" : ""}
                      onClick={() => setEditingMode("background")}
                    >
                      Background
                    </Tool>
                    <Tool
                      className={editingMode === "adjust" ? "active" : ""}
                      onClick={() => setEditingMode("adjust")}
                    >
                      Adjust
                    </Tool>
                  </EditingTools>

                  <TransformWrapper>
                    <TransformComponent>
                      {editingMode === "crop" ? (
                        <ReactCrop
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          aspect={1}
                        >
                          <img src={selectedImage.preview} alt="Crop preview" />
                        </ReactCrop>
                      ) : (
                        <ImagePreview style={{ backgroundColor }}>
                          <img src={selectedImage.preview} alt="Preview" />
                        </ImagePreview>
                      )}
                    </TransformComponent>
                  </TransformWrapper>

                  {editingMode === "background" && (
                    <div style={{ position: "relative" }}>
                      <Tool
                        onClick={() => setShowColorPicker(!showColorPicker)}
                      >
                        Pick Background Color
                      </Tool>
                      {showColorPicker && (
                        <ColorPickerContainer
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <HexColorPicker
                            color={backgroundColor}
                            onChange={setBackgroundColor}
                          />
                        </ColorPickerContainer>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <ActionButtons>
            <Button onClick={handleRemove}>Remove Sticker</Button>
            <Button $primary onClick={handleSave} disabled={!selectedImage}>
              Apply Sticker
            </Button>
          </ActionButtons>
        </PopupContainer>
      </Overlay>
    </AnimatePresence>
  );
};

export default KeyManagementPopup;
