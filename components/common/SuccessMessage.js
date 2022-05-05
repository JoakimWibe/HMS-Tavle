import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const SuccessMessage = ({ children }) => {
  return (
    <Alert status="success" mb={10}>
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};

export default SuccessMessage;
