import { useState } from "react";
import styled from "styled-components";
import ImageEditor from "../ImageEditor";

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
  background: white;
  border-radius: 8px;
  padding: 20px;
  min-width: 500px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#9c27b0" : "#666")};
  border-bottom: 2px solid
    ${(props) => (props.$active ? "#9c27b0" : "transparent")};
  transition: all 0.2s;

  &:hover {
    color: #9c27b0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #9c27b0;
  }
`;

const KeyInfo = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;

  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

const KeyManagementPopup = ({ keyData, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("info");

  const handleSave = (imageData) => {
    onSave?.({
      ...keyData,
      customImage: imageData,
    });
  };

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <TabContainer>
          <Tab
            $active={activeTab === "info"}
            onClick={() => setActiveTab("info")}
          >
            Key Info
          </Tab>
          <Tab
            $active={activeTab === "editor"}
            onClick={() => setActiveTab("editor")}
          >
            Sticker Editor
          </Tab>
        </TabContainer>

        {activeTab === "info" && (
          <KeyInfo>
            <h3>Key Details</h3>
            <p>
              <strong>Label:</strong> {keyData?.label}
            </p>
            <p>
              <strong>Code:</strong> {keyData?.code}
            </p>
            {keyData?.location && (
              <p>
                <strong>Location:</strong> {keyData.location}
              </p>
            )}
          </KeyInfo>
        )}

        {activeTab === "editor" && <ImageEditor onSave={handleSave} />}
      </PopupContent>
    </PopupOverlay>
  );
};

export default KeyManagementPopup;
