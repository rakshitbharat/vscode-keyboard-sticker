"use client";
import styled from "styled-components";

const KeyContainer = styled.div`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  background: linear-gradient(to bottom, #363636 0%, #2d2d2d 40%, #2b2b2b 100%);
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  cursor: default;
  position: ${(props) => props.$position || "relative"};
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.1) inset,
    0 0 3px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.2),
    0 4px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.1s ease;
  z-index: ${(props) => props.$zIndex || "auto"};
  color: #ffffff;
  font-size: ${(props) =>
    props.$label.includes("\n")
      ? "0.6rem"
      : props.$label.length > 2
      ? "0.7rem"
      : "0.9rem"};
  text-align: center;
  line-height: 1.2;
  white-space: pre-line;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.7);
  user-select: none;

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
      to bottom,
      #3f3f3f 0%,
      #363636 40%,
      #333333 100%
    );
    transform: translateY(2px);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.4),
      0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 0 3px rgba(0, 0, 0, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(4px);
    background: linear-gradient(
      to bottom,
      #2d2d2d 0%,
      #282828 40%,
      #252525 100%
    );
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.4),
      0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 0 2px rgba(0, 0, 0, 0.3),
      0 0 4px rgba(0, 0, 0, 0.2) inset;
  }
`;

const Spacer = styled.div`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;

const Key = ({ keyData, style }) => {
  const baseSize = 50;
  const {
    label,
    width = baseSize,
    height = baseSize,
    spacer,
    position,
  } = keyData;

  if (spacer) {
    return <Spacer $width={width} $height={baseSize} />;
  }

  return (
    <KeyContainer
      $width={width}
      $height={height}
      $label={label}
      $position={style?.position}
      $top={style?.top}
      $right={style?.right}
      $zIndex={style?.zIndex}
    >
      {label}
    </KeyContainer>
  );
};

export default Key;
