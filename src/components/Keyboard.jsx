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

const KeyboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(145deg, #1a1a1a, #222);
  border-radius: 24px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.5) inset;

  @media (max-width: 1400px) {
    padding: 30px;
    gap: 15px;
  }
  @media (max-width: 1200px) {
    padding: 25px;
    gap: 12px;
  }
  @media (max-width: 900px) {
    padding: 20px;
    gap: 10px;
  }
  @media (max-width: 600px) {
    padding: 15px;
    gap: 8px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px;
  background: linear-gradient(135deg, #2a2a2a, #252525);
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2) inset;
  border: 1px solid #1a1a1a;
  position: relative;

  @media (max-width: 1400px) {
    padding: 24px;
  }
  @media (max-width: 1200px) {
    padding: 20px;
  }
  @media (max-width: 900px) {
    padding: 16px;
  }
  @media (max-width: 600px) {
    padding: 12px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05)
    );
    border-radius: 16px 16px 0 0;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  position: relative;

  @media (max-width: 1400px) {
    gap: 6px;
  }
  @media (max-width: 900px) {
    gap: 4px;
  }
`;

const SectionsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 1400px) {
    gap: 15px;
  }
  @media (max-width: 900px) {
    gap: 10px;
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

  return (
    <KeyboardContainer>
      <SectionsContainer>
        {/* Main Keyboard Section */}
        <Section>
          {keyboardLayout.mainKeyboardLayout.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((key, keyIndex) => (
                <Key key={`${rowIndex}-${keyIndex}`} keyData={key} />
              ))}
            </Row>
          ))}
        </Section>

        {/* Navigation Section */}
        <Section>
          {keyboardLayout.extendedKeyboardLayout.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((key, keyIndex) => (
                <Key key={`${rowIndex}-${keyIndex}`} keyData={key} />
              ))}
            </Row>
          ))}
        </Section>

        {/* Numpad Section */}
        <NumpadSection $baseSize={baseSize}>
          {keyboardLayout.numpadLayout.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((key, keyIndex) => (
                <Key key={`${rowIndex}-${keyIndex}`} keyData={key} />
              ))}
            </Row>
          ))}
        </NumpadSection>
      </SectionsContainer>
    </KeyboardContainer>
  );
};

export default Keyboard;
