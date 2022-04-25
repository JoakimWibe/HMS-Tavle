import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Image, Link, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "../../public/assets/logo.png";
import ContactForm from "../forms/ContactForm";
import { Dropdown } from "./Dropdown";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <Box position="fixed" w="100%" bg="white">
      <Flex h={20} justifyContent="space-between" alignItems="center" p={5}>
        <NextLink href="/" passHref>
          <Image cursor="pointer" src={Logo.src} alt="HMS-Tavle logo" h={50} />
        </NextLink>
        <Box display={{ sm: "none", md: "flex" }} alignItems="center">
          <NextLink href="/bestselgere" passHref>
            <Link color={router.pathname === "/bestselgere" ? "blue.500" : ""} mr={5}>
              Våre bestselgere
            </Link>
          </NextLink>
          <NextLink href="/bygg-hms" passHref>
            <Link color={router.pathname === "/bygg-hms" ? "blue.500" : ""} mr={5}>
              Bygg din egen HMS-tavle
            </Link>
          </NextLink>
          <NextLink href="/faq" passHref>
            <Link color={router.pathname === "/faq" ? "blue.500" : ""} mr={5}>
              Ofte stilte spørsmål
            </Link>
          </NextLink>
          <Button onClick={onOpen} colorScheme="blue">
            Kontakt Oss
          </Button>
        </Box>
        <IconButton
          onClick={toggleDropdown}
          display={{ sm: "flex", md: "none" }}
          aria-label="menu"
          icon={dropdown ? <CloseIcon /> : <HamburgerIcon />}
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
