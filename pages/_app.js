import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "320px",
  md: "890px",
  lg: "960px",
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
      text: "gray.700",
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
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
