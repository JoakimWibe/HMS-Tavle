import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Image, Link, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Logo from "../../public/assets/logo.png";
import ContactForm from "../forms/ContactForm";
import { Dropdown } from "./Dropdown";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth] = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    if (auth) {
      setIsLoggedIn(true);
    }
  }, [auth]);

  return (
    <Box position="fixed" w="100%" bg="white" zIndex={1} boxShadow={"md"}>
      <Flex
        direction={{ lg: "row", md: "column", sm: "row" }}
        h={{ lg: 20, md: 32, sm: 20 }}
        justifyContent="space-between"
        alignItems="center"
        p={5}
      >
        <NextLink href="/" passHref>
          <Image cursor="pointer" src={Logo.src} alt="HMS-Tavle logo" h={50} mb={{ lg: 0, md: 2, sm: 0 }} />
        </NextLink>
        <Box display={{ sm: "none", md: "flex" }} alignItems="center">
          <NextLink href="/" passHref>
            <Link _hover={{ color: "primary" }} color={router.pathname === "/" ? "primary" : ""} mr={5}>
              Hjem
            </Link>
          </NextLink>
          <NextLink href="/bestselgere" passHref>
            <Link _hover={{ color: "primary" }} color={router.pathname === "/bestselgere" ? "primary" : ""} mr={5}>
              Våre bestselgere
            </Link>
          </NextLink>
          <NextLink href="/bygg-hms" passHref>
            <Link _hover={{ color: "primary" }} color={router.pathname === "/bygg-hms" ? "primary" : ""} mr={5}>
              Bygg din egen HMS-tavle
            </Link>
          </NextLink>
          <NextLink href="/faq" passHref>
            <Link _hover={{ color: "primary" }} color={router.pathname === "/faq" ? "primary" : ""} mr={5}>
              Ofte stilte spørsmål
            </Link>
          </NextLink>
          {isLoggedIn && (
            <NextLink href="/admin" passHref>
              <Link _hover={{ color: "primary" }} color={router.pathname === "/admin" ? "primary" : ""} mr={5}>
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
