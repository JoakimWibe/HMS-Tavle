import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link, Modal, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import LoginForm from "../forms/LoginForm";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Flex direction={{ sm: "column", md: "row" }} py={10} bg="gray.700" color="white" justifyContent="space-between" alignItems="center" px={10}>
        <Flex direction="column">
          <Flex alignItems="center" mb={3}>
            <PhoneIcon mr={3} />
            <Text>949 89 960</Text>
          </Flex>
          <Flex alignItems="center" mb={3}>
            <EmailIcon mr={3} />
            <Text>info@wibeskiltogprofil.no</Text>
          </Flex>
        </Flex>

        <Flex direction="column" mb={{ sm: 5, md: 0 }}>
          <Box mb={2} as="h4" fontWeight="bold">
            Meny
          </Box>
          <Flex direction="column">
            <NextLink href="/" passHref>
              <Link mb={2} color={router.pathname === "/" ? "blue.500" : ""} mr={5}>
                Hjem
              </Link>
            </NextLink>
            <NextLink href="/bestselgere" passHref>
              <Link mb={2} color={router.pathname === "/bestselgere" ? "blue.500" : ""} mr={5}>
                Våre bestselgere
              </Link>
            </NextLink>
            <NextLink href="/bygg-hms" passHref>
              <Link mb={2} color={router.pathname === "/bygg-hms" ? "blue.500" : ""} mr={5}>
                Bygg din egen HMS-tavle
              </Link>
            </NextLink>
            <NextLink href="/faq" passHref>
              <Link mb={2} color={router.pathname === "/faq" ? "blue.500" : ""} mr={5}>
                Ofte stilte spørsmål
              </Link>
            </NextLink>
          </Flex>
        </Flex>

        <Flex>
          <Button onClick={onOpen} colorScheme="blue">
            Logg inn
          </Button>
        </Flex>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <LoginForm />
      </Modal>
    </>
  );
};

export default Footer;
