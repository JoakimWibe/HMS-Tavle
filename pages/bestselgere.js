import { Search2Icon } from "@chakra-ui/icons";
import { Divider, Flex, Heading, IconButton, Input, InputGroup, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Banner from "../components/Banner";
import ErrorMessage from "../components/common/ErrorMessage";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import PopularProducts from "../components/products/PopularProducts";
import { PRODUCTS_URL } from "../constants/api";

const Bestselgere = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [noResults, setNoResults] = useState(false);

  let searchHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputValue(lowerCase);
  };

  const filteredProducts = props.products.filter((product) => {
    if (inputValue === "") {
      return product;
    } else {
      return product.attributes.name.toLowerCase().includes(inputValue);
    }
  });

  useEffect(() => {
    if (filteredProducts < 1) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  });

  return (
    <Layout>
      <Head title="Våre Bestselgere" description="Oversikt over de mest solgte produktene." />
      <Flex minHeight={"100vh"} direction="column">
        <Banner />

        <Flex direction="column" maxWidth="2xl" mx="auto" px={10} mt={10}>
          <Heading as="h1" color="secondary" mb={3}>
            Våre Bestselgere
          </Heading>

          <Text mb={3}>
            Nedenfor finner du en del av våre mest solgte produkter. Alle produkter kan tilpasses etter dine behov, og priser gis på forespørsel
            basert på volum.
          </Text>

          <InputGroup>
            <Input mb={3} placeholder="Søk etter produkt..." borderRightRadius={"none"} onChange={searchHandler} />
            <IconButton w={20} bg={"primary"} color={"white"} icon={<Search2Icon />} borderLeftRadius={"none"} _hover={{ bg: "secondary" }} />
          </InputGroup>

          <Divider mb={10} borderColor="secondary" />

          {props.errorMessage ? (
            <ErrorMessage content={props.errorMessage} />
          ) : (
            <PopularProducts resultsMessage={noResults} popularProducts={filteredProducts} />
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Bestselgere;

export async function getStaticProps() {
  let products = [];
  let errorMessage = null;

  try {
    const response = await axios.get(PRODUCTS_URL);
    products = response.data.data;
  } catch (error) {
    errorMessage = "En feil har oppstått.";
  }

  return {
    props: {
      products: products,
      errorMessage: errorMessage,
    },
  };
}
