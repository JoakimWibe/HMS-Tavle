import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Input, Textarea, Button } from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Logg inn</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form>
          <fieldset disabled={false}>
            <Flex mb={5}>
              <Input placeholder="Email" type="email" />
            </Flex>
            <Flex mb={5}>
              <Input placeholder="Passord" type="password" />
            </Flex>

            <Button
              borderRadius="full"
              mb={5}
              bg="primary"
              w="100%"
              color="white"
              _hover={{ bg: "secondary" }}
              isLoading={false}
              loadingText="Logger inn"
            >
              Logg inn
            </Button>
          </fieldset>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default LoginForm;
