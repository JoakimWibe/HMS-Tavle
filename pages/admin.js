import { Button, Divider, Flex, Heading, Modal, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import MessagesModal from "../components/admin/MessagesModal";
import OrdersModal from "../components/admin/OrdersModal";
import { SpecialOrdersModal } from "../components/admin/SpecialOrdersModal";
import AddProductForm from "../components/forms/AddProductForm";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import AuthContext from "../context/AuthContext";

const Admin = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();
  const { isOpen: isMessagesOpen, onOpen: onMessagesOpen, onClose: onMessagesClose } = useDisclosure();
  const { isOpen: isOrdersOpen, onOpen: onOrdersOpen, onClose: onOrdersClose } = useDisclosure();
  const { isOpen: isSpecialOrdersOpen, onOpen: onSpecialOrdersOpen, onClose: onSpecialOrdersClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth) {
      setUser(auth.user.email);
    }
  }, []);

  const logOut = () => {
    setAuth(null);
    window.localStorage.clear();
    router.push("/");
  };

  return (
    <Layout>
      <Head title="Admin" description="Admin side for HMS-tavle" />
      <Flex minHeight={"100vh"}>
        <Flex direction="column" width="2xl" mx="auto" px={10} mt={10}>
          <Flex direction={{ sm: "column", md: "row" }} alignItems={{ sm: "start", md: "center" }} justifyContent={"space-between"}>
            <Heading mb={{ sm: 2, md: 0 }} as="h1" color="secondary">
              Admin
            </Heading>

            <Text mb={{ sm: 2, md: 0 }} fontWeight={"bold"}>
              Logget inn som {user}
            </Text>
          </Flex>

          <Divider mb={5} borderColor="secondary" />

          <Flex direction={{ sm: "column", md: "row" }} justifyContent={{ sm: "center", md: "space-between" }}>
            <AddProductForm />
            <Flex direction={"column"} mt={{ sm: 10, md: 0 }} justifyContent={"center"}>
              <Button onClick={onMessagesOpen} mb={5} borderRadius="full" color={"white"} bg="primary" variant="filled" _hover={{ bg: "secondary" }}>
                Meldinger
              </Button>
              <Button onClick={onOrdersOpen} mb={5} borderRadius="full" color={"white"} bg="primary" variant="filled" _hover={{ bg: "secondary" }}>
                Bestillinger
              </Button>
              <Button
                onClick={onSpecialOrdersOpen}
                mb={5}
                borderRadius="full"
                color={"white"}
                bg="primary"
                variant="filled"
                _hover={{ bg: "secondary" }}
              >
                Spesial bestillinger
              </Button>
              <Button onClick={logOut} borderRadius="full" bg="white" color="primary" border="2px" borderColor="primary">
                Logg ut
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal scrollBehavior={scrollBehavior} onClose={onMessagesClose} isOpen={isMessagesOpen} isCentered>
        <ModalOverlay />
        <MessagesModal />
      </Modal>

      <Modal scrollBehavior={scrollBehavior} onClose={onOrdersClose} isOpen={isOrdersOpen} isCentered>
        <ModalOverlay />
        <OrdersModal />
      </Modal>

      <Modal scrollBehavior={scrollBehavior} onClose={onSpecialOrdersClose} isOpen={isSpecialOrdersOpen} isCentered>
        <ModalOverlay />
        <SpecialOrdersModal />
      </Modal>
    </Layout>
  );
};

export default Admin;
