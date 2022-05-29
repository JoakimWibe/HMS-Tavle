import { Flex, Heading, Text } from "@chakra-ui/react";

const Banner = () => {
  return (
    <Flex color="white" h={150} w="100%" direction="column" bg="primary" justifyContent="center" alignItems="center">
      <Heading textAlign={"center"} as="h1" fontWeight="bold" fontSize={{ sm: "xl", md: "2xl" }}>
        25% rabatt på første bestilling til nye kunder
      </Heading>
      <Text>Tilbudet gjelder ikke HMS-stasjoner</Text>
    </Flex>
  );
};

export default Banner;
