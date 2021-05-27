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
  Image,
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
import { NotFoundUnicorn } from "../assets/unicorn/not-found";

export default function MasterNotFound() {
  return (
    <Box maxWidth="800px" margin="0 auto">
      <Flex py="33px" justify="center">
        <NotFoundUnicorn />
      </Flex>

      <Box>
        <Text>
          <b>
            К сожалению, мы не нашли нужного вам мастера в этом городе либо он
            еще не зарегистрировался.
          </b>{" "}
          Попробуйте соседние населенные пункты.
          <br />
          <br />
          <b>Хотите помочь другим находить мастеров?</b> Если вы знакомы с
          хорошими бьюти-специалистами в Германии, пожалуйста, поделитесь с ними
          ссылкой на этот сайт.
        </Text>
      </Box>
    </Box>
  );
}
