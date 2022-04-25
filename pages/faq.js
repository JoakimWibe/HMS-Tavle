import { Flex } from "@chakra-ui/react";
import Banner from "../components/Banner";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";

const Faq = () => {
  return (
    <Layout>
      <Head title="Ofte stilte spørsmål" description="Noen av de vanligste spørsmålene kunder har" />
      <Flex h="100vh">
        <Banner />
      </Flex>
    </Layout>
  );
};

export default Faq;
