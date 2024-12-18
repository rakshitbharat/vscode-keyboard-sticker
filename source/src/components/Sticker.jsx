import styled from "styled-components";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useStickerRegistry } from "@/hooks/useStickerRegistry";
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import ImageEditorModal from "./ImageEditorModal";

const StickerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
`;

const StickerItem = styled.div`
  ${(props) => ({ ...props.$style })}
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.6em;
  padding: 1px 3px;
  border-radius: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
  line-height: 1.2;
`;

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);

const PasteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z" />
  </svg>
);

const icons = {
  copy: CopyIcon,
  paste: PasteIcon,
  cut: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z" />
    </svg>
  ),
  undo: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
    </svg>
  ),
};

const IconWrapper = styled.div`
  width: 10px;
  height: 10px;
  min-width: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const StickerImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: inherit;
  opacity: 0.9;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const StickerSVG = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0.9;
  transition: all 0.2s ease;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StickerComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Sticker = ({ keyData }) => {
  const [svgContent, setSvgContent] = useState(null);
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const selectedConfig = useSelector((state) => state.keyboard.selectedConfig);
  const stickerRegistry = useStickerRegistry();
  const [showEditor, setShowEditor] = useState(false);
  const [customImage, setCustomImage] = useState(null);

  // Get theme and sticker data
  const { theme, stickerData } = useMemo(() => {
    if (!keyData?.label || !selectedOS || !selectedConfig || !stickerRegistry) {
      return { theme: null, stickerData: null };
    }

    const theme = stickerRegistry[selectedConfig];
    if (!theme) return { theme: null, stickerData: null };

    const stickerData =
      theme.osConfigs?.[selectedOS]?.stickers?.[keyData.label.toLowerCase()];

    return { theme, stickerData };
  }, [keyData?.label, selectedOS, selectedConfig, stickerRegistry]);

  // Load SVG content
  useEffect(() => {
    const loadSvg = async () => {
      if (!stickerData?.image) return;

      try {
        const path = stickerData.image.replace(/^\/themes\//, "");
        const response = await fetch(`/api/image/${path}`);
        if (response.ok) {
          const content = await response.text();
          setSvgContent(content);
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSvg();
  }, [stickerData?.image]);

  // Early return if no data
  if (!theme || !stickerData) return null;

  // If it's an image sticker
  if (stickerData.image) {
    const isSvg = stickerData.image.endsWith(".svg");

    if (isSvg && svgContent) {
      return (
        <StickerContainer>
          <StickerSVG dangerouslySetInnerHTML={{ __html: svgContent }} />
        </StickerContainer>
      );
    }

    return (
      <StickerContainer>
        <StickerSVG>
          <img
            src={stickerData.image}
            alt={stickerData.text || keyData.label}
            style={{
              pointerEvents: "none",
              userSelect: "none",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </StickerSVG>
      </StickerContainer>
    );
  }

  // For text and icon stickers
  const texts = Array.isArray(stickerData) ? stickerData : stickerData.text;
  if (!texts) return null;

  const iconName = !Array.isArray(stickerData) ? stickerData.icon : null;
  const Icon = iconName ? icons[iconName] : null;

  const truncateText = (text) => {
    if (text.length > 12) {
      return text.slice(0, 10) + "...";
    }
    return text;
  };

  const handleSaveImage = (dataURL) => {
    setCustomImage(dataURL);
    setShowEditor(false);
  };

  return (
    <>
      <StickerContainer onClick={() => setShowEditor(true)}>
        {customImage ? (
          <StickerSVG>
            <img
              src={customImage}
              alt="Custom sticker"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </StickerSVG>
        ) : (
          texts.map((text, index) => (
            <StickerItem key={index} $style={theme.styles[selectedOS].style}>
              {Icon && (
                <IconWrapper>
                  <Icon />
                </IconWrapper>
              )}
              {truncateText(text)}
            </StickerItem>
          ))
        )}
      </StickerContainer>

      {showEditor && (
        <ImageEditorModal
          onClose={() => setShowEditor(false)}
          onSave={handleSaveImage}
        />
      )}
    </>
  );
};

export default Sticker;
