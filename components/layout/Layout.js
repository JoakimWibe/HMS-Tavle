import { Box } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Box pt={20}>{children}</Box>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
