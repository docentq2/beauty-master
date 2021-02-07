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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Formik, Field, Form } from "formik";
import initFirebase from "../services/firebase";
import firebase from "firebase";
import { v4 as uuid } from "uuid";

initFirebase();

const database = firebase.database();

const TextField = ({ name, title, placeholder, type, onChange, values }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors.name && form.touched.name}>
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Input
            {...field}
            placeholder={placeholder}
            type={type || "input"}
            id={name}
            onChange={onChange(name)}
            value={values && values[name]}
          />
        </FormControl>
      )}
    </Field>
  );
};

const TextareaField = ({
  name,
  title,
  placeholder,
  type,
  onChange,
  values,
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors.name && form.touched.name}>
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Textarea
            {...field}
            placeholder={placeholder}
            type={type || "input"}
            id={name}
            onChange={onChange(name)}
            value={values && values[name]}
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
        <FormControl isInvalid={form.errors.name && form.touched.name}>
          <FormLabel>{title}</FormLabel>
          <Select {...field} placeholder={placeholder}>
            {options.map((option) => (
              <option key={option.title}>{option.title}</option>
            ))}
          </Select>
        </FormControl>
      )}
    </Field>
  );
};

export default function SignIn() {
  const [files, setFiles] = useState([]);
  const [dataForm, setDataForm] = useState({
    email: "",
    name: "",
    city: "",
    specialisation: "",
    phone: "",
    logo: "",
    about: "",
    language: "",
    site: "",
  });

  const toast = useToast();

  const allFiles = files.map((file, index) => {
    const blobImg = new Blob([file]);
    const url = URL.createObjectURL(blobImg);
    return (
      <Box key={file.name} m="0 10px" position="relative">
        <Box
          position="absolute"
          top="5px"
          right="5px"
          bg="white"
          border="1px solid #999"
          borderRadius={2}
        >
          <CloseButton
            onClick={() => {
              const cloneFiles = [...files];
              cloneFiles.splice(index, 1);
              setFiles(cloneFiles);
            }}
          />
        </Box>
        <Box
          width={180}
          height={180}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img src={url} alt="" />
        </Box>
      </Box>
    );
  });

  const onChange = (name) => ({ target }) =>
    setDataForm({ ...dataForm, [name]: target.value });

  return (
    <Box maxW={600} m="100px auto 200px">
      <Heading mb={10}>Регистрация мастера</Heading>

      <Formik
        initialValues={dataForm}
        onSubmit={(values, actions) => {
          database.ref("users/" + uuid()).set(dataForm, (error) => {
            if (error) {
              toast({
                position: "bottom-left",
                title: "Ошибка при регистрации",
                description: "Что-то пошло не так, попробуйте позже",
                status: "error",
                duration: 20000,
                isClosable: true,
              });
              console.error("Failed with error: " + error);
            } else {
              toast({
                position: "bottom-left",
                title: "Регистрация прошла успешно",
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
            <TextField
              name="email"
              title="Email:"
              placeholder="maria1977@gmail.com"
              onChange={onChange}
              value={props.values || {}}
            />
            <TextField
              name="name"
              title="Имя:"
              placeholder="Мария Иванова"
              onChange={onChange}
              value={props.values || {}}
            />
            <TextField
              name="city"
              title="Местоположение:"
              placeholder="Берлин, Митте. Германия"
              onChange={onChange}
              value={props.values || {}}
            />
            <SelectField
              name="specialisation"
              title="Специализация:"
              placeholder="Специализация"
              options={[
                { title: "Ногти" },
                { title: "Волосы" },
                { title: "Кожа" },
                { title: "Глаза" },
              ]}
            />
            <TextField
              name="phone"
              title="Телефон"
              placeholder="+79999999999"
              type="tel"
              onChange={onChange}
              value={props.values || {}}
            />
            <TextField
              name="language"
              title="Я владею языками:"
              placeholder="русский, немецкий"
              onChange={onChange}
              value={props.values || {}}
            />
            <TextareaField
              name="about"
              title="О себе"
              placeholder={
                "Привет! Я работаю парикмахером 5 лет. " +
                'Принимаю у себя в студии "Schöne Haare" по адресу Хауптштрассе 7. ' +
                "Записывайся!"
              }
              onChange={onChange}
              value={props.values || {}}
            />
            <TextField
              name="site"
              title="Личный сайт, соц сеть:"
              placeholder=""
              onChange={onChange}
              value={props.values || {}}
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
                      Перенесите или нажмите сюда что бы прикрепить фото
                    </Text>
                  </Box>
                  <aside>
                    <Flex flexWrap="wrap">{allFiles}</Flex>
                  </aside>
                </Box>
              )}
            </Dropzone>

            <Box mt={10} textAlign="center">
              <Button
                isLoading={props.isSubmitting}
                type="submit"
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
                Зарегистрироваться
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
