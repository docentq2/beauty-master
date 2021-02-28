import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

import Link from "next/link";
import LoginPopup from "./login-popup";
import { useAuth } from "./auth";
import initFirebase from "../services/firebase-client";
import firebase from "firebase/app";

export default function HeaderApp() {
  initFirebase();
  const { user } = useAuth();

  return (
    <Box bg="#FFEBEC">
      <Flex
        maxWidth="1400px"
        margin="0 auto"
        padding="20px 54px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <a>
            <Flex alignItems="center">
              <Box
                width="64px"
                height="64px"
                background="#ff5975"
                borderRadius="50%"
                marginRight="14px"
              ></Box>
              <Box>Название</Box>
            </Flex>
          </a>
        </Link>

        {user === null ? (
          <Flex>
            <Box margin="0 20px" color="black">
              <LoginPopup />
            </Box>
            <Box margin="0 20px" color="black">
              <Link href="/">
                <a>Стать мастером</a>
              </Link>
            </Box>
          </Flex>
        ) : (
          <Flex align="center">
            <Link href="/account">
              <a>
                <Avatar src={user.photoURL} />
              </a>
            </Link>

            <Box ml={5} textAlign="right">
              <Link href="/account">
                <a>
                  <Text>{user.email}</Text>
                </a>
              </Link>

              <Text
                display="inline-block"
                color="#2b6cb0"
                fontSize="14px"
                mt={2}
                cursor="pointer"
                _hover={{
                  color: "#f00",
                }}
                onClick={async () => {
                  await firebase.auth().signOut();
                }}
              >
                Выйти
              </Text>
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
