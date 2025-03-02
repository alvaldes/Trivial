import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Link,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import Card from "../components/cards/card";
import CardMobile from "../components/cards/cardMobile";

const About = () => {
  const [isMobile] = useMediaQuery("(max-width: 1100px)");
  const [showCards, setShowCards] = useState();

  useEffect(() => {
    setShowCards(() => (isMobile ? <CardMobile /> : <Card />));
  }, [isMobile]);

  return (
    <Box mt={{ base: 10, md: 12 }}>
      <Heading mb={{ base: 5, md: 10 }} fontSize={{ base: "2xl", md: "3xl" }}>
        Explore our Topics
      </Heading>

      {showCards}

      <Heading mt={{ base: 0, md: 10 }} fontSize={{ base: "2xl", md: "3xl" }}>
        Info Section
      </Heading>
      <Text my={2} fontSize={{ base: "lg", md: "xl" }}>
        A game in which players are asked questions about different topics and
        they have to get as many correct answers as possible.
      </Text>
      <br />
      <Accordion allowToggle my={2}>
        <AccordionItem>
          <h2>
            <AccordionButton
              _expanded={{ bg: "teal", color: "white", borderRadius: "5px" }}
            >
              <Box flex="1" textAlign="left">
                How to play:
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Press the <strong>Start</strong> button to enter your details. Once
            entered, a set of questions and 4 options to answer will begin to
            appear (only 1 is correct). You will have 64 seconds to answer each
            question, accumulating 1 point for each correct question. In
            addition, the total time used to complete all the questions will be
            saved, this will be used to level the players of equal score.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              _expanded={{ bg: "teal", color: "white", borderRadius: "5px" }}
            >
              <Box flex="1" textAlign="left">
                Make with:
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Created with the aim of being cross-platform{" "}
            <strong>Trivial</strong> was built using{" "}
            <Link href="https://reactjs.org" isExternal>
              React.js
            </Link>{" "}
            and specifically its framework for production,{" "}
            <Link href="https://nextjs.org" isExternal>
              Next.js
            </Link>{" "}
            . It also incorporates{" "}
            <Link href="https://chakra-ui.com" isExternal>
              Chakra UI
            </Link>{" "}
            as an external library and use{" "}
            <Link href="https://console.firebase.google.com" isExternal>
              Firebase
            </Link>{" "}
            to store his data.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              _expanded={{ bg: "teal", color: "white", borderRadius: "5px" }}
            >
              <Box flex="1" textAlign="left">
                Base of Knowledge:
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Using{" "}
            <Link href="https://rapidapi.com/" isExternal>
              Rapid API
            </Link>{" "}
            to search for a API who store the most diverse and random questions,{" "}
            <Link href="https://the-trivia-api.com/" isExternal>
              The Trivia API
            </Link>{" "}
            was found. This also has 4 options for the player to respond.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              _expanded={{ bg: "teal", color: "white", borderRadius: "5px" }}
            >
              <Box flex="1" textAlign="left">
                License:
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            This page was created by{" "}
            <Link href="https://alvaldes.vercel.app/" isExternal>
              Angel L. Valdés
            </Link>{" "}
            under{" "}
            <Link href="https://mit-license.org" isExternal>
              MIT License
            </Link>{" "}
            .{" "}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default About;
