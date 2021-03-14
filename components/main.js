import {
  Text,
  Heading,
  Select,
  Flex,
  Spacer,
  Box,
  Button,
} from "@chakra-ui/react";

import { useState } from "react";
import Router from "next/router";
import { cities, cityMap, professions, professionMap } from "./entities";

export default function Main() {
  const [city, setCity] = useState(null);
  const [profession, setProfession] = useState(null);

  return (
    <Box
      height="900px"
      background="linear-gradient(287.8deg, #fadadc 31.34%, #fff9f9 99.46%)"
      pt="1px"
    >
      <Box
        className="search"
        maxW="620px"
        margin="300px auto 0"
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={30}>
          Найди своего мастера в Германии
        </Heading>

        <div>
          <Text textAlign="left" color="#848484" fontSize={18} mb={2}>
            Где и что ищем?
          </Text>

          <Flex>
            <Select
              placeholder="Город"
              size="lg"
              bg="white"
              borderColor="white"
              w="300px"
              borderRadius="33px"
              onChange={({ target: { value } }) => {
                setCity(value);
              }}
            >
              {cities.map((city) => (
                <option value={city}>{cityMap[city].ru}</option>
              ))}
            </Select>
            <Spacer />
            <Select
              placeholder="Мастер"
              size="lg"
              bg="white"
              borderColor="white"
              w="300px"
              borderRadius="33px"
              textTransform="capitalize"
              onChange={({ target: { value } }) => {
                setProfession(value);
              }}
            >
              {professions.map((profession) => (
                <option value={profession}>
                  {professionMap[profession].ru}
                </option>
              ))}
            </Select>
          </Flex>
          <Button
            mt={10}
            bg="linear-gradient(180deg, #FF4F59 0%, rgba(255, 82, 123, 0.85) 100%)"
            color="white"
            p="12px 100px"
            borderRadius="33px"
            fontSize="24px"
            lineHeight="30px"
            height="auto"
            _hover={{
              bg:
                "linear-gradient(180deg, #da414a 0%, rgba(255, 82, 123, 0.95) 100%)",
            }}
            _active={{
              bg:
                "linear-gradient(180deg, #FF4F59 0%, rgba(255, 82, 123, 0.85) 100%)",
            }}
            isDisabled={city === null || profession === null}
            onClick={() => {
              Router.push(`/professionals/${city}/${profession}`);
            }}
          >
            Поиск
          </Button>
        </div>
      </Box>
    </Box>
  );
}
