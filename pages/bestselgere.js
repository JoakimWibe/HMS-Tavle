import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import Banner from "../components/Banner";
import ErrorMessage from "../components/common/ErrorMessage";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import PopularProducts from "../components/products/PopularProducts";
import { PRODUCTS_URL } from "../constants/api";

const Bestselgere = (props) => {
  return (
    <Layout>
      <Head title="Våre Bestselgere" description="Oversikt over de mest solgte produktene." />
      <Flex direction="column">
        <Banner />

        <Flex direction="column" maxWidth="2xl" mx="auto" px={10} mt={10}>
          <Heading as="h1" color="secondary" mb={3}>
            Våre Bestselgere
          </Heading>

          <Text mb={3}>
            Nedenfor finner du en del av våre mest solgte produkter. Alle produkter kan tilpasses etter dine behov, og priser gis på forespørsel
            basert på volum.
          </Text>

          <Divider mb={10} borderColor="secondary" />

          {props.errorMessage ? <ErrorMessage content={props.errorMessage} /> : <PopularProducts popularProducts={props.products} />}
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
    errorMessage = "An error related to the API has occured.";
  }

  return {
    props: {
      products: products,
      errorMessage: errorMessage,
    },
  };
}
