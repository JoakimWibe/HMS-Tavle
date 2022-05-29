import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";

import "@fontsource/karla/400.css";
import "@fontsource/karla/700.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/400.css";

const breakpoints = {
  sm: "320px",
  md: "800px",
  lg: "1000px",
  xl: "1200px",
  "2xl": "1536px",
};

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      error: "red.500",
      success: "green.500",
      primary: "#4464A2",
      secondary: "#2A3D63",
      text: "gray.900",
    },
    fonts: {
      heading: "Karla, sans-serif",
      body: "Lato, sans-serif",
    },
  },
  breakpoints,
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
