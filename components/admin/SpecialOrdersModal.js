import { Divider, Flex, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState, useContext } from "react";
import { CUSTOM_ORDER_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../common/ErrorMessage";

export const SpecialOrdersModal = () => {
  const [auth] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [specialOrders, setSpecialOrders] = useState([]);

  const fetchSpecialOrders = async () => {
    try {
      const response = await axios.get(CUSTOM_ORDER_URL, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      setSpecialOrders(response.data.data);
    } catch (error) {
      setErrorMessage("En feil har oppstått.");
    }
  };

  fetchSpecialOrders();

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Spesial bestillinger ({specialOrders.length})</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {errorMessage && <ErrorMessage content={"En feil har oppstått."} />}
        <Flex direction={"column"}>
          {specialOrders.length < 1 ? (
            <Text mb={2}>Ingen spesial bestillinger</Text>
          ) : (
            specialOrders.map((specialOrder) => {
              const published = new Date(specialOrder.attributes.publishedAt);
              return (
                <Flex direction={"column"} key={specialOrder.id}>
                  <Divider mb={2} borderColor="secondary" />
                  <Text mb={2} fontWeight={"bold"}>
                    {specialOrder.attributes.name}
                  </Text>
                  <Text mb={2}>Valg 1: {specialOrder.attributes.radio_1}</Text>
                  <Text mb={2}>Valg 2: {specialOrder.attributes.radio_2}</Text>
                  <Text mb={2}>Funnet: {specialOrder.attributes.radio_3}</Text>
                  <Text mb={2}>Epost: {specialOrder.attributes.email}</Text>
                  <Text mb={2}>Firma: {specialOrder.attributes.company}</Text>
                  <Text mb={2}>Kommentar: {specialOrder.attributes.comment}</Text>
                  <Text mb={2}>Dato sendt: {published.toLocaleDateString()}</Text>
                </Flex>
              );
            })
          )}
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};
