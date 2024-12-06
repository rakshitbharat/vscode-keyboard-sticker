"use client";
import styled from "styled-components";
import Sticker from "./Sticker";
import { useSelector } from "react-redux";
import { useStickerRegistry } from "@/hooks/useStickerRegistry";
import { useState } from "react";
import KeyManagementPopup from "./KeyManagementPopup";

const KeyContainer = styled.div`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  background: linear-gradient(
    180deg,
    rgba(66, 66, 66, 1) 0%,
    rgba(48, 48, 48, 1) 100%
  );
  border: 1px solid #1a1a1a;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  cursor: default;
  position: ${(props) => props.$position || "relative"};
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.15) inset, 0 0 3px rgba(0, 0, 0, 0.3),
    0 4px 7px rgba(0, 0, 0, 0.2), 0 5px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.15s ease;
  z-index: ${(props) => props.$zIndex || "auto"};
  color: #ffffff;
  font-size: ${(props) =>
    props.$label.includes("\n")
      ? "0.8rem"
      : props.$label.length > 2
      ? "0.9rem"
      : "1.2rem"};
  text-align: center;
  line-height: 1.3;
  white-space: pre-line;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.7);
  user-select: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter",
    sans-serif;

  /* Special styling for icon keys */
  ${(props) =>
    props.$label.match(/[⌘⌥⌃⇧↑↓←→]/) &&
    `
    font-size: 1.4rem;
    font-weight: 400;
  `}

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: 2px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.05)
    );
    border-radius: 4px 4px 0 0;
  }

  &:hover {
    background: linear-gradient(
      180deg,
      rgba(76, 76, 76, 1) 0%,
      rgba(58, 58, 58, 1) 100%
    );
    transform: translateY(2px);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.4),
      0 1px 0 rgba(255, 255, 255, 0.15) inset, 0 0 3px rgba(0, 0, 0, 0.3),
      0 3px 5px rgba(0, 0, 0, 0.2), 0 3px 0 rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(5px);
    background: linear-gradient(
      180deg,
      rgba(38, 38, 38, 1) 0%,
      rgba(48, 48, 48, 1) 100%
    );
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.4),
      0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 0 2px rgba(0, 0, 0, 0.3),
      0 0 4px rgba(0, 0, 0, 0.2) inset;
  }
`;

const Spacer = styled.div`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;

const Key = ({ keyData, onClick, style }) => {
  const selectedConfig = useSelector((state) => state.keyboard.selectedConfig);
  const stickerRegistry = useStickerRegistry();

  const baseSize = 60;
  const {
    label = "",
    width = baseSize,
    height = baseSize,
    spacer,
    position,
  } = keyData;

  const handleClick = (e) => {
    e.stopPropagation();
    if (typeof onClick === "function") {
      onClick(keyData);
    }
  };

  if (spacer) {
    return <Spacer $width={width} $height={baseSize} />;
  }

  return (
    <KeyContainer
      onClick={handleClick}
      $width={width}
      $height={height}
      $label={label}
      $position={style?.position}
      $top={style?.top}
      $right={style?.right}
      $zIndex={style?.zIndex}
    >
      {label}
      <Sticker keyData={keyData} />
    </KeyContainer>
  );
};

export default Key;
