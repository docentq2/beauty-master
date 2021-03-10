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

// avatar
// name
// location
// language
// services
// prices

export default function SearchItem(props) {
  return (
    <Box flexBasis="630px" mb="30px" background="#FFFFFF" borderRadius="20px">
      <Flex>
        <Box margin="53px 0 0 53px">
          <Box borderRadius="50%" width={220} height={220} overflow="hidden">
            <img src={props.avatar} />
          </Box>
        </Box>

        <Box margin="53px 44px 39px 27px">
          <Heading as="h2" fontSize="30px">
            {props.name}
          </Heading>

          <Text fontWeight="bold" fontSize="18px" my="19px">
            {props.location}
          </Text>

          <Text fontSize="14px" margin="23px 0 0 28px">
            <b>Языки:</b> {props.language}
          </Text>

          <Text fontSize="14px" margin="20px 0 0 28px">
            <b>Услуги:</b> {props.services}
          </Text>

          {props.prices.map((price) => {
            return (
              <Text
                textAlign="right"
                fontSize="20px"
                mt="28px"
                color="#FF5975"
                fontWeight="bold"
              >
                {price}
              </Text>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}
