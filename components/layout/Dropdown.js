import { Box, Button, Link, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ContactForm from "../forms/ContactForm";

export const Dropdown = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      setIsLoggedIn(true);
    }
  }, [auth]);

  return (
    <>
      <Box
        borderBottom="1px"
        borderColor="gray.200"
        display={{ sm: "flex", md: "none" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <NextLink href="/" passHref>
          <Link
            _hover={{ color: "primary" }}
            color={router.pathname === "/" ? "primary" : ""}
            py={5}
            textAlign="center"
            borderTop="1px"
            borderColor="gray.200"
            w="100%"
          >
            Hjem
          </Link>
        </NextLink>
        <NextLink href="/bestselgere" passHref>
          <Link
            _hover={{ color: "primary" }}
            color={router.pathname === "/bestselgere" ? "primary" : ""}
            py={5}
            textAlign="center"
            borderTop="1px"
            borderColor="gray.200"
            w="100%"
          >
            Våre bestselgere
          </Link>
        </NextLink>
        <NextLink href="/bygg-hms" passHref>
          <Link
            _hover={{ color: "primary" }}
            color={router.pathname === "/bygg-hms" ? "primary" : ""}
            py={5}
            textAlign="center"
            borderTop="1px"
            borderColor="gray.200"
            w="100%"
          >
            Bygg din egen HMS-tavle
          </Link>
        </NextLink>
        <NextLink href="/faq" passHref>
          <Link
            _hover={{ color: "primary" }}
            color={router.pathname === "/faq" ? "primary" : ""}
            py={5}
            textAlign="center"
            borderY="1px"
            borderColor="gray.200"
            w="100%"
          >
            Ofte stilte spørsmål
          </Link>
        </NextLink>
        {isLoggedIn && (
          <NextLink href="/admin" passHref>
            <Link
              _hover={{ color: "primary" }}
              borderBottom="1px"
              borderColor="gray.200"
              color={router.pathname === "/admin" ? "primary" : ""}
              py={5}
              textAlign="center"
              w="100%"
            >
              Admin
            </Link>
          </NextLink>
        )}
        <Button borderRadius="full" onClick={onOpen} mb={5} bg="primary" _hover={{ bg: "secondary" }} color="white" my={5}>
          Kontakt oss
        </Button>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ContactForm />
      </Modal>
    </>
  );
};
