import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
    color: #ffffff;
    min-height: 100vh;
  }
`;

export default GlobalStyle;
