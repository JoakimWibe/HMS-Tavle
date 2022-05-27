import { SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import PropTypes from "prop-types";

const ProductExample = ({ productExamples }) => {
  return (
    <SimpleGrid mb={10} columns={3} spacingX={4} spacingY={4}>
      {productExamples.map((example) => {
        const url = example.attributes.url;
        const altText = example.attributes.alt_text;
        const id = example.id;

        return <Image src={url} alt={altText} key={id} height="200" width="200" />;
      })}
    </SimpleGrid>
  );
};

export default ProductExample;

ProductExample.propTypes = {
  productExamples: PropTypes.array.isRequired,
};
