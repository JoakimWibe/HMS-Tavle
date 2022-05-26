import { Box, Button, Flex, Heading, Input, Radio, RadioGroup, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { useState } from "react";
import SuccessMessage from "../common/SuccessMessage";
import ErrorMessage from "../common/ErrorMessage";
import axios from "axios";
import { CUSTOM_ORDER_URL } from "../../constants/api";

const schema = yup.object().shape({
  radio_1: yup.string().nullable().required("Vennligst velg 1 av alternativene"),
  radio_2: yup.string().nullable().required("Vennligst velg 1 av alternativene"),
  radio_3: yup.string().nullable().required("Vennligst velg 1 av alternativene"),
  name: yup.string(),
  company: yup.string(),
  email: yup.string().required("Epost er obligatorisk").email("Skriv inn en gylding epost adresse"),
  comment: yup.string(),
});

const CustomOrderForm = () => {
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
      const response = await axios.post(CUSTOM_ORDER_URL, {
        data: {
          radio_1: data.radio_1,
          radio_2: data.radio_2,
          radio_3: data.radio_3,
          name: data.name,
          company: data.company,
          email: data.email,
          comment: data.comment,
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
    <Flex direction={"column"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={sending}>
          <Box mb={10}>
            <RadioGroup mb={3}>
              <Heading as={"h3"} fontSize={"lg"} mb={3}>
                Hva slags festemekanisme ønsker du på tavlen?
              </Heading>
              <Stack direction="column">
                <Radio {...register("radio_1")} value="klipsrammer">
                  Klipsrammer
                </Radio>
                <Radio {...register("radio_1")} value="ringpermholdere">
                  Ringpermholdere
                </Radio>
                <Radio {...register("radio_1")} value="klyper">
                  Klyper
                </Radio>
                <Radio {...register("radio_1")} value="plastboks">
                  Plastboks
                </Radio>
              </Stack>
            </RadioGroup>
            {errors.radio_1 && <FormError>{errors.radio_1.message}</FormError>}
          </Box>

          <Box mb={10}>
            <RadioGroup mb={3}>
              <Heading as={"h3"} fontSize={"lg"} mb={3}>
                Merk av om du ønsker følgende installasjon på tavlen
              </Heading>
              <Stack direction="column">
                <Radio {...register("radio_2")} value="brannskadeskrin">
                  Brannskadeskrin
                </Radio>
                <Radio {...register("radio_2")} value="førstehjelpskoffert">
                  Førstehjelpskoffert
                </Radio>
                <Radio {...register("radio_2")} value="ispose">
                  Ispose
                </Radio>
                <Radio {...register("radio_2")} value="førstehjelpsstasjon">
                  Førstehjelpsstasjon
                </Radio>
              </Stack>
            </RadioGroup>
            {errors.radio_2 && <FormError>{errors.radio_2.message}</FormError>}
          </Box>

          <Box>
            <RadioGroup mb={3}>
              <Heading as={"h3"} fontSize={"lg"} mb={3}>
                Hvordan fant du frem til hmstavle.no?
              </Heading>
              <Stack direction="column">
                <Radio {...register("radio_3")} value="nettsøk">
                  Nettsøk
                </Radio>
                <Radio {...register("radio_3")} value="annonse på bygg.no">
                  Annonse på Bygg.no
                </Radio>
                <Radio {...register("radio_3")} value="facebook">
                  Facebook
                </Radio>
              </Stack>
            </RadioGroup>
            {errors.radio_3 && <FormError>{errors.radio_3.message}</FormError>}
          </Box>

          <Box mb={3} mt={10}>
            <Input mb={2} placeholder="Navn (valgfri)" type="text" {...register("name")} />
          </Box>

          <Box mb={3}>
            <Input mb={2} placeholder="Firma (valgfri)" type="text" {...register("company")} />
          </Box>

          <Box mb={3}>
            <Input mb={2} placeholder="Epost" type="email" {...register("email")} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </Box>

          <Box mb={3}>
            <Textarea mb={2} placeholder="Kommentar (valgfri)" type="text" {...register("comment")} />
          </Box>

          <Button
            isLoading={sending}
            loadingText="Sender..."
            type="submit"
            borderRadius="full"
            mb={10}
            bg="primary"
            w="100%"
            color="white"
            _hover={{ bg: "secondary" }}
          >
            Send
          </Button>
        </fieldset>
        {success && <SuccessMessage>Sendt</SuccessMessage>}
        {errorMessage && <ErrorMessage content={errorMessage} />}
      </form>
    </Flex>
  );
};

export default CustomOrderForm;
