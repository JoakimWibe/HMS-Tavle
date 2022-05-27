import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const router = useRouter();
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    if (router.pathname == "/admin" && !auth) router.push("/");
  }, [auth, router]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Box pt={{ lg: 20, md: 32, sm: 20 }}>{children}</Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
