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

const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const schema = yup.object().shape({
  name: yup.string().required("Navn er obligatorisk"),
  description: yup.string().required("Beskrivelse er obligatorisk"),
  image_url: yup.string().matches(URL, "legg til gyldig URL").required(),
  image_alt_text: yup.string().required("Alt text er obligatorisk"),
});

const AddProductForm = () => {
  const [success, setSuccess] = useState(null);
  const [auth] = useContext(AuthContext);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
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
      setSending(true);
      reset();
    } catch (error) {
      setErrorMessage("En feil har oppst??tt.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Flex direction={"column"} width={{ sm: "100%", md: "xs" }}>
      <Heading as={"h3"} fontSize="xl" color={"secondary"} mb={3}>
        Opprett et produkt
      </Heading>
      {success && <SuccessMessage>Produkt opprettet.</SuccessMessage>}
      {errorMessage && <ErrorMessage content={errorMessage} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={sending}>
          <Box mb={3}>
            <Input _placeholder={{ color: "text" }} borderColor={"primary"} mb={2} placeholder="Navn" type="text" {...register("name")} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Textarea
              _placeholder={{ color: "text" }}
              borderColor={"primary"}
              mb={2}
              placeholder="Beskrivelse"
              type="text"
              {...register("description")}
            />
            {errors.description && <FormError>{errors.description.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Input _placeholder={{ color: "text" }} borderColor={"primary"} mb={2} placeholder="Bilde URL" type="text" {...register("image_url")} />
            {errors.image_url && <FormError>{errors.image_url.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Input
              _placeholder={{ color: "text" }}
              borderColor={"primary"}
              mb={2}
              placeholder="Alt text"
              type="text"
              {...register("image_alt_text")}
            />
            {errors.image_alt_text && <FormError>{errors.image_alt_text.message}</FormError>}
          </Box>

          <Button
            isLoading={sending}
            loadingText="Oppretter..."
            type="submit"
            borderRadius="full"
            mb={5}
            bg="primary"
            w="100%"
            color="white"
            _hover={{ bg: "secondary" }}
          >
            Opprett produkt
          </Button>
        </fieldset>
      </form>
    </Flex>
  );
};

export default AddProductForm;
