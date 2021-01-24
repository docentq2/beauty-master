import {
  Text,
  Heading,
  Select,
  Flex,
  Spacer,
  Box,
  Button,
} from "@chakra-ui/react";

import Link from "next/link";

export default function Main() {
  return (
    <div className="main">
      <header className="header">
        <div className="header_about">
          <div className="header_logo"></div>
          <div className="header_name">Название</div>
        </div>

        <div className="header_links">
          <a href="#" className="header_linkItem">
            Войти
          </a>
          <Link href="/sign-in" className="header_linkItem">
            Регистрация
          </Link>
          <a href="#" className="header_linkItem">
            Стать мастером
          </a>
        </div>
      </header>

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
            >
              <option value="option1">Берлин</option>
              <option value="option2">Берлин 2</option>
              <option value="option3">Берлин 3</option>
            </Select>
            <Spacer />
            <Select
              placeholder="Мастер"
              size="lg"
              bg="white"
              borderColor="white"
              w="300px"
              borderRadius="33px"
            >
              <option value="option1">Мастер по маникюру</option>
              <option value="option2">Мастер по волосам</option>
              <option value="option3">Мастер по коже</option>
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
          >
            Поиск
          </Button>
        </div>
      </Box>

      <style jsx>
        {`
          .main {
            height: 900px;
            background: linear-gradient(
              287.8deg,
              #fadadc 31.34%,
              #fff9f9 99.46%
            );
          }

          .header {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .header_about {
            display: flex;
            align-items: center;
          }

          .header_logo {
            width: 64px;
            height: 64px;
            background: #ff5975;
            border-radius: 50%;
            margin-right: 14px;
          }

          .header_name {
          }

          .header_links {
            display: flex;
          }

          .header_linkItem {
            margin: 0 20px;
            color: black;
          }
        `}
      </style>
    </div>
  );
}
