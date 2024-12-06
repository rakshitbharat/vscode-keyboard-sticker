import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/GlobalStyle";
import { useSelector } from "react-redux";
import { themes } from "@/theme/themes";

// Create a wrapper component that uses Redux hooks
const ThemeWrapper = ({ children }) => {
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const theme = themes[selectedOS] || themes.mac; // Fallback to mac theme if selectedOS is undefined

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
        <ThemeWrapper>
          <Component {...pageProps} />
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
