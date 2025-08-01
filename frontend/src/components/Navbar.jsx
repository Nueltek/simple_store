import {
  Button,
  Container,
  Flex,
  HStack,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear(to-r, teal.500, green.500)"
          bgClip="text"
        >
          <Link to={"/"} as={RouterLink}>
            SimpleStore 🧺
          </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"} as={RouterLink}>
            <Button>
              <PlusSquareIcon fontSize={"20"} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
