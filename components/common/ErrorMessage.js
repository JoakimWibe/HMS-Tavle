import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const ErrorMessage = ({ content }) => {
  return (
    <Alert status="error" mb={10}>
      <AlertIcon />
      <AlertTitle>{content}</AlertTitle>
    </Alert>
  );
};

export default ErrorMessage;
