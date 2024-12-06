import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/GlobalStyle";
import { useSelector } from "react-redux";
import { themes } from "@/theme/themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { muiTheme } from "@/theme/muiTheme";

// Create a wrapper component that uses Redux hooks
const ThemeWrapper = ({ children }) => {
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const theme = themes[selectedOS] || themes.mac;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={muiTheme}>
          <ThemeWrapper>
            <Component {...pageProps} />
          </ThemeWrapper>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
