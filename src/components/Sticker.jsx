import styled from "styled-components";
import { stickerRegistry } from "@/data/stickerConfigs";
import { useSelector } from "react-redux";
import Image from "next/image";

const StickerContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${(props) => {
    switch (props.$position) {
      case "top-right":
        return `
          top: 4px;
          right: 4px;
        `;
      case "top-left":
        return `
          top: 4px;
          left: 4px;
        `;
      default:
        return `
          top: 4px;
          right: 4px;
        `;
    }
  }}
  z-index: 2;
`;

const StickerItem = styled.div`
  ${(props) => ({ ...props.$style })}
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.65em;
  padding: 2px 4px;
  border-radius: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
  overflow: hidden;
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
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; // Ensure icon color matches text
`;

const Sticker = ({ keyData }) => {
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const selectedConfig = useSelector((state) => state.keyboard.selectedConfig);

  // Comprehensive debug logging
  console.log("Sticker Component:", {
    keyData,
    selectedOS,
    selectedConfig,
    stickerRegistry: {
      available: !!stickerRegistry,
      configs: Object.keys(stickerRegistry || {}),
      selectedConfig: stickerRegistry?.[selectedConfig],
      styles: stickerRegistry?.[selectedConfig]?.styles,
      layout: stickerRegistry?.[selectedConfig]?.layout,
    },
  });

  // Early return if any required data is missing
  if (!keyData?.label || !selectedOS || !selectedConfig || !stickerRegistry) {
    return null;
  }

  // Get the key label and normalize it
  const keyLabel = keyData.label.toLowerCase();
  const currentConfig = stickerRegistry[selectedConfig];

  if (!currentConfig) {
    console.error("Selected config not found:", selectedConfig);
    return null;
  }

  const styles = currentConfig.styles?.[selectedOS];
  const layout = currentConfig.layout;

  if (!styles || !layout) {
    console.error("Missing styles or layout for config:", {
      config: selectedConfig,
      hasStyles: !!styles,
      hasLayout: !!layout,
    });
    return null;
  }

  // Find matching sticker data
  const stickerData = layout[keyLabel];

  if (!stickerData) {
    // console.log("No sticker data for key:", keyLabel);
    return null;
  }

  const texts = Array.isArray(stickerData) ? stickerData : stickerData.text;
  const IconComponent =
    !Array.isArray(stickerData) && stickerData.icon
      ? icons[stickerData.icon]
      : null;

  return (
    <StickerContainer $position={styles.position}>
      {texts.map((text, index) => (
        <StickerItem key={index} $style={styles.style}>
          {IconComponent && (
            <IconWrapper>
              <IconComponent />
            </IconWrapper>
          )}
          {text}
        </StickerItem>
      ))}
    </StickerContainer>
  );
};

export default Sticker;
