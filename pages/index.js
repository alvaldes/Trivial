import Breadcrumb from "../components/breadcrumb";
import Nextlink from "next/link";
import {
  Center,
  Box,
  Heading,
  Container,
  Link,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import About from "../components/about";
import Logo from "../components/logo";

export default function Home() {
  return (
    <Box mt={{ base: 10, md: 0 }} color="white">
      <Logo />
      <Container maxW="container.lg" pt={10}>
        <Box>
          <Heading textAlign="center" pb={5} fontSize={50}>
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
        <About id="about"></About>
      </Container>
    </Box>
  );
}
