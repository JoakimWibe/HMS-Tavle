import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Banner from "../components/Banner";
import CustomOrderForm from "../components/forms/CustomOrderForm";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";

const ByggHMS = () => {
  return (
    <Layout>
      <Head title="Bygg din egen HMS-tavle" description="Skjema for bestilling av egendefinerte HMS-tavler" />
      <Flex direction={"column"}>
        <Banner />

        <Flex direction="column" maxWidth="2xl" mx="auto" px={10} mt={10}>
          <Heading as="h1" color="secondary" mb={3}>
            Bygg din egen HMS-tavle
          </Heading>

          <Text mb={3}>
            I skjemaet nedenfor kan du bygge din egen HMS-tavle basert på definerte oppslag, symboler og fysiske installasjoner. Alternativt kan du
            sende oss en kortfattet beskrivelse av ditt behov via kontaktskjemaet.
          </Text>

          <Divider mb={10} borderColor="secondary" />

          <CustomOrderForm />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ByggHMS;
