import { Box, Text } from "@chakra-ui/react";
import Logo from "../components/logo";

const NotFound = () => {
  return (
    <Box className="logoBox">
      <Logo />
      <Text
        mt={-8}
        className="logo"
        fontSize={{ base: "6rem", md: "6rem", lg: "10rem" }}
      >
        404
      </Text>
      <Text
        mt={{ base: -6, md: -8, lg: -14 }}
        className="logo"
        fontSize={{ base: "2rem", md: "3rem", lg: "6rem" }}
      >
        Page Not Found
      </Text>
    </Box>
  );
};

export default NotFound;
