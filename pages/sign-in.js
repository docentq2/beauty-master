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
} from "@chakra-ui/react";
import { useState } from "react";
import Dropzone from "react-dropzone";

export default function SignIn() {
  const [files, setFiles] = useState([]);

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

  return (
    <Box maxW={600} m="100px auto 200px">
      <Heading mb={10}>Регистрация мастера</Heading>

      <FormControl>
        <FormLabel>Email:</FormLabel>
        <Input type="email" placeholder="maria1977@gmail.com" />
      </FormControl>

      <FormControl>
        <FormLabel>Имя:</FormLabel>
        <Input type="name" placeholder="Мария Иванова" />
      </FormControl>

      <FormControl>
        <FormLabel>Пароль:</FormLabel>
        <Input type="password" placeholder="Придумайте пароль" />
      </FormControl>

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
              <Text>Перенесите или нажмите сюда что бы прикрепить фото</Text>
            </Box>
            <aside>
              <Flex flexWrap="wrap">{allFiles}</Flex>
            </aside>
          </Box>
        )}
      </Dropzone>

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
