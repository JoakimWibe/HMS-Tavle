import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Input, Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().required("Epost er obligatorisk").email("Skriv inn en gylding epost adresse"),
  password: yup.string().required("Passord er obligatorisk"),
});

const LoginForm = () => {
  const [fieldset, setFieldset] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    setFieldset(true);
  }
  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Logg inn</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={fieldset}>
            <Box mb={3}>
              <Input mb={2} placeholder="Email" type="email" {...register("email")} />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </Box>
            <Box mb={3}>
              <Input mb={2} {...register("password")} placeholder="Passord" type="password" />
              {errors.password && <FormError>{errors.password.message}</FormError>}
            </Box>

            <Button
              borderRadius="full"
              mb={5}
              bg="primary"
              w="100%"
              color="white"
              _hover={{ bg: "secondary" }}
              isLoading={false}
              loadingText="Logger inn"
              type="submit"
            >
              Logg inn
            </Button>
          </fieldset>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default LoginForm;
