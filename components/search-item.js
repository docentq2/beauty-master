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

export default function SearchItem(props) {
  const {
    uuid,
    avatar = "https://fakeimg.pl/300/",
    name = "Имя",
    location = "Город",
    language = "русский, немецкий",
    services = "услуги",
    prices = [],
  } = props;

  return (
    <Box
      flexBasis="630px"
      mb="30px"
      p="53px"
      background="#FFFFFF"
      borderRadius="8px"
      boxShadow="1px 1px 15px rgba(0, 0, 0, 0.17)"
    >
      <Flex>
        <Box>
          <Box borderRadius="50%" width={220} height={220} overflow="hidden">
            <img src={avatar} />
          </Box>
        </Box>

        <Box margin="0 44px 39px 27px">
          <Link href={`/professional/${uuid}`}>
            <a>
              <Heading as="h2" fontSize="30px">
                {name}
              </Heading>
            </a>
          </Link>

          <Text fontWeight="bold" fontSize="18px" my="19px">
            {location}
          </Text>

          <Text fontSize="14px" margin="23px 0 0 28px">
            <b>Языки:</b> {language}
          </Text>

          <Text fontSize="14px" margin="20px 0 0 28px">
            <b>Услуги:</b> {services}
          </Text>

          {prices.map((price) => {
            return (
              <Text
                textAlign="right"
                fontSize="20px"
                mt="28px"
                color="#FF5975"
                fontWeight="bold"
              >
                {price}
              </Text>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}
