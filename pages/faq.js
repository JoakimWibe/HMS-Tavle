import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import Banner from "../components/Banner";
import ErrorMessage from "../components/common/ErrorMessage";
import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import { FAQ_URL } from "../constants/api";

const Faq = (props) => {
  return (
    <Layout>
      <Head title="Ofte stilte spørsmål" description="Noen av de vanligste spørsmålene kunder har" />
      <Flex direction="column">
        <Banner />

        <Flex direction="column" maxWidth="2xl" mx="auto" px={10} mt={10}>
          <Heading as="h1" color="secondary" mb={3}>
            Ofte stilte spørsmål
          </Heading>

          <Text mb={3}>
            Her har vi listet opp en del vanlige spørsmål med svar som vi får fra besøkende på vår side. Finner du ikke svaret på det du lurer på her
            må du gjerne kontakte oss.
          </Text>

          <Divider mb={10} borderColor="secondary" />

          {props.errorMessage ? (
            <ErrorMessage content={props.errorMessage} />
          ) : (
            <Flex direction="column">
              {props.faqs.map((faq) => {
                const question = faq.attributes.question;
                const answer = faq.attributes.answer;
                const id = faq.id;

                return (
                  <Flex key={id} direction="column" mb={10}>
                    <Heading as="h3" fontSize="xl">
                      {question}
                    </Heading>
                    <Text>{answer}</Text>
                  </Flex>
                );
              })}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Faq;

export async function getStaticProps() {
  let faqs = [];
  let errorMessage = null;

  try {
    const response = await axios.get(FAQ_URL);
    faqs = response.data.data;
  } catch (error) {
    errorMessage = "An error related to the API has occured.";
  }

  return {
    props: {
      faqs: faqs,
      errorMessage: errorMessage,
    },
  };
}
