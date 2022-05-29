import { Box, Button, Flex, Input, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Textarea } from "@chakra-ui/react";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";
import { PRODUCTS_URL } from "../../constants/api";
import axios from "axios";
import ErrorMessage from "../common/ErrorMessage";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import SuccessMessage from "../common/SuccessMessage";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const schema = yup.object().shape({
  name: yup.string().required("Navn er obligatorisk"),
  desc: yup.string().required("Beskrivelse er obligatorisk"),
  image_url: yup.string().matches(URL, "legg til gyldig URL").required(),
  image_alt_text: yup.string().required("Alt text er obligatorisk"),
});

const EditProductForm = ({ title, description, imageUrl, imageAltText, id }) => {
  const [updating, setUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [auth] = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateProduct = async (data) => {
    const url = PRODUCTS_URL + id;

    if (confirm("Er du sikker på at du vil oppdatere dette produktet?")) {
      try {
        const response = await axios.put(
          url,
          {
            data: {
              name: data.name,
              image_url: data.image_url,
              image_alt_text: data.image_alt_text,
              description: data.desc,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        setUpdating(true);
        setSuccess(true);
        router.push(`/bestselgere/${id}`);
      } catch (error) {
        setErrorMessage("En feil har oppstått.");
      } finally {
        setUpdating(false);
      }
    }
  };

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Rediger produkt</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex direction={"column"}>
          <form onSubmit={handleSubmit(updateProduct)}>
            <fieldset disabled={updating}>
              {success && <SuccessMessage>Produkt Oppdatert</SuccessMessage>}
              {errorMessage && <ErrorMessage content={errorMessage} />}
              <Box mb={3}>
                <Input {...register("name")} _placeholder={{ color: "text" }} borderColor={"primary"} mb={2} type="text" defaultValue={title} />
                {errors.name && <FormError>{errors.name.message}</FormError>}
              </Box>

              <Box mb={3}>
                <Textarea
                  {...register("desc")}
                  _placeholder={{ color: "text" }}
                  borderColor={"primary"}
                  mb={2}
                  type="text"
                  defaultValue={description}
                />
                {errors.desc && <FormError>{errors.desc.message}</FormError>}
              </Box>

              <Box mb={3}>
                <Input
                  {...register("image_url")}
                  _placeholder={{ color: "text" }}
                  borderColor={"primary"}
                  mb={2}
                  type="text"
                  defaultValue={imageUrl}
                />
                {errors.image_url && <FormError>{errors.image_url.message}</FormError>}
              </Box>

              <Box mb={3}>
                <Input
                  {...register("image_alt_text")}
                  _placeholder={{ color: "text" }}
                  borderColor={"primary"}
                  mb={2}
                  type="text"
                  defaultValue={imageAltText}
                />
                {errors.image_alt_text && <FormError>{errors.image_alt_text.message}</FormError>}
              </Box>

              <Button
                isLoading={updating}
                loadingText={"oppdaterer..."}
                type="submit"
                borderRadius="full"
                mb={5}
                bg="primary"
                w="100%"
                color="white"
                _hover={{ bg: "secondary" }}
              >
                Oppdater
              </Button>
            </fieldset>
          </form>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

EditProductForm.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageAltText: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default EditProductForm;
