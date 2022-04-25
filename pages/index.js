import { Flex } from "@chakra-ui/react";
import Banner from "../components/Banner";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      <Head description="Hjemmeside for HMS-tavle" />
      <Flex h="100vh">
        <Banner />
      </Flex>
    </Layout>
  );
};

export default Home;
