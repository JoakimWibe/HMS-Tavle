import { Divider, Flex, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { CUSTOM_ORDER_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../common/ErrorMessage";

export const SpecialOrdersModal = () => {
  const [auth] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [specialOrders, setSpecialOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSpecialOrders = async () => {
      setLoading(true);

      try {
        const response = await axios.get(CUSTOM_ORDER_URL, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        setSpecialOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage("En feil har oppstått.");
        setLoading(false);
      }
    };

    fetchSpecialOrders();
  }, [auth.jwt]);

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Spesial bestillinger ({specialOrders.length})</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex direction={"column"}>
          {specialOrders.length < 1 && errorMessage === null && <Text mb={2}>Ingen spesial bestillinger</Text>}
          {loading ? (
            <Spinner color="primary" size={"xl"} mx={"auto"} my={5} />
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
          {errorMessage && <ErrorMessage content={errorMessage} />}
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};
