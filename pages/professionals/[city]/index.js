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
import SearchPanel from "../../../components/search-panel";

initFirebase();

const database = firebase.database();
const storage = firebase.storage();

export default function SearchByCity() {
  const router = useRouter();
  const { city } = router.query;

  const [masters, setMasters] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      return;
    }
    const userDataRef = firebase
      .database()
      .ref("users")
      .orderByChild("city")
      .equalTo(city);

    userDataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setMasters(data);
      setLoading(false);
    });
  }, [city]);

  if (masters === null) {
    return <>Загрузка...</>;
  }

  return (
    <Box>
      <SearchPanel />
      <Flex
        maxW="1290px"
        mx="auto"
        pt="150px"
        flexWrap="wrap"
        justify="space-between"
      >
        {Object.values(masters).map((master, index) => (
          <SearchItem key={index} {...master} />
        ))}
      </Flex>
    </Box>
  );
}
