import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${(props) => props.theme.background};
    color: #ffffff;
    min-height: 100vh;
    transition: background 0.3s ease;
  }
`;

export default GlobalStyle;
