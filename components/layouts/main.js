import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";

const Main = ({ children }) => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <Box as="main" className="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Trivial</title>
      </Head>

      <Container maxW="container.lg" className="content">
        {children}
      </Container>

      <Container align="center" className="footer" mt={35}>
        <Box as="span" color={useColorModeValue("light_white", "light_white")}>
          &copy; {year} Trivial. All Rights Reserved.
        </Box>
      </Container>
    </Box>
  );
};

export default Main;
