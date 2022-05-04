import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Input, Textarea, Button } from "@chakra-ui/react";

const PopularProductForm = ({ title }) => {
  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Kontakt oss for tilbud på dette produktet</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form>
          <fieldset disabled={true}>
            <Flex mb={5}>
              <Input value={title} type="text" variant={"flushed"} />
            </Flex>
          </fieldset>
          <Flex mb={5}>
            <Input placeholder="Antall tavler" type="number" />
          </Flex>
          <Flex mb={5}>
            <Input placeholder="Fullt navn" type="text" />
          </Flex>
          <Flex mb={5}>
            <Input placeholder="Firma/organisasjon " type="text" />
          </Flex>
          <Flex mb={5}>
            <Input placeholder="Epost" type="email" />
          </Flex>
          <Flex mb={5}>
            <Textarea placeholder="Kommentar til din forespørsel" type="text" />
          </Flex>

          <Button borderRadius="full" mb={5} bg="primary" w="100%" color="white" _hover={{ bg: "secondary" }}>
            Send forespørsel
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default PopularProductForm;
