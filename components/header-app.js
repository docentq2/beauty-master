import { Flex, Box } from "@chakra-ui/react";

import Link from "next/link";

export default function HeaderApp() {
  return (
    <Flex
      maxWidth="1400px"
      margin="0 auto"
      padding="20px 54px"
      alignItems="center"
      justifyContent="space-between"
      bg="#fadadc"
    >
      <Flex alignItems="center">
        <Box
          width="64px"
          height="64px"
          background="#ff5975"
          borderRadius="50%"
          marginRight="14px"
        ></Box>
        <Box>Название</Box>
      </Flex>

      <Flex>
        <Box margin="0 20px" color="black">
          <Link href="#">
            <a>Войти</a>
          </Link>
        </Box>
        <Box margin="0 20px" color="black">
          <Link href="/sign-in">
            <a>Регистрация</a>
          </Link>
        </Box>
        <Box margin="0 20px" color="black">
          <Link href="#">
            <a>Стать мастером</a>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}
