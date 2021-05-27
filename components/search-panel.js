import {
  Text,
  Heading,
  Select,
  Flex,
  Spacer,
  Box,
  Button,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  Switch,
  CloseButton,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { cities, cityMap, professionMap, professions } from "./entities";
import { useState } from "react";

export default function SearchPanel() {
  const router = useRouter();
  const { city, specialisation } = router.query;

  const [cityFromState, setCity] = useState(city);
  const [professionFromState, setProfession] = useState(specialisation);

  return (
    <Box maxWidth="1290px" margin="0 auto">
      <Box>
        <Text fontSize="20px">Вы искали</Text>
      </Box>

      <Flex justify="start">
        <Select
          size="lg"
          bg="white"
          borderColor="black"
          w="300px"
          borderRadius="8px"
          onChange={({ target: { value } }) => {
            setCity(value);
            Router.push(`/professionals/${value}/${professionFromState}`);
          }}
          defaultValue={cityFromState}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {cityMap[city].ru}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Мастер"
          size="lg"
          bg="white"
          borderColor="black"
          w="300px"
          borderRadius="8px"
          textTransform="capitalize"
          onChange={({ target: { value } }) => {
            setProfession(value);
            Router.push(`/professionals/${cityFromState}/${value}`);
          }}
          ml="20px"
          defaultValue={professionFromState}
        >
          {professions.map((profession) => (
            <option key={profession} value={profession}>
              {professionMap[profession].ru}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
}
