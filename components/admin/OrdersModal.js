import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Text, Divider } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ORDER_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../common/ErrorMessage";

const OrdersModal = () => {
  const [auth] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(ORDER_URL, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        setOrders(response.data.data);
      } catch (error) {
        setErrorMessage("En feil har oppstått.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Bestillinger</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {errorMessage && <ErrorMessage content={"En feil har oppstått."} />}
        <Flex direction={"column"}>
          {orders.length < 1 ? (
            <Text mb={2}>Ingen Bestillinger</Text>
          ) : (
            orders.map((order) => {
              return (
                <Flex direction={"column"} key={order.id}>
                  <Divider mb={2} borderColor="secondary" />
                  <Text mb={2} fontWeight={"bold"}>
                    {order.attributes.product_title}
                  </Text>
                  <Text mb={2}>Antall: {order.attributes.amount}</Text>
                  <Text mb={2}>Navn: {order.attributes.name}</Text>
                  <Text mb={2}>Firma/organisasjon: {order.attributes.company}</Text>
                  <Text mb={2}>Epost: {order.attributes.email}</Text>
                  <Text mb={2}>Kommentar: {order.attributes.comment}</Text>
                </Flex>
              );
            })
          )}
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default OrdersModal;
