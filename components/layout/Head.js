import NextHead from "next/head";
import PropTypes from "prop-types";

const Head = ({ title = "", description }) => {
  return (
    <NextHead>
      <title>
        {title}
        {title ? " | " : ""}HMS-Tavle
      </title>
      <meta name="description" content={description} />
    </NextHead>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
