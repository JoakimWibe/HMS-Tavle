import { Flex } from "@chakra-ui/react";
import Banner from "../components/Banner";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";

const ByggHMS = () => {
  return (
    <Layout>
      <Head title="Bygg din egen HMS-tavle" description="Skjema for bestilling av egendefinerte HMS-tavler" />
      <Flex h="100vh">
        <Banner />
      </Flex>
    </Layout>
  );
};

export default ByggHMS;
