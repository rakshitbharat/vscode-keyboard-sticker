import styled from "styled-components";
import Keyboard from "@/components/Keyboard";
import Header from "@/components/Header";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  overflow-x: auto;
  overflow-y: auto;

  @media (max-width: 900px) {
    padding: 1rem 0.5rem;
  }
`;

const KeyboardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <PageContainer>
      <Header />
      <KeyboardContainer>
        <Keyboard />
      </KeyboardContainer>
    </PageContainer>
  );
}
