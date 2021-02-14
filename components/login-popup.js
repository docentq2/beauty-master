import {
  Button,
  Text,
  FormControl,
  Modal,
  FormLabel,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Image,
  useToast,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
const provider = new firebase.auth.GoogleAuthProvider();

export default function LoginPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(provider);
      const { user } = res;
      if (!user) {
        throw new Error("пользователя нет");
      }
    } catch (err) {}
  };
  return (
    <>
      <Text cursor="pointer" onClick={onOpen}>
        Войти
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Войти</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap>
              <WrapItem w="100%">
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="maria123@gmail.com"
                    id="email"
                    onChange={({ target: { value } }) => setEmail(value)}
                    value={email}
                  />
                </FormControl>
              </WrapItem>
              <WrapItem w="100%">
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Пароль</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={({ target: { value } }) => setPassword(value)}
                    value={password}
                  />
                </FormControl>
              </WrapItem>
              <WrapItem>
                <Button onClick={handleAuth}>
                  <Image
                    boxSize="16px"
                    objectFit="cover"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                  Войти с помощью Google
                </Button>
              </WrapItem>
            </Wrap>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Text
              color="#2b6cb0"
              _hover={{ color: "#2c5282", textDecoration: "underline" }}
              cursor="pointer"
              onClick={() => {
                if (email === "") {
                  toast({
                    title: "Ошибка",
                    description: "Введите email",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                  return;
                }

                firebase
                  .auth()
                  .sendPasswordResetEmail(email)
                  .then(() => {
                    toast({
                      title: "Готово",
                      description:
                        "Проверяйте свою почту. Туда отправлена ссылка для сброса пароля",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  })
                  .catch((error) => {
                    const message = error.message;
                    toast({
                      title: "Ошибка",
                      description: message,
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  });
              }}
            >
              Забыл пароль?
            </Text>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={email === "" || password === ""}
              onClick={async () => {
                await firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password)
                  .catch(async (err) => {
                    console.log("err", err);

                    if (err.code === "auth/user-not-found") {
                      await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .catch((error) => {
                          const message = error.message;
                          toast({
                            title: "Ошибка",
                            description: message,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          });
                        });
                    }

                    if (err.code === "auth/wrong-password") {
                      toast({
                        title: "Ошибка",
                        description:
                          "Неверный пароль или вы заходили через Google",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                    }

                    toast({
                      title: "Ошибка",
                      description: err.message,
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  });
              }}
            >
              Войти
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
