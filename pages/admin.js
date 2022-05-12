import { Flex } from "@chakra-ui/react";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";

const ByggHMS = () => {
  return (
    <Layout>
      <Head title="Admin" description="Admin side for HMS-tavle" />
      <Flex h="100vh"></Flex>
    </Layout>
  );
};

export default ByggHMS;
