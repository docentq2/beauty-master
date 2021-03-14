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
import Router from "next/router";
import { v4 as uuid } from "uuid";

import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Formik, Field, Form, FieldArray } from "formik";
import firebase from "firebase";
import "firebase/storage";
import nookies from "nookies";
import initFirebase from "../../services/firebase-client";

initFirebase();

const database = firebase.database();
const storage = firebase.storage();

export default function Search() {
  useEffect(() => {
    var userDataRef = firebase
      .database()
      .ref("users")
      .orderByChild("specialisation")
      .equalTo("fingers");

    userDataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
      // setLoading(false);
    });
  }, []);

  return <>hello</>;
}
