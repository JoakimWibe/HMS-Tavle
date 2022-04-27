import { Box, Button, Link, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import ContactForm from "../forms/ContactForm";

export const Dropdown = () => {
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useDisclosure();

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
        <NextLink href="/bestselgere" passHref>
          <Link
            textDecoration={router.pathname === "/bestselgere" ? "underline" : ""}
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
            textDecoration={router.pathname === "/bygg-hms" ? "underline" : ""}
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
            textDecoration={router.pathname === "/faq" ? "underline" : ""}
            py={5}
            textAlign="center"
            borderY="1px"
            borderColor="gray.200"
            w="100%"
          >
            Ofte stilte spørsmål
          </Link>
        </NextLink>
        <Button borderRadius="full" onClick={onOpen} mb={5} bg="primary" _hover={{ bg: "secondary" }} color="white" my={5}>
          Kontakt Oss
        </Button>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ContactForm />
      </Modal>
    </>
  );
};