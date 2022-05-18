import { Box, Button, Flex, Heading, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PRODUCTS_URL } from "../../constants/api";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useState } from "react";
import SuccessMessage from "../common/SuccessMessage";
import FormError from "../common/FormError";
import axios from "axios";
import ErrorMessage from "../common/ErrorMessage";

const schema = yup.object().shape({
  name: yup.string().required("Navn er obligatorisk"),
  description: yup.string().required("Beskrivelse er obligatorisk"),
  image_url: yup.string().required("Bilde er obligatorisk"),
  image_alt_text: yup.string().required("Alt text er obligatorisk"),
});

const AddProductForm = () => {
  const [success, setSuccess] = useState(null);
  const [auth] = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        PRODUCTS_URL,
        {
          data: {
            name: data.name,
            image_url: data.image_url,
            image_alt_text: data.image_alt_text,
            description: data.description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      console.log(error);
    }
  }

  return (
    <Flex direction={"column"}>
      <Heading as={"h3"} fontSize="xl" color={"secondary"} mb={3}>
        Opprett et produkt
      </Heading>
      {success && <SuccessMessage>Produkt opprettet.</SuccessMessage>}
      {success === false ?? <ErrorMessage content={"En feil har oppstått"} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Input mb={2} placeholder="Navn" type="text" {...register("name")} />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </Box>
        <Box mb={3}>
          <Textarea mb={2} placeholder="Beskrivelse" type="text" {...register("description")} />
          {errors.description && <FormError>{errors.description.message}</FormError>}
        </Box>
        <Box mb={3}>
          <Input mb={2} placeholder="Bilde URL" type="text" {...register("image_url")} />
          {errors.image_url && <FormError>{errors.image_url.message}</FormError>}
        </Box>
        <Box mb={3}>
          <Input mb={2} placeholder="Alt text" type="text" {...register("image_alt_text")} />
          {errors.image_alt_text && <FormError>{errors.image_alt_text.message}</FormError>}
        </Box>

        <Button type="submit" borderRadius="full" mb={5} bg="primary" w="100%" color="white" _hover={{ bg: "secondary" }}>
          Opprett produkt
        </Button>
      </form>
    </Flex>
  );
};

export default AddProductForm;
