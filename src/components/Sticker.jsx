import styled from "styled-components";
import {
  stickerConfigs,
  defaultOS,
  defaultStickerType,
} from "@/data/stickerConfigs";
import { useSelector } from "react-redux";

const StickerContainer = styled.div`
  position: absolute;
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
  ${(props) => ({ ...props.$style })}
`;

const Sticker = ({ shortcut }) => {
  const selectedOS =
    useSelector((state) => state.keyboard.selectedOS) || defaultOS;
  const stickerType =
    useSelector((state) => state.keyboard.stickerType) || defaultStickerType;

  if (
    !shortcut ||
    !stickerConfigs[stickerType] ||
    !stickerConfigs[stickerType][selectedOS]
  ) {
    return null;
  }

  const config = stickerConfigs[stickerType][selectedOS];

  return (
    <StickerContainer $position={config.position} $style={config.style}>
      {shortcut}
    </StickerContainer>
  );
};

export default Sticker;
