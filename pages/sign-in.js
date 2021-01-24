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
} from "@chakra-ui/react";
import { useState } from "react";
import Dropzone from "react-dropzone";

export default function SignIn() {
  const [isMaster, setIsMaster] = useState(false);
  const [files, setFiles] = useState([]);

  console.log("files", files);
  const allFiles = files.map((file) => {
    const blobImg = new Blob([file]);
    const url = URL.createObjectURL(blobImg);
    return (
      <Box key={file.name} mb={5}>
        <img src={url} alt="" width={180} />
      </Box>
    );
  });

  return (
    <Box maxW={600} m="300px auto 200px">
      <Heading mb={10}>Регистрация</Heading>

      <FormControl display="flex" alignItems="center" m="20px 0">
        <Switch
          id="for-masters"
          defaultChecked={isMaster}
          onChange={() => setIsMaster(!isMaster)}
        />
        <FormLabel htmlFor="for-masters" mb="0" ml={1}>
          Я мастер
        </FormLabel>
      </FormControl>

      <FormControl>
        <FormLabel>Email:</FormLabel>
        <Input type="email" placeholder="maria1977@gmail.com" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Имя:</FormLabel>
        <Input type="name" placeholder="Мария Иванова" />
      </FormControl>

      <FormControl>
        <FormLabel>Пароль:</FormLabel>
        <Input type="password" placeholder="Придумайте пароль" />
      </FormControl>

      {isMaster && (
        <>
          <FormControl>
            <FormLabel>Город:</FormLabel>
            <Input type="city" placeholder="Берлин" />
          </FormControl>

          <FormControl>
            <FormLabel>Специализация:</FormLabel>
            <Select placeholder="Специализация">
              <option>Ногти</option>
              <option>Волосы</option>
              <option>Кожа</option>
              <option>Глаза</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Телефон:</FormLabel>
            <Input type="tel" placeholder="" />
          </FormControl>

          <FormControl>
            <FormLabel>Телефон:</FormLabel>
            <Input type="tel" placeholder="" />
          </FormControl>

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
                  <Flex flexWrap="wrap" justifyContent="space-between">
                    {allFiles}
                  </Flex>
                </aside>
              </Box>
            )}
          </Dropzone>
        </>
      )}

      <Box mt={10} textAlign="center">
        <Button
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
    </Box>
  );
}
