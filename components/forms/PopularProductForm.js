import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Input, Textarea, Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import SuccessMessage from "../common/SuccessMessage";
import ErrorMessage from "../common/ErrorMessage";
import { ORDER_URL } from "../../constants/api";
import { useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
  email: yup.string().required("Epost er obligatorisk").email("Skriv inn en gylding epost adresse"),
  name: yup.string().required("Navn er obligatorisk"),
  amount: yup.string().required("Vennligst velg et antall tavler"),
  product_title: yup.string(),
  comment: yup.string(),
  name: yup.string(),
});

const PopularProductForm = ({ title }) => {
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const response = await axios.post(ORDER_URL, {
        data: {
          product_title: data.product_title,
          amount: data.amount,
          name: data.name,
          company: data.company,
          email: data.email,
          comment: data.comment,
        },
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Kontakt oss for tilbud på dette produktet</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          {success && <SuccessMessage>Meldingen din er sendt.</SuccessMessage>}
          {success === false ?? <ErrorMessage content={"En feil har oppstått"} />}
          <fieldset disabled={true}>
            <Flex mb={5}>
              <Input value={title} type="text" variant={"flushed"} {...register("product_title")} />
            </Flex>
          </fieldset>
          <Box mb={3}>
            <Input mb={2} placeholder="Antall tavler" type="number" {...register("amount")} />
            {errors.amount && <FormError>{errors.amount.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Input mb={2} placeholder="Fullt navn" type="text" {...register("name")} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Input mb={2} placeholder="Firma/organisasjon (valgfri)" type="text" {...register("company")} />
          </Box>
          <Box mb={3}>
            <Input mb={2} placeholder="Epost" type="email" {...register("email")} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Textarea mb={2} placeholder="Kommentar til din forespørsel (valgfri)" type="text" {...register("comment")} />
          </Box>

          <Button type="submit" borderRadius="full" mb={5} bg="primary" w="100%" color="white" _hover={{ bg: "secondary" }}>
            Send forespørsel
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default PopularProductForm;
