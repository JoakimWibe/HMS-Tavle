import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Flex, Input, Textarea, Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";

const schema = yup.object().shape({
  email: yup.string().required("Epost er obligatorisk").email("Skriv inn en gylding epost adresse"),
  name: yup.string().required("Navn er obligatorisk"),
  amount: yup.string().required("Vennligst velg et antall tavler"),
});

const PopularProductForm = ({ title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Kontakt oss for tilbud på dette produktet</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={true}>
            <Flex mb={5}>
              <Input value={title} type="text" variant={"flushed"} />
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
            <Input mb={2} placeholder="Firma/organisasjon (valgfri)" type="text" />
          </Box>
          <Box mb={3}>
            <Input mb={2} placeholder="Epost" type="email" {...register("email")} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </Box>
          <Box mb={3}>
            <Textarea mb={2} placeholder="Kommentar til din forespørsel (valgfri)" type="text" />
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
