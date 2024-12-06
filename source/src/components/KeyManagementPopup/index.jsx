import { useState } from "react";
import styled from "styled-components";
import ClientImageEditor from "../ClientImageEditor";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: ${(props) => props.theme.background || "#1e1e1e"};
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.border || "#3f3f3f"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.text || "#ffffff"};
  font-size: 16px;

  span.key {
    background: ${(props) => props.theme.toolbarBg || "#2d2d2d"};
    padding: 4px 12px;
    border-radius: 4px;
    font-weight: bold;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text || "#ffffff"};
  cursor: pointer;
  font-size: 20px;
  padding: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const EditorContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const KeyManagementPopup = ({ keyData, onClose, onSave }) => {
  const handleSave = (imageData) => {
    onSave?.({
      ...keyData,
      customImage: imageData,
    });
    onClose();
  };

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            Sticker Editor - <span className="key">{keyData?.label}</span>
          </Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <EditorContainer>
          <ClientImageEditor
            onSave={handleSave}
            initialImage={keyData?.customImage}
          />
        </EditorContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default KeyManagementPopup;
