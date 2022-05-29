import { SimpleGrid, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ProductExample = ({ productExamples }) => {
  return (
    <SimpleGrid mb={10} columns={{ sm: 2, md: 3 }} spacingX={4} spacingY={4}>
      {productExamples.map((example) => {
        const url = example.attributes.url;
        const altText = example.attributes.alt_text;
        const id = example.id;

        return <Image loading="lazy" src={url} alt={altText} key={id} minHeight={{ md: 150, sm: 0 }} />;
      })}
    </SimpleGrid>
  );
};

export default ProductExample;

ProductExample.propTypes = {
  productExamples: PropTypes.array.isRequired,
};
