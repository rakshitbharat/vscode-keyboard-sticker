"use client";
import styled from "styled-components";
import Key from "./Key";
import {
  mainKeyboardLayout,
  extendedKeyboardLayout,
  numpadLayout,
  getKeyboardLayout,
} from "../data/keyboardData";
import { useSelector } from "react-redux";
import { useState } from "react";
import KeyManagementPopup from "./KeyManagementPopup";

const KeyboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 48px;
  background: ${(props) => props.theme.keyboardBg};
  border-radius: 30px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.5) inset,
    ${(props) => props.theme.brand.shadow};
  border: 1px solid #333;

  @media (max-width: 1400px) {
    padding: 36px;
    gap: 20px;
  }
  @media (max-width: 1200px) {
    padding: 30px;
    gap: 16px;
  }
  @media (max-width: 900px) {
    padding: 24px;
    gap: 12px;
  }
  @media (max-width: 600px) {
    padding: 20px;
    gap: 10px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 40px;
  background: ${(props) => props.theme.sectionBg};
  border-radius: 24px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.2) inset;
  border: 1px solid #2a2a2a;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05)
    );
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% -20%,
      rgba(255, 255, 255, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 1400px) {
    padding: 32px;
  }
  @media (max-width: 1200px) {
    padding: 28px;
  }
  @media (max-width: 900px) {
    padding: 24px;
  }
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  position: relative;

  @media (max-width: 1400px) {
    gap: 8px;
  }
  @media (max-width: 900px) {
    gap: 6px;
  }
`;

const SectionsContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 1400px) {
    gap: 20px;
  }
  @media (max-width: 900px) {
    gap: 16px;
  }
`;

const NumpadSection = styled(Section)`
  & > ${Row}:nth-child(2),
  & > ${Row}:nth-child(4) {
    height: ${(props) => props.$baseSize}px;
    margin-bottom: ${(props) => props.$baseSize}px;
  }
`;

const Keyboard = () => {
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const keyboardLayout = getKeyboardLayout(selectedOS);
  const baseSize = 50;
  const [selectedKey, setSelectedKey] = useState(null);

  const handleKeyClick = (keyData) => {
    setSelectedKey(keyData);
  };

  const handleSaveKey = (updatedKeyData) => {
    // Handle saving the key data with custom sticker
    setSelectedKey(null);
  };

  return (
    <>
      <KeyboardContainer>
        <SectionsContainer>
          {/* Main Keyboard Section */}
          <Section>
            {keyboardLayout.mainKeyboardLayout.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((key, keyIndex) => (
                  <Key
                    key={`${rowIndex}-${keyIndex}`}
                    keyData={key}
                    onClick={handleKeyClick}
                  />
                ))}
              </Row>
            ))}
          </Section>

          {/* Navigation Section */}
          <Section>
            {keyboardLayout.extendedKeyboardLayout.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((key, keyIndex) => (
                  <Key
                    key={`${rowIndex}-${keyIndex}`}
                    keyData={key}
                    onClick={handleKeyClick}
                  />
                ))}
              </Row>
            ))}
          </Section>

          {/* Numpad Section */}
          <NumpadSection $baseSize={baseSize}>
            {keyboardLayout.numpadLayout.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((key, keyIndex) => (
                  <Key
                    key={`${rowIndex}-${keyIndex}`}
                    keyData={key}
                    onClick={handleKeyClick}
                  />
                ))}
              </Row>
            ))}
          </NumpadSection>
        </SectionsContainer>
      </KeyboardContainer>
      {selectedKey && (
        <KeyManagementPopup
          keyData={selectedKey}
          onClose={() => setSelectedKey(null)}
          onSave={handleSaveKey}
        />
      )}
    </>
  );
};

export default Keyboard;
