import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layouts/main";
import theme from "../libs/theme";
import Fonts from "../libs/fonts";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../libs/store/reducer";

// CSS Import
import "../styles/logo.css";
import "../styles/global.css";
import "../styles/card.css";

const store = createStore(reducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
