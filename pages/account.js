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
  Image,
} from "@chakra-ui/react";
import Router from "next/router";
import { v4 as uuid } from "uuid";

import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Formik, Field, Form, FieldArray } from "formik";
import initFirebase from "../services/firebase-client";
import firebase from "firebase";
import "firebase/storage";
import { useAuth } from "../components/auth";
import nookies from "nookies";
import { verifyIdToken } from "../services/firebase-admin";
import { AccountDefaultLogo } from "../assets/unicorn/account-default-logo";
import {cities, cityMap, professions} from "../components/entities";

initFirebase();

const database = firebase.database();
const storage = firebase.storage();

const TextField = ({ name, title, placeholder, type }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl mt={5} isInvalid={form.errors.name && form.touched.name}>
            <FormLabel htmlFor={name}>{title}</FormLabel>
            <Input
              {...field}
              placeholder={placeholder}
              type={type || "input"}
              id={name}
            />
          </FormControl>
        );
      }}
    </Field>
  );
};

const TextareaField = ({ name, title, placeholder, type }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl mt={5} isInvalid={form.errors.name && form.touched.name}>
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Textarea
            {...field}
            placeholder={placeholder}
            type={type || "input"}
            id={name}
          />
        </FormControl>
      )}
    </Field>
  );
};

const SelectField = ({ name, title, placeholder, options }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl mt={5} isInvalid={form.errors.name && form.touched.name}>
          <FormLabel>{title}</FormLabel>
          <Select {...field} placeholder={placeholder}>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.title}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    </Field>
  );
};
const SwitchField = ({ name, title }) => {
  return (
    <Field name={name} type="checkbox">
      {({ field }) => {
        return (
          <FormControl mt={5} display="flex" alignItems="center">
            <FormLabel htmlFor={name} mb={0}>
              {title}
            </FormLabel>
            <Switch
              {...field}
              id={name}
              colorScheme="green"
              isChecked={field.value}
            />
          </FormControl>
        );
      }}
    </Field>
  );
};

