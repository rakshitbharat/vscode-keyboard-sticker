import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/GlobalStyle";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { themes } from "@/theme/themes";
import { useSelector } from "react-redux";

// Create a wrapper component that uses Redux hooks
const ThemeWrapper = ({ children }) => {
  const selectedOS = useSelector((state) => state.keyboard.selectedOS);
  const theme = themes[selectedOS];

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
