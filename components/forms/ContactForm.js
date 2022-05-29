import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Input, Textarea, Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { useState } from "react";
import axios from "axios";
import { CONTACT_URL } from "../../constants/api";
import SuccessMessage from "../common/SuccessMessage";
import ErrorMessage from "../common/ErrorMessage";

const schema = yup.object().shape({
  name: yup.string().required("Navn er obligatorisk"),
  email: yup.string().required("Epost er obligatorisk").email("Skriv inn en gylding epost adresse"),
  phone: yup
    .string()
    .required("Telefon er obligatorisk")
    .matches(/^[0-9]+$/, "Må være et nummer")
    .min(5, "Må inneholde 8 siffre")
    .max(12, "Kan ikke inneholde mer enn 12 sifre"),
  message: yup.string().required("Meldingsfeltet er tomt"),
});

const ContactForm = () => {
  const [success, setSuccess] = useState(null);
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
      const response = await axios.post(CONTACT_URL, {
        data: {
          email: data.email,
          message: data.message,
          name: data.name,
          phone: data.phone,
        },
      });
      setSuccess(true);
      setSending(true);
      reset();
    } catch (error) {
      setErrorMessage("En feil har oppstått.");
    } finally {
      setSending(false);
    }
  }

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Kontakt oss</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          {success && <SuccessMessage>Meldingen din er sendt.</SuccessMessage>}
          {errorMessage && <ErrorMessage content={errorMessage} />}
          <fieldset disabled={sending}>
            <Box mb={3}>
              <Input _placeholder={{ color: "text" }} borderColor={"primary"} mb={2} placeholder="Navn" type="text" {...register("name")} />
              {errors.name && <FormError>{errors.name.message}</FormError>}
            </Box>
            <Box mb={3}>
              <Input _placeholder={{ color: "text" }} borderColor={"primary"} mb={2} placeholder="Email" type="email" {...register("email")} />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </Box>
            <Box mb={3}>
              <Input _placeholder={{ color: "text" }} borderColor={"primary"} mb={2} placeholder="Telefon" {...register("phone")} />
              {errors.phone && <FormError>{errors.phone.message}</FormError>}
            </Box>
            <Box mb={3}>
              <Textarea _placeholder={{ color: "text" }} borderColor={"primary"} mb={2} placeholder="Melding" type="text" {...register("message")} />
              {errors.message && <FormError>{errors.message.message}</FormError>}
            </Box>

            <Button
              isLoading={sending}
              loadingText="Sender..."
              type="submit"
              borderRadius="full"
              mb={5}
              bg="primary"
              w="100%"
              color="white"
              _hover={{ bg: "secondary" }}
            >
              Send
            </Button>
          </fieldset>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default ContactForm;
