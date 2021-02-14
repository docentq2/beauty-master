import { useRouter } from "next/router";
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
import firebase from "firebase";
import { useState, useEffect } from "react";

import initFirebase from "../../../services/firebase-client";

initFirebase();

const database = firebase.database();

export default function Specialisation() {
  const router = useRouter();
  const { city, specialisation } = router.query;

  const [masters, setMasters] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    database
      .ref("users")
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
        setMasters(snapshot.val());
        setLoading(false);
      });
  }, [city, specialisation]);

  return (
    <Box bg="#FFEBEC" minHeight="100vh" height="100%">
      <Box maxW="1290px" mx="auto" pt="150px">
        <Flex flexWrap="wrap" justify="space-between">
          <Box
            flexBasis="630px"
            mb="30px"
            background="#FFFFFF"
            borderRadius="20px"
          >
            <Flex>
              <Box margin="53px 0 0 53px">
                <Box
                  borderRadius="50%"
                  width={220}
                  height={220}
                  overflow="hidden"
                >
                  <img src="https://fakeimg.pl/300/" />
                </Box>
              </Box>

              <Box margin="53px 44px 39px 27px">
                <Heading as="h2" fontSize="30px">
                  Парикмахер Ева Мюллер
                </Heading>

                <Text fontWeight="bold" fontSize="18px" my="19px">
                  Берлин, Митте. Германия
                </Text>

                <Text fontSize="14px" margin="23px 0 0 28px">
                  <b>Языки:</b> русский, немецкий, японский, французский,
                  китайский, африкаанс.
                </Text>

                <Text fontSize="14px" margin="20px 0 0 28px">
                  <b>Услуги:</b> Стрижка, окрашивание, прически, колорирование,
                  укладка, косички, маски.
                </Text>

                <Text
                  textAlign="right"
                  fontSize="20px"
                  mt="28px"
                  color="#FF5975"
                  fontWeight="bold"
                >
                  от 38€
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box
            flexBasis="630px"
            mb="30px"
            background="#FFFFFF"
            borderRadius="20px"
          >
            <Flex>
              <Box margin="53px 0 0 53px">
                <Box
                  borderRadius="50%"
                  width={220}
                  height={220}
                  overflow="hidden"
                >
                  <img src="https://fakeimg.pl/300/" />
                </Box>
              </Box>

              <Box margin="53px 44px 39px 27px">
                <Heading as="h2" fontSize="30px">
                  Парикмахер Ева Мюллер
                </Heading>

                <Text fontWeight="bold" fontSize="18px" my="19px">
                  Берлин, Митте. Германия
                </Text>

                <Text fontSize="14px" margin="23px 0 0 28px">
                  <b>Языки:</b> русский, немецкий, японский, французский,
                  китайский, африкаанс.
                </Text>

                <Text fontSize="14px" margin="20px 0 0 28px">
                  <b>Услуги:</b> Стрижка, окрашивание, прически, колорирование,
                  укладка, косички, маски.
                </Text>

                <Text
                  textAlign="right"
                  fontSize="20px"
                  mt="28px"
                  color="#FF5975"
                  fontWeight="bold"
                >
                  от 38€
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box
            flexBasis="630px"
            mb="30px"
            background="#FFFFFF"
            borderRadius="20px"
          >
            <Flex>
              <Box margin="53px 0 0 53px">
                <Box
                  borderRadius="50%"
                  width={220}
                  height={220}
                  overflow="hidden"
                >
                  <img src="https://fakeimg.pl/300/" />
                </Box>
              </Box>

              <Box margin="53px 44px 39px 27px">
                <Heading as="h2" fontSize="30px">
                  Парикмахер Ева Мюллер
                </Heading>

                <Text fontWeight="bold" fontSize="18px" my="19px">
                  Берлин, Митте. Германия
                </Text>

                <Text fontSize="14px" margin="23px 0 0 28px">
                  <b>Языки:</b> русский, немецкий, японский, французский,
                  китайский, африкаанс.
                </Text>

                <Text fontSize="14px" margin="20px 0 0 28px">
                  <b>Услуги:</b> Стрижка, окрашивание, прически, колорирование,
                  укладка, косички, маски.
                </Text>

                <Text
                  textAlign="right"
                  fontSize="20px"
                  mt="28px"
                  color="#FF5975"
                  fontWeight="bold"
                >
                  от 38€
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
