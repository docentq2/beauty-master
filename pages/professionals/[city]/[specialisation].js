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

import initFirebase from "../../../services/firebase";

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
    <Box width={800} mx="auto">
      <Heading as="h3" size="2xl" mb={30}>
        Город: {city}
      </Heading>
      <Heading as="h3" size="2xl" mb={30}>
        Специализация: {specialisation}
      </Heading>

      {loading
        ? "загружаю"
        : Reflect.ownKeys(masters).map((master) => {
            const masterInstance = masters[master];

            return (
              <Box border="1px solid black" key={master}>
                Город - {masterInstance.city} <br />
                Имя - {masterInstance.name} <br />
                Email - {masterInstance.email} <br />
              </Box>
            );
          })}
    </Box>
  );
}
