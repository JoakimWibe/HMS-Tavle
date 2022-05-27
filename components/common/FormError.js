import { Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const FormError = ({ children }) => {
  return <Text color={"red.500"}>{children}</Text>;
};

export default FormError;

FormError.propTypes = {
  children: PropTypes.string.isRequired,
};
