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
  Link,
} from "@chakra-ui/react";

export default function ProfessionalId() {
  return (
    <Box maxW="1353px" margin="71px auto 0">
      <Flex padding="0 30px">
        <Box flexGrow={0}>
          <Box borderRadius="50%" width={220} height={220} overflow="hidden">
            <img src="https://fakeimg.pl/300/" />
          </Box>
        </Box>
        <Box padding="9px 78px">
          <Heading>Парикмахер Ева Мюллер</Heading>
          <Heading as="h3" fontSize="20px" my="14px">
            Берлин, Митте. Германия
          </Heading>
          <Text my="21px">
            Привет! Я - Ева, работаю парикмахером 5 лет. Принимаю у себя в
            студии “Schöne Haare” по адресу Хауптштрассе 7. Записывайся!
          </Text>
          <Text>🇷🇺&nbsp;&nbsp;Я владею языкамии: русский, немецкий.</Text>
        </Box>
        <Box width="233px" flexShrink="0" textAlign="center" mt="13px">
          <Button
            bg="linear-gradient(180deg, #FF4F59 0%, rgba(255, 82, 123, 0.85) 100%)"
            color="white"
            p="12px 0"
            width="100%"
            borderRadius="33px"
            fontSize="20px"
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
            Написать мастеру
          </Button>
          <Button
            my="20px"
            border="1px solid #000"
            borderRadius="33px"
            padding="27px 0"
            width="100%"
            fontSize="14px"
            fontWeight="400"
            bg="#fff"
            _hover={{
              bg: "#f9d7d9",
              border: "1px solid #fff",
            }}
            _active={{
              bg: "#fff",
            }}
          >
            Показать номер телефона <br />
            +49 160 12-3...
          </Button>
          <Link
            href="http://www.haarevoneva.de"
            color="#3446E9"
            fontSize="14px"
            target="_blank"
          >
            www.haarevoneva.de
          </Link>
        </Box>
      </Flex>

      <Heading as="h4" textAlign="center" fontSize="20px" mt="89px" mb="39px">
        Портфолио
      </Heading>

      <Flex width="100%" overflowX="auto">
        <Box
          margin="0 20px"
          flexShrink="0"
          borderRadius="20px"
          overflow="hidden"
        >
          <img src="https://fakeimg.pl/300x400/" />
        </Box>
        <Box
          margin="0 20px"
          flexShrink="0"
          borderRadius="20px"
          overflow="hidden"
        >
          <img src="https://fakeimg.pl/300x400/" />
        </Box>
        <Box
          margin="0 20px"
          flexShrink="0"
          borderRadius="20px"
          overflow="hidden"
        >
          <img src="https://fakeimg.pl/300x400/" />
        </Box>
        <Box
          margin="0 20px"
          flexShrink="0"
          borderRadius="20px"
          overflow="hidden"
        >
          <img src="https://fakeimg.pl/300x400/" />
        </Box>
        <Box
          margin="0 20px"
          flexShrink="0"
          borderRadius="20px"
          overflow="hidden"
        >
          <img src="https://fakeimg.pl/300x400/" />
        </Box>
        <Box
          margin="0 20px"
          flexShrink="0"
          borderRadius="20px"
          overflow="hidden"
        >
          <img src="https://fakeimg.pl/300x400/" />
        </Box>
        <Box
          margin="0 20px"
          flexShrink="0"
          borderRadius="20px"
          overflow="hidden"
        >
          <img src="https://fakeimg.pl/300x400/" />
        </Box>
      </Flex>

      <Heading as="h4" textAlign="center" fontSize="20px" mt="102px" mb="47§px">
        Услуги и цены
      </Heading>

      <Flex justify="space-around">
        <Box textAlign="center" mx="20px">
          <Text fontSize="36px" fontWeight="bold">
            от 38€
          </Text>
          <Text fontSize="17px" fontWeight="bold">
            Стрижка
          </Text>
          <Text fontSize="17px">🕓&nbsp;&nbsp;20-30 мин</Text>
        </Box>

        <Box textAlign="center" mx="20px">
          <Text fontSize="36px" fontWeight="bold">
            от 38€
          </Text>
          <Text fontSize="17px" fontWeight="bold">
            Стрижка
          </Text>
          <Text fontSize="17px">🕓&nbsp;&nbsp;20-30 мин</Text>
        </Box>

        <Box textAlign="center" mx="20px">
          <Text fontSize="36px" fontWeight="bold">
            от 38€
          </Text>
          <Text fontSize="17px" fontWeight="bold">
            Стрижка
          </Text>
          <Text fontSize="17px">🕓&nbsp;&nbsp;20-30 мин</Text>
        </Box>

        <Box textAlign="center" mx="20px">
          <Text fontSize="36px" fontWeight="bold">
            от 38€
          </Text>
          <Text fontSize="17px" fontWeight="bold">
            Стрижка
          </Text>
          <Text fontSize="17px">🕓&nbsp;&nbsp;20-30 мин</Text>
        </Box>

        <Box textAlign="center" mx="20px">
          <Text fontSize="36px" fontWeight="bold">
            от 38€
          </Text>
          <Text fontSize="17px" fontWeight="bold">
            Стрижка
          </Text>
          <Text fontSize="17px">🕓&nbsp;&nbsp;20-30 мин</Text>
        </Box>
      </Flex>
    </Box>
  );
}
