import { Text, Button, Flex, Heading, Box } from "@chakra-ui/react";
import Banner from "../components/Banner";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import NextLink from "next/link";
import { InfoIcon } from "@chakra-ui/icons";
import Examples from "../components/products/Examples";

const Home = () => {
  return (
    <Layout>
      <Head description="Hjemmeside for HMS-tavle" />
      <Flex direction="column">
        <Banner />

        <Flex h={500} direction="column" justifyContent="center" alignItems="center">
          <Heading textAlign="center" as="h1" color="text" mb={10}>
            Norges ledende leverandør av HMS-tavler
          </Heading>
          <Flex mb={10} direction={{ sm: "column", md: "row" }}>
            <NextLink href="/bygg-hms" passHref>
              <Button
                py={6}
                borderRadius="full"
                mr={{ sm: 0, md: 5 }}
                mb={{ sm: 5, md: 0 }}
                w={52}
                bg="primary"
                color="white"
                _hover={{ bg: "secondary" }}
              >
                Bygg din egen HMS-tavle
              </Button>
            </NextLink>
            <NextLink href="/bestselgere" passHref>
              <Button py={6} borderRadius="full" w={52} bg="white" color="primary" border="2px" borderColor="primary">
                Våre bestselgere
              </Button>
            </NextLink>
          </Flex>
          <Flex direction="column" textAlign="center">
            <Text mb={3}>Kort leveringstid</Text>
            <Text mb={3}>Skreddersydde produkter</Text>
            <Text>Levering til hele Norge</Text>
          </Flex>
        </Flex>

        <Flex direction="column" w={{ sm: "100%", md: "80%", lg: "60%", xl: "40%" }} px={{ md: 0, sm: 10 }} mx="auto">
          <Heading mb={3} fontSize="2xl" as="h3">
            Eksempler på våre tavler
          </Heading>
          <Text mb={3}>
            Vi har over 10 års erfaring med levering av skreddersydde HMS-tavler, SHA-tavler, HMS-stasjoner, prosjekttavler, LEAN-tavler og lignende
            produkter. Her er ett lite utvalg. ​​ Klikk på bildene for større versjoner.
          </Text>
          <NextLink href="/faq" passHref>
            <Flex mb={5} w={48} color="primary" alignItems="center" cursor="pointer">
              Ofte stilte spørsmål <InfoIcon ml={2} />
            </Flex>
          </NextLink>

          <Examples />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;