export default function Account({ session }) {
  const { user } = useAuth();

  if (user === null) {
    return (
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="#FFEBEC"
        color="#ff5975"
        size="xl"
      />
    );
  }

  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const [dataForm, setDataForm] = useState({
    uuid: user.uid,
    name: "",
    city: "",
    specialisation: "",
    phone: "",
    logo: "",
    about: "",
    language: "",
    site: "",
    isMaster: false,
    imageExamples: [],
  });

  useEffect(() => {
    var userDataRef = firebase.database().ref("users/" + user.uid);
    userDataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setDataForm({
        ...dataForm,
        ...data,
      });
      setLoading(false);
    });
  }, [user.uid]);

  const toast = useToast();

  const ImageContainer = (props) => {
    return (
      <Box m="0 10px" position="relative">
        <Box
          position="absolute"
          top="5px"
          right="5px"
          bg="white"
          border="1px solid #999"
          borderRadius={2}
        >
          <CloseButton onClick={props.deleteImage} />
        </Box>
        <Box
          width={180}
          height={180}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img src={props.url} alt="" />
        </Box>
      </Box>
    );
  };

  const allFiles = files.map((file, index) => {
    const blobImg = new Blob([file]);
    const url = URL.createObjectURL(blobImg);
    return (
      <ImageContainer
        key={url}
        url={url}
        deleteImage={() => {
          const cloneFiles = [...files];
          cloneFiles.splice(index, 1);
          setFiles(cloneFiles);
        }}
      />
    );
  });

  function uploadImageAsPromise(file) {
    return new Promise(function (resolve, reject) {
      const fileName = uuid();
      const uploadTask = storage.ref(`images/${fileName}`).put(file);

      uploadTask.on(
        "state_changed",
        function progress(snapshot) {
          //todo: надо что то придумать с процентами
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function error(err) {
          reject(err);
        },
        function complete() {
          storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then((url) => {
              resolve(url);
            });
        }
      );
    });
  }

  if (loading) {
    return (
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="#FFEBEC"
        color="#ff5975"
        size="xl"
      />
    );
  }

  return (
    <Flex mx="155px" my="50px" justify="center">
      <Box>
        <Flex
          border="1px solid #E5E5E5"
          borderRadius="50%"
          w="220px"
          h="220px"
          overflow="hidden"
          justify="center"
          align="center"
        >
          <AccountDefaultLogo />
        </Flex>
      </Box>

      <Box>
        <Formik
          initialValues={dataForm}
          onSubmit={async (values, actions) => {
            const filePromises = files.map((file) =>
              uploadImageAsPromise(file)
            );

            const imageExamples = await Promise.all(filePromises);

            const allImageExamples = values.imageExamples.concat(imageExamples);

            database
              .ref("users/" + dataForm.uuid)
              .set({ ...values, imageExamples: allImageExamples }, (error) => {
                if (error) {
                  toast({
                    position: "bottom-left",
                    title: "Ошибка при обновлении",
                    description: "Что-то пошло не так, попробуйте позже",
                    status: "error",
                    duration: 20000,
                    isClosable: true,
                  });
                  console.error("Failed with error: " + error);
                } else {
                  toast({
                    position: "bottom-left",
                    title: "Профиль успешно обновлен",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
                actions.setSubmitting(false);
              });
          }}
        >
          {(props) => (
            <Form>
              <Flex>
                <Box mx="80px" maxW="690px" flexGrow={1}>
                  <Heading mb={10}>Личный кабинет</Heading>
                  {props.values.isMaster && (
                    <>
                      <Text fontSize="20px" fontWeight="bold">
                        Форма для мастеров:
                      </Text>
                      <TextField
                        name="name"
                        title="Имя:"
                        placeholder="Мария Иванова"
                      />
                      <SelectField
                        name="city"
                        title="Город:"
                        placeholder="Город"
                        options={cities.map((city) => ({
                          title: cityMap[city].ru,
                          value: city,
                        }))}
                      />

                      <TextField
                        name="address"
                        title="Рабочий адрес:"
                        placeholder="Берлин, Митте. Германия"
                      />

                      <SelectField
                        name="specialisation"
                        title="Специализация:"
                        placeholder="Специализация"
                        options={professions.map(profession => )}
                      />
                      <TextField
                        name="phone"
                        title="Телефон"
                        placeholder="+79999999999"
                        type="tel"
                      />
                      <TextField
                        name="language"
                        title="Я владею языками:"
                        placeholder="русский, немецкий"
                      />
                      <TextareaField
                        name="about"
                        title="О себе"
                        placeholder={
                          "Привет! Я работаю парикмахером 5 лет. " +
                          'Принимаю у себя в студии "Schöne Haare" по адресу Хауптштрассе 7. ' +
                          "Записывайся!"
                        }
                      />
                      <TextField
                        name="site"
                        title="Личный сайт, соц сеть:"
                        placeholder=""
                      />

                      <FieldArray
                        name="imageExamples"
                        render={(arrayHelpers) => (
                          <>
                            {props.values.imageExamples &&
                              props.values.imageExamples.length > 0 && (
                                <>
                                  <FormLabel>
                                    Загруженные примеры работ:
                                  </FormLabel>
                                  <Flex flexWrap="wrap">
                                    {props.values.imageExamples.map(
                                      (image, index) => (
                                        <ImageContainer
                                          key={image}
                                          url={image}
                                          deleteImage={() => {
                                            arrayHelpers.remove(index);
                                          }}
                                        />
                                      )
                                    )}
                                  </Flex>
                                </>
                              )}
                          </>
                        )}
                      />

                      <Dropzone
                        onDrop={(newFiles) => {
                          setFiles([...files, ...newFiles]);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box>
                            <FormLabel>Загрузите ваши примеры работ:</FormLabel>

                            <Box
                              {...getRootProps()}
                              border="2px dashed #eeeeee"
                              borderRadius="2px"
                              bg="#fafafa"
                              color="#bdbdbd"
                              outline="none"
                              transition="border 0.24s ease-in-out"
                              textAlign="center"
                              padding="20px"
                              my="20px"
                              _focus={{
                                borderColor: "#2196f3",
                              }}
                              _hover={{
                                borderColor: "#2196f3",
                              }}
                            >
                              <input {...getInputProps()} />
                              <Text>
                                Перенесите или нажмите сюда что бы прикрепить
                                фото
                              </Text>
                            </Box>
                            <aside>
                              <Flex flexWrap="wrap">{allFiles}</Flex>
                            </aside>
                          </Box>
                        )}
                      </Dropzone>
                    </>
                  )}
                </Box>
                <Box>
                  <SwitchField name="isMaster" title="Я мастер" />
                </Box>
              </Flex>

              <Box mt={10} textAlign="center" alignSelf="right">
                <Button
                  isLoading={props.isSubmitting}
                  type="submit"
                  bg="linear-gradient(180deg, #FF4F59 0%, rgba(255, 82, 123, 0.85) 100%)"
                  color="white"
                  p="12px 24px"
                  borderRadius="33px"
                  fontSize="20px"
                  lineHeight="26px"
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
                  Обновить профиль
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    await verifyIdToken(cookies.token);
    return { props: { session: true } };
  } catch (err) {
    console.error(err);
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return { props: {} };
  }
}
