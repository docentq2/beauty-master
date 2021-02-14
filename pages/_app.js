import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import HeaderApp from "../components/header-app";
import { AuthProvider } from "../components/auth";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <HeaderApp />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
