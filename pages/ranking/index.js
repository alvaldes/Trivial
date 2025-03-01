import {
  Box,
  Heading,
  ButtonGroup,
  Button,
  Center,
  Divider,
} from "@chakra-ui/react";
import Nextlink from "next/link";
import Logo from "../../components/logo";
import ItemRanking from "../../components/rankingItem";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../components/alert";

const Ranking = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [isError, setIsError] = useState(false);

  const setRankingData = (convertdata) => {
    let aux = [];
    convertdata.map((data, index) => {
      aux.push({
        rankingPos: index,
        ...data,
      });
    });
    return aux.slice(0, 10);
  };

  useEffect(() => {
    axios
      .get(`https://trivial-2b6f8-default-rtdb.firebaseio.com/ranking.json`)
      .then((response) => {
        const convertData = Object.keys(response.data)
          .map((key) => {
            return { id: key, ...response.data[key] };
          })
          .sort((a, b) => {
            if (a.points > b.points) return -1;
            else if (a.points < b.points) return 1;
            else {
              if (a.time < b.time) return -1;
              if (a.time > b.time) return 1;
            }
          });
        convertData = setRankingData(convertData);
        setData(convertData);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg(["Something went wrong, check your internet connection."]);
        setErrorTitle("Network Error");
        if (error.response) {
          // Request made and server responded
          setErrorMsg([
            `${error.response.headers}`,
            `ERROR ${error.response.status}: ${error.response.data}`,
          ]);
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMsg([
            "Most of the time this error is caused by IP permissions issues. Try using a VPN to fix it.",
            "We are currently experiencing problems with our servers. We apologize for the inconvenience caused",
          ]);
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorTitle("Internal Error");
        }
        setIsError(true);
      });
  }, []);

  if (isLoading)
    return (
      <Box>
        <Logo />
        <Box bg="white" borderRadius="30px" p={5} mt={{ base: 10, md: 20 }}>
          <Heading align="center">🏅 Top 10 Ranking 🏅</Heading>
          <Divider borderColor="gray.500" my={3} />
          <ItemRanking key="1" data />
          <ItemRanking key="2" data />
          <ItemRanking key="3" data />
          <Center>
            <ButtonGroup spacing={6}>
              <Nextlink href="/">
                <Button colorScheme="teal">Home</Button>
              </Nextlink>
            </ButtonGroup>
          </Center>
        </Box>
        <Alert title={errorTitle} msg={errorMsg} open={isError} />
      </Box>
    );
  else
    return (
      <Box>
        <Logo />
        <Box bg="white" borderRadius="30px" p={5} mt={{ base: 1, md: 5 }}>
          <Heading align="center" fontSize={{ base: "1em", md: "4em" }}>
            🏅 Top 10 Ranking 🏅
          </Heading>
          <Divider borderColor="gray.500" my={3} />

          {data.map((key) => (
            <ItemRanking key={key.id} data={key} />
          ))}

          <Center>
            <ButtonGroup spacing={6}>
              <Nextlink href="/">
                <Button colorScheme="teal" variant="ghost">
                  go Home
                </Button>
              </Nextlink>
            </ButtonGroup>
          </Center>
        </Box>
      </Box>
    );
};

export default Ranking;
