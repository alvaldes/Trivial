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
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../components/alert";
import dynamic from "next/dynamic";
const Confetti = dynamic(() => import("react-confetti"), { ssr: false }); // To avoid server side rendering
import { useWindowSize } from "react-use"; // To get window size for the confetti

const finish = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const winId = router.query.winId;
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [isError, setIsError] = useState(false);
  const { width, height } = useWindowSize(); // Get window size for the confetti

  const setRankingData = (convertdata, indexCurrent) => {
    switch (indexCurrent) {
      case 0:
        return [
          { rankingPos: 0, ...convertdata[0] },
          { rankingPos: 1, ...convertdata[1] },
          { rankingPos: 2, ...convertdata[2] },
        ];
      case convertdata.length - 1:
        return [
          {
            rankingPos: convertdata.length - 3,
            ...convertdata[convertdata.length - 3],
          },
          {
            rankingPos: convertdata.length - 2,
            ...convertdata[convertdata.length - 2],
          },
          {
            rankingPos: convertdata.length - 1,
            ...convertdata[convertdata.length - 1],
          },
        ];
      default:
        return [
          { rankingPos: indexCurrent - 1, ...convertdata[indexCurrent - 1] },
          { rankingPos: indexCurrent, ...convertdata[indexCurrent] },
          { rankingPos: indexCurrent + 1, ...convertdata[indexCurrent + 1] },
        ];
    }
  };

  useEffect(() => {
    if (winId)
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
          let indexCurrent = convertData
            .map((e) => {
              return e.id;
            })
            .indexOf(winId);
          convertData = setRankingData(convertData, indexCurrent);
          setData(convertData);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMsg([
            "Something went wrong, check your internet connection.",
          ]);
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
  }, [winId]);

  if (isLoading)
    return (
      <Box>
        <Logo />
        <Box bg="white" borderRadius="30px" p={5} mt={{ base: -1, md: -10 }}>
          <Heading align="center">Congratulations!</Heading>
          <Divider borderColor="gray.500" my={3} />
          <ItemRanking key="1" data />
          <ItemRanking key="2" data />
          <ItemRanking key="3" data />
          <Center>
            <ButtonGroup spacing={6}>
              <Nextlink href="/">
                <Button colorScheme="teal">Home</Button>
              </Nextlink>
              <Nextlink href={`/ranking/${winId}`} ml={5}>
                <Button colorScheme="green">Ranking</Button>
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
        {/* 🎉 Confetti Effect When Q}uiz is Finished */}
        <Confetti width={width} height={height} />
        <Logo />
        <Box bg="white" borderRadius="30px" p={5} mt={{ base: -1, md: -10 }}>
          <Heading align="center">Congratulations!</Heading>
          <Divider borderColor="gray.500" my={3} />

          {data.map((key) => (
            <ItemRanking
              key={key.id}
              data={key}
              active={key.id === winId ? true : false}
            />
          ))}

          <Center>
            <ButtonGroup spacing={6}>
              <Nextlink href="/">
                <Button colorScheme="teal">Home</Button>
              </Nextlink>
              <Nextlink href={`/ranking/${winId}`} ml={5}>
                <Button colorScheme="green">Ranking</Button>
              </Nextlink>
            </ButtonGroup>
          </Center>
        </Box>
      </Box>
    );
};

export default finish;
