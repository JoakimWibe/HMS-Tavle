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
  phone: yup.string().required("Telefon er obligatorisk"),
  message: yup.string().required("Meldingsfeltet er tomt"),
});

const ContactForm = () => {
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    try {
      const response = axios.post(CONTACT_URL, {
        data: {
          email: data.email,
          message: data.message,
          name: data.name,
          phone: data.phone,
        },
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Kontakt oss</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          {success && <SuccessMessage>Meldingen din er sendt.</SuccessMessage>}
          {success === false ?? <ErrorMessage content={"En feil har oppstått"} />}
          <Box mb={3}>
            <Input mb={2} placeholder="Navn" type="text" {...register("name")} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Input mb={2} placeholder="Email" type="email" {...register("email")} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Input mb={2} placeholder="Telefon" type="number" {...register("phone")} />
            {errors.phone && <FormError>{errors.phone.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Textarea mb={2} placeholder="Melding" type="text" {...register("message")} />
            {errors.message && <FormError>{errors.message.message}</FormError>}
          </Box>

          <Button type="submit" borderRadius="full" mb={5} bg="primary" w="100%" color="white" _hover={{ bg: "secondary" }}>
            Send
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default ContactForm;
