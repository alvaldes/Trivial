import Nextlink from "next/link";
import {
  Center,
  Box,
  Heading,
  Container,
  Link,
  Divider,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import About from "../components/about";
import Logo from "../components/logo";
export default function Home() {
  return (
    <Box mt={{ base: 5, md: 0 }} color="white">
      <Logo />
      <Container maxW="container.lg" pt={{ base: 3, md: 10 }}>
        <Box>
          <Heading
            textAlign="center"
            pb={5}
            fontSize={{ base: "4xl", md: "7xl" }}
          >
            Find your place in our{" "}
            <Nextlink href="/ranking">
              <Link>Ranking</Link>
            </Nextlink>
          </Heading>
          <Center>
            <Nextlink href="/start">
              <Button
                variant="outline"
                rightIcon={<ArrowForwardIcon />}
                colorScheme="cyan"
                size="lg"
              >
                Start
              </Button>
            </Nextlink>
          </Center>
        </Box>
        <Center>
          <Divider width="90%" mt={{ base: 4, md: 8 }} />
        </Center>
        <About id="about"></About>
      </Container>
    </Box>
  );
}
