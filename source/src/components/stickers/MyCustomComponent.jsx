import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  border-radius: 4px;
  color: white;
  font-size: 0.8em;
  padding: 4px;

  &:hover {
    background: linear-gradient(45deg, #ff8e53, #ff6b6b);
  }
`;

const MyCustomComponent = () => (
  <Container>
    <span>⚡️</span>
  </Container>
);

export default MyCustomComponent;
