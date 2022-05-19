import { Box, Button, Checkbox, CheckboxGroup, Flex, FormLabel, Input, Radio, RadioGroup, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CUSTOM_ORDER_URL } from "../../constants/api";

const schema = yup.object().shape({
  name: yup.string().required("Navn er obligatorisk"),
  email: yup.string().required("Epost er obligatorisk").email("Skriv inn en gylding epost adresse"),
  phone: yup.string().required("Telefon er obligatorisk"),
  message: yup.string().required("Meldingsfeltet er tomt"),
});

const CustomOrderForm = () => {
  const [value, setValue] = useState("");
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
      const response = await axios.post(CUSTOM_ORDER_URL, {
        data: {},
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }
  return (
    <Flex>
      <form>
        <CheckboxGroup>
          <FormLabel fontWeight={"bold"}>Hva slags festemekanisme ønsker du på tavlen?</FormLabel>
          <Stack direction={"column"} mb={10}>
            <Checkbox value="klipsrammer">Klipsrammer</Checkbox>
            <Checkbox value="klyper">Klyper</Checkbox>
            <Checkbox value="ringpermholdere">Ringpermholdere</Checkbox>
            <Checkbox value="plastboks">Plastboks</Checkbox>
          </Stack>
        </CheckboxGroup>

        <CheckboxGroup>
          <FormLabel fontWeight={"bold"}>Merk av om du ønsker noen av følgende installasjoner på tavlen</FormLabel>
          <Stack direction={"column"} mb={10}>
            <Checkbox value="brannskadeskrin">Brannskadeskrin</Checkbox>
            <Checkbox value="førstehjelpskoffert">Førstehjelpskoffert</Checkbox>
            <Checkbox value="ispose">Ispose</Checkbox>
            <Checkbox value="førstehjelpsstasjon">Førstehjelpsstasjon</Checkbox>
          </Stack>
        </CheckboxGroup>

        <RadioGroup onChange={setValue} value={value}>
          <FormLabel fontWeight={"bold"}>Hvordan fant du frem til hmstavle.no?</FormLabel>
          <Stack direction="column">
            <Radio value="nettsøk">Nettsøk</Radio>
            <Radio value="annonse på bygg.no">Annonse på bygg.no</Radio>
            <Radio value="facebook">Facebook</Radio>
          </Stack>
        </RadioGroup>

        <Box mb={3} mt={10}>
          <Input mb={2} placeholder="Navn" type="text" />
        </Box>

        <Box mb={3}>
          <Input mb={2} placeholder="Firma" type="text" />
        </Box>

        <Box mb={3}>
          <Input mb={2} placeholder="Epost" type="email" />
        </Box>

        <Box mb={3}>
          <Textarea mb={2} placeholder="Kommentar" type="text" />
        </Box>

        <Button type="submit" borderRadius="full" mb={10} bg="primary" w="100%" color="white" _hover={{ bg: "secondary" }}>
          Send
        </Button>
      </form>
    </Flex>
  );
};

export default CustomOrderForm;
