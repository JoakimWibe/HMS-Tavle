import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Input, Textarea, Button } from "@chakra-ui/react";

const ContactForm = () => {
  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Kontakt oss</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form>
          <Flex mb={5}>
            <Input placeholder="Navn" type="text" />
          </Flex>
          <Flex mb={5}>
            <Input placeholder="Email" type="email" />
          </Flex>
          <Flex mb={5}>
            <Input placeholder="Telefon" type="number" />
          </Flex>
          <Flex mb={5}>
            <Textarea placeholder="Melding" type="text" />
          </Flex>

          <Button borderRadius="full" mb={5} bg="primary" w="100%" color="white" _hover={{ bg: "secondary" }}>
            Send
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default ContactForm;
