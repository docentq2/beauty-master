import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import HeaderApp from "../components/header-app";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <HeaderApp />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
