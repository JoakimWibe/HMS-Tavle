import { ModalCloseButton, ModalContent, ModalHeader, ModalBody, Input, Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { useState } from "react";
import axios from "axios";
import { LOGIN_URL } from "../../constants/api";
import ErrorMessage from "../common/ErrorMessage";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  email: yup.string().required("Epost er obligatorisk").email("Skriv inn en gylding epost adresse"),
  password: yup.string().required("Passord er obligatorisk").min(4, "Passord må inneholde minst 4 sifre"),
});

const LoginForm = () => {
  const [fieldset, setFieldset] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setFieldset(true);
    setSubmitting(true);

    try {
      const response = await axios.post(LOGIN_URL, {
        identifier: data.email,
        password: data.password,
      });
      setAuth(response.data);
      router.push("/admin");
    } catch (error) {
      setLoginError("Feil epost/passord.");
    } finally {
      setFieldset(false);
      setSubmitting(false);
    }
  }

  return (
    <ModalContent w="sm">
      <ModalHeader color="secondary">Logg inn</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && <ErrorMessage content={loginError} />}
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
              isLoading={submitting}
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
