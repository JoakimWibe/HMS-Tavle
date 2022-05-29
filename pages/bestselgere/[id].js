import { Box, Button, Divider, Flex, Heading, Image, Modal, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import Banner from "../../components/Banner";
import ErrorMessage from "../../components/common/ErrorMessage";
import PopularProductForm from "../../components/forms/PopularProductForm";
import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";
import { PRODUCTS_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import EditProductForm from "../../components/forms/EditProductForm";

const Bestselger = ({ popularProduct, errorMessage }) => {
  const id = popularProduct.id;
  const name = popularProduct.attributes.name;
  const description = popularProduct.attributes.description;
  const imageUrl = popularProduct.attributes.image_url;
  const imageAltText = popularProduct.attributes.image_alt_text;

  const { isOpen: isContactOpen, onOpen: onContactOpen, onClose: onContactClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const router = useRouter();
  const [auth] = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (auth) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [auth]);

  const deleteProduct = async () => {
    const url = PRODUCTS_URL + id;

    if (confirm("Er du sikker på at du vil slette dette produktet?")) {
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        router.push("/bestselgere");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout>
      <Head title={name} description={name} />

      <Banner />

      <Flex direction="column" maxWidth="2xl" mx="auto" px={5} mt={10}>
        <Heading as="h2" color="secondary" mb={3}>
          {name}
        </Heading>

        <Divider mb={10} borderColor="secondary" />

        {errorMessage ? (
          <ErrorMessage content={errorMessage} />
        ) : (
          <Flex mb={20} direction={"column"}>
            <Image loading="lazy" src={imageUrl} alt={imageAltText} border={"1px"} p={5} rounded={"sm"} />
            <Text my={5}>{description}</Text>
            <Button borderRadius="full" h={12} onClick={onContactOpen} bg="primary" color="white" _hover={{ bg: "secondary" }}>
              Kontakt for forespørsel
            </Button>
            {authorized && (
              <Flex direction={"column"}>
                <Button mt={5} onClick={deleteProduct} borderRadius="full" h={12} bg="white" color="primary" border={"2px"}>
                  Slett produkt
                </Button>
                <Button onClick={onEditOpen} mt={5} borderRadius="full" h={12} bg="white" color="primary" border={"2px"}>
                  Rediger produkt
                </Button>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>

      <Modal onClose={onContactClose} isOpen={isContactOpen} isCentered>
        <ModalOverlay />
        <PopularProductForm title={name} />
      </Modal>

      <Modal onClose={onEditClose} isOpen={isEditOpen} isCentered>
        <ModalOverlay />
        <EditProductForm title={name} description={description} imageUrl={imageUrl} imageAltText={imageAltText} id={id} />
      </Modal>
    </Layout>
  );
};

export default Bestselger;

Bestselger.propTypes = {
  popularProduct: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
};

export async function getServerSideProps({ context }) {
  const url = `${PRODUCTS_URL}${context.params.id}`;

  let popularProduct = null;
  let errorMessage = null;

  try {
    const response = await axios.get(url);
    popularProduct = response.data.data;
  } catch (error) {
    errorMessage = "En feil har oppstått.";
  }

  return {
    props: { popularProduct: popularProduct, errorMessage: errorMessage },
  };
}
