import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Text, Divider, Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { CONTACT_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../common/ErrorMessage";

const MessagesModal = () => {
  const [auth] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);

      try {
        const response = await axios.get(CONTACT_URL, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        setMessages(response.data.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage("En feil har oppstått.");
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Meldinger ({messages.length})</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex direction={"column"}>
          {messages.length < 1 && errorMessage === null && <Text mb={2}>Ingen meldinger</Text>}
          {loading ? (
            <Spinner color="primary" size={"xl"} mx={"auto"} my={5} />
          ) : (
            messages.map((message) => {
              const published = new Date(message.attributes.publishedAt);
              return (
                <Flex direction={"column"} key={message.id}>
                  <Divider mb={2} borderColor="secondary" />
                  <Text mb={2}>Fra: {message.attributes.name}</Text>
                  <Text mb={2}>Epost: {message.attributes.email}</Text>
                  <Text mb={2}>Telefon: {message.attributes.phone}</Text>
                  <Text mb={2}>Melding: {message.attributes.message}</Text>
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

export default MessagesModal;
