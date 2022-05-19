import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Image, Link, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";
import Logo from "../../public/assets/logo.png";
import ContactForm from "../forms/ContactForm";
import { Dropdown } from "./Dropdown";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [auth, setAuth] = useContext(AuthContext);

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    if (auth) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Box position="fixed" w="100%" bg="white" zIndex={1}>
      <Flex h={20} justifyContent="space-between" alignItems="center" p={5}>
        <NextLink href="/" passHref>
          <Image cursor="pointer" src={Logo.src} alt="HMS-Tavle logo" h={50} />
        </NextLink>
        <Box display={{ sm: "none", md: "flex" }} alignItems="center">
          <NextLink href="/bestselgere" passHref>
            <Link textDecoration={router.pathname === "/bestselgere" ? "underline" : ""} mr={5}>
              Våre bestselgere
            </Link>
          </NextLink>
          <NextLink href="/bygg-hms" passHref>
            <Link textDecoration={router.pathname === "/bygg-hms" ? "underline" : ""} mr={5}>
              Bygg din egen HMS-tavle
            </Link>
          </NextLink>
          <NextLink href="/faq" passHref>
            <Link textDecoration={router.pathname === "/faq" ? "underline" : ""} mr={5}>
              Ofte stilte spørsmål
            </Link>
          </NextLink>
          {isLoggedIn && (
            <NextLink href="/admin" passHref>
              <Link textDecoration={router.pathname === "/admin" ? "underline" : ""} mr={5}>
                Admin
              </Link>
            </NextLink>
          )}
          <Button borderRadius="full" onClick={onOpen} bg="primary" color="white" _hover={{ bg: "secondary" }}>
            Kontakt Oss
          </Button>
        </Box>
        <IconButton
          onClick={toggleDropdown}
          display={{ sm: "flex", md: "none" }}
          aria-label="menu"
          icon={dropdown ? <CloseIcon color="secondary" fontSize={24} /> : <HamburgerIcon color="secondary" fontSize={24} />}
          variant="ghost"
        />
      </Flex>

      {dropdown && <Dropdown />}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ContactForm />
      </Modal>
    </Box>
  );
};

export default Navbar;
