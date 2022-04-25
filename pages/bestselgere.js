import { Flex } from "@chakra-ui/react";
import Banner from "../components/Banner";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";

const Bestselgere = () => {
  return (
    <Layout>
      <Head title="Våre Bestselgere" description="Oversikt over de mest solgte produktene." />
      <Flex h="100vh">
        <Banner />
      </Flex>
    </Layout>
  );
};

export default Bestselgere;
