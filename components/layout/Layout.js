import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (router.pathname == "/admin" && !auth) router.push("/");
  }, []);

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
