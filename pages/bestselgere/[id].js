import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Banner from "../../components/Banner";
import ErrorMessage from "../../components/common/ErrorMessage";
import PopularProductForm from "../../components/forms/PopularProductForm";
import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";
import { PRODUCTS_URL } from "../../constants/api";
import NextLink from "next/link";

const Bestselger = ({ popularProduct, errorMessage }) => {
  const id = popularProduct.id;
  const name = popularProduct.attributes.name;
  const description = popularProduct.attributes.description;
  const imageUrl = popularProduct.attributes.image_url;
  const imageAltText = popularProduct.attributes.image_alt_text;

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Layout>
      <Head title={name} description={name} />

      <Banner />

      <Flex direction="column" maxWidth="2xl" mx="auto" px={10} mt={10}>
        <Breadcrumb mb={5}>
          <BreadcrumbItem>
            <NextLink href="/bestselgere" passHref>
              <BreadcrumbLink>Våre Bestselgere</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <NextLink href={`/bestselgere/${id}`} passHref>
              <BreadcrumbLink>{name}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading as="h1" color="secondary" mb={3}>
          {name}
        </Heading>

        <Divider mb={10} borderColor="secondary" />

        {errorMessage ? (
          <ErrorMessage content={errorMessage} />
        ) : (
          <Flex mb={20} direction={"column"}>
            <Image src={imageUrl} alt={imageAltText} border={"1px"} p={5} rounded={"sm"} />
            <Text my={5}>{description}</Text>
            <Button borderRadius="full" h={12} onClick={onOpen} bg="primary" color="white" _hover={{ bg: "secondary" }}>
              Kontakt for forespørsel
            </Button>
          </Flex>
        )}
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <PopularProductForm title={name} />
      </Modal>
    </Layout>
  );
};

export default Bestselger;

export async function getStaticPaths() {
  try {
    const response = await axios.get(PRODUCTS_URL);
    const popularProducts = response.data.data;

    const paths = popularProducts.map((popularProduct) => ({
      params: { id: popularProduct.id.toString() },
    }));

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${PRODUCTS_URL}${params.id}`;

  let popularProduct = null;
  let errorMessage = null;

  try {
    const response = await axios.get(url);
    popularProduct = response.data.data;
  } catch (error) {
    errorMessage = "An error related to the API has occured";
  }

  return {
    props: { popularProduct: popularProduct, errorMessage: errorMessage },
  };
}
