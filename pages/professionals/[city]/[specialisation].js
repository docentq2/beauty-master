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
  Spinner,
  CloseButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Formik, Field, Form, FieldArray } from "formik";
import firebase from "firebase";
import "firebase/storage";
import nookies from "nookies";
import initFirebase from "../../../services/firebase-client";
import SearchItem from "../../../components/search-item";

initFirebase();

const database = firebase.database();
const storage = firebase.storage();

export default function SearchBySpecialisation() {
  const router = useRouter();
  const { city, specialisation } = router.query;

  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city || !specialisation) {
      setLoading(false);
      return;
    }

    const userDataRef = firebase
      .database()
      .ref("users")
      .orderByChild("city")
      .equalTo(city);

    userDataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setMasters(
        Object.values(data).filter(
          (master) => master.specialisation === specialisation
        )
      );
      setLoading(false);
    });
  }, [city]);

  if (loading) {
    return (
      <Box textAlign="center" mt="20px" fontSize="30px" color="#333">
        Загрузка...
      </Box>
    );
  }

  if (masters.length === 0) {
    return (
      <Box textAlign="center" mt="20px" fontSize="30px" color="#333">
        Мастеров нет
      </Box>
    );
  }

  return (
    <Flex
      maxW="1290px"
      mx="auto"
      pt="150px"
      flexWrap="wrap"
      justify="space-between"
    >
      {masters.map((master) => (
        <SearchItem {...master} />
      ))}
    </Flex>
  );
}
