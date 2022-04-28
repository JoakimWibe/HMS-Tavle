import { Flex } from "@chakra-ui/react";

const PopularProducts = ({ popularProducts }) => {
  return (
    <Flex>
      {popularProducts.map((product) => {
        const id = product.id;

        return <Flex key={id}></Flex>;
      })}
    </Flex>
  );
};

export default PopularProducts;
