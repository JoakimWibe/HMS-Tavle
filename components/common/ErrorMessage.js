import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ErrorMessage = ({ content }) => {
  return (
    <Alert status="error" mb={10}>
      <AlertIcon />
      <AlertTitle>{content}</AlertTitle>
    </Alert>
  );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  content: PropTypes.string.isRequired,
};
