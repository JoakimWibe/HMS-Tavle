import { Button, Divider, Flex, Heading, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import MessagesModal from "../components/admin/MessagesModal";
import OrdersModal from "../components/admin/OrdersModal";
import AddProductForm from "../components/forms/AddProductForm";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import AuthContext from "../context/AuthContext";

const Admin = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();
  const { isOpen: isMessagesOpen, onOpen: onMessagesOpen, onClose: onMessagesClose } = useDisclosure();
  const { isOpen: isOrdersOpen, onOpen: onOrdersOpen, onClose: onOrdersClose } = useDisclosure();

  const logOut = () => {
    setAuth(null);
    window.localStorage.clear();
    router.push("/");
  };

  return (
    <Layout>
      <Head title="Admin" description="Admin side for HMS-tavle" />
      <Flex h="100vh">
        <Flex direction="column" width="2xl" mx="auto" px={10} mt={10}>
          <Heading as="h1" color="secondary" mb={3}>
            Admin
          </Heading>

          <Divider mb={10} borderColor="secondary" />

          <Flex>
            <AddProductForm />
            <Flex mt={10} direction={"column"}>
              <Button
                onClick={onMessagesOpen}
                w={52}
                mb={5}
                borderRadius="full"
                color={"white"}
                bg="primary"
                variant="filled"
                _hover={{ bg: "secondary" }}
              >
                Se meldinger
              </Button>
              <Button
                onClick={onOrdersOpen}
                w={52}
                mb={5}
                borderRadius="full"
                color={"white"}
                bg="primary"
                variant="filled"
                _hover={{ bg: "secondary" }}
              >
                Se bestillinger
              </Button>
              <Button w={52} onClick={logOut} borderRadius="full" bg="white" color="primary" border="2px" borderColor="primary">
                Logg ut
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal onClose={onMessagesClose} isOpen={isMessagesOpen} isCentered>
        <ModalOverlay />
        <MessagesModal />
      </Modal>

      <Modal onClose={onOrdersClose} isOpen={isOrdersOpen} isCentered>
        <ModalOverlay />
        <OrdersModal />
      </Modal>
    </Layout>
  );
};

export default Admin;
