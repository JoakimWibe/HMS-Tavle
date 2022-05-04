import { Box, Image, Button, Divider, Flex, Heading } from "@chakra-ui/react";

import NextLink from "next/link";

const PopularProducts = ({ popularProducts }) => {
  console.log(popularProducts);
  return (
    <Flex direction={"column"}>
      {popularProducts.map((product) => {
        const id = product.id;
        const name = product.attributes.name;
        const imageUrl = product.attributes.image_url;
        const imageAltText = product.attributes.image_alt_text;

        return (
          <Box key={id}>
            <Flex direction={{ sm: "column", md: "row" }} textAlign={{ sm: "center", md: "left" }}>
              <Image src={imageUrl} alt={imageAltText} height={{ sm: "auto", md: 52 }} border={"1px"} p={5} mb={{ sm: 5, md: 0 }} rounded={"sm"} />
              <Flex ml={10} direction={"column"} justifyContent={"space-between"}>
                <Heading fontSize={"2xl"} as="h3">
                  {name}
                </Heading>
                <NextLink href={`/bestselgere/${id}`} passHref>
                  <Button
                    mx={{ sm: "auto", md: 0 }}
                    borderRadius="full"
                    w={52}
                    mt={{ sm: 5, md: 0 }}
                    bg="primary"
                    color="white"
                    _hover={{ bg: "secondary" }}
                  >
                    Les Mer
                  </Button>
                </NextLink>
              </Flex>
            </Flex>
            <Divider my={10} borderColor="secondary" />
          </Box>
        );
      })}
    </Flex>
  );
};

export default PopularProducts;
