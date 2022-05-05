import { Text } from "@chakra-ui/react";

const FormError = ({ children }) => {
  return <Text color={"red.500"}>{children}</Text>;
};

export default FormError;
