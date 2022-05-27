import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SuccessMessage = ({ children }) => {
  return (
    <Alert status="success" mb={10}>
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};

export default SuccessMessage;

SuccessMessage.propTypes = {
  children: PropTypes.string.isRequired,
};
