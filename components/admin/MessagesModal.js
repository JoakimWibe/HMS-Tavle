import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Text, Divider, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState, useContext } from "react";
import { CONTACT_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../common/ErrorMessage";

const MessagesModal = () => {
  const [auth] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(CONTACT_URL, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      setMessages(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setErrorMessage("En feil har oppstått.");
    }
  };

  fetchMessages();

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Meldinger ({messages.length})</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {errorMessage && <ErrorMessage content={"En feil har oppstått."} />}
        <Flex direction={"column"}>
          {messages.length < 1 ? (
            <Text mb={2}>Ingen meldinger</Text>
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
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default MessagesModal;
