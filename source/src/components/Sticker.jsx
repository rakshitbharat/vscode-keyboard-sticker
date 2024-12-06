import styled from "styled-components";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useStickerRegistry } from "@/hooks/useStickerRegistry";

const StickerContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
  ${(props) => {
    switch (props.$position) {
      case "top-right":
        return `
          top: 2px;
          right: 2px;
          max-width: calc(100% - 4px);
        `;
      case "top-left":
        return `
          top: 2px;
          left: 2px;
          max-width: calc(100% - 4px);
        `;
      default:
        return `
          top: 2px;
          right: 2px;
          max-width: calc(100% - 4px);
        `;
    }
  }}
  z-index: 2;
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
  // Add other icons...
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

const StickerImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  opacity: 0.9;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Sticker = ({ keyData }) => {
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const selectedConfig = useSelector((state) => state.keyboard.selectedConfig);
  const stickerRegistry = useStickerRegistry();
  const customStickers = useSelector((state) => state.keyboard.customStickers);

  if (!keyData?.label || !selectedOS || !selectedConfig || !stickerRegistry) {
    return null;
  }

  const keyLabel = keyData.label.toLowerCase();
  const currentConfig = stickerRegistry[selectedConfig];

  if (!currentConfig) {
    return null;
  }

  const styles = currentConfig.styles?.[selectedOS];
  const layout = currentConfig.layout;

  const stickerData = layout[selectedOS]?.[keyLabel] || layout[keyLabel];

  if (!styles || !stickerData) {
    return null;
  }

  const customSticker = customStickers[keyData.label];
  if (customSticker?.type === "image") {
    return <StickerImage src={customSticker.url} alt={keyData.label} />;
  }

  const texts = Array.isArray(stickerData) ? stickerData : stickerData.text;
  const IconComponent =
    !Array.isArray(stickerData) && stickerData.icon
      ? icons[stickerData.icon]
      : null;

  const truncateText = (text) => {
    if (text.length > 12) {
      return text.slice(0, 10) + "...";
    }
    return text;
  };

  return (
    <StickerContainer $position={styles.position}>
      {texts.map((text, index) => (
        <StickerItem key={index} $style={styles.style}>
          {IconComponent && (
            <IconWrapper>
              <IconComponent />
            </IconWrapper>
          )}
          {truncateText(text)}
        </StickerItem>
      ))}
    </StickerContainer>
  );
};

export default Sticker;
