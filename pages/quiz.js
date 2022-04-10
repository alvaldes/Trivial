import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Heading,
  Divider,
  Center,
  Progress,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import Logo from "../components/logo";
import Alert from "../components/alert";
import TimeCounter from "../components/timeCounter";
import { connect } from "react-redux";
import { SAVE_USER } from "../libs/store/actions";
import Router from "next/router";

const quiz = (props) => {
  const [trivia, setTrivia] = useState(new Array("test"));
  const [options, setOptions] = useState([]);
  const [loadingTrivia, setLoadingTrivia] = useState(true);
  const [finishTrivia, setFinishTrivia] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points, setPoints] = useState(0);
  const [progressbarSecondsTime, setProgressbarSecondsTime] = useState(0);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [isError, setIsError] = useState(false);

  function getTrivia() {
    return axios({
      url: "https://the-trivia-api.com/questions?limit=20",
      method: "get",
    })
      .then((res) => res.data)
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
  }

  useEffect(() => {
    let isMounted = true;
    if (!props.userData.date) {
      Router.replace("/start");
    } else {
      const fetch = async () => {
        const res = await getTrivia();
        if (isMounted && res !== undefined) setTrivia(res);
      };

      fetch();
      return () => {
        isMounted = false;
      };
    }
  }, []);

  useEffect(() => {
    //progress time
    const intervalId = setInterval(() => {
      if (!finishTrivia) {
        setProgressbarSecondsTime((progressbarSecondsTime += 1.5));
        if (progressbarSecondsTime >= 100) {
          setProgressbarSecondsTime(0);
          setCurrentQuestion((currentQuestion += 1));
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    if (trivia.length > 1) orderAnswers();
  }, [trivia, currentQuestion]);

  const orderAnswers = () => {
    let optionsSort = [
      trivia[currentQuestion].incorrectAnswers[0],
      trivia[currentQuestion].incorrectAnswers[1],
      trivia[currentQuestion].incorrectAnswers[2],
      trivia[currentQuestion].correctAnswer,
    ];

    setOptions(optionsSort.sort());
    setLoadingTrivia(false);
  };

  const checkAnswer = (answer) => {
    if (answer === trivia[currentQuestion].correctAnswer)
      setPoints((points += 1));
    if (currentQuestion != 19) {
      setProgressbarSecondsTime(0);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinishTrivia(true);
    }
  };

  const endTrivia = (time) => {
    setLoadingTrivia(true);
    const fireData = {
      ...props.userData,
      points: points,
      time: time,
    };
    axios
      .post(
        "https://trivial-2b6f8-default-rtdb.firebaseio.com/ranking.json",
        fireData
      )
      .then((response) => {
        props.onSaveUser(fireData);
        Router.push(`/congrats/${response.data.name}`);
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
  };

  if (loadingTrivia) {
    return (
      <Box>
        <Logo />
        <Box bg="white" borderRadius="30px" p={5} mt={{ base: -1, md: -8 }}>
          <Skeleton mt={4} height={10} width="90%" margin="auto" />
          <Center>
            <Stack direction="row" mt={3}>
              <SkeletonText
                noOfLines={1}
                width={{ base: "6rem", sm: "8rem", md: "12rem" }}
              />
              <SkeletonText
                noOfLines={1}
                width={{ base: "3rem", sm: "4rem", md: "8rem" }}
              />
              <SkeletonText
                noOfLines={1}
                width={{ base: "3rem", sm: "4rem", md: "8rem" }}
              />
              <SkeletonText
                noOfLines={1}
                width={{ base: "3rem", sm: "4rem", md: "8rem" }}
              />
            </Stack>
          </Center>
          <Stack direction="row" mt={6} ml={4}>
            <SkeletonCircle size={6} />
            <SkeletonText
              mt={4}
              noOfLines={2}
              spacing="2"
              width={{ base: "10rem", md: "20rem" }}
            />
          </Stack>
          <Stack direction="row" mt={6} ml={4}>
            <SkeletonCircle size={6} />
            <SkeletonText
              mt={4}
              noOfLines={2}
              spacing="2"
              width={{ base: "10rem", md: "20rem" }}
            />
          </Stack>
          <Stack direction="row" mt={6} ml={4}>
            <SkeletonCircle size={6} />
            <SkeletonText
              mt={4}
              noOfLines={2}
              spacing="2"
              width={{ base: "10rem", md: "20rem" }}
            />
          </Stack>
          <Stack direction="row" mt={6} ml={4}>
            <SkeletonCircle size={6} />
            <SkeletonText
              mt={4}
              noOfLines={2}
              spacing="2"
              width={{ base: "10rem", md: "20rem" }}
            />
          </Stack>
        </Box>
        <Alert title={errorTitle} msg={errorMsg} open={isError} />
      </Box>
    );
  } else {
    return (
      <Container maxW="container.lg">
        <Logo />
        <Box bg="white" borderRadius="30px" p={5} mt={{ base: -1, md: -8 }}>
          <Heading
            align="center"
            fontSize={{ sm: "xl", md: "4xl" }}
          >{`${trivia[currentQuestion].question}`}</Heading>
          <Center>
            <Stack
              direction={["column", "row"]}
              spacing={{ base: 0, md: "center" }}
              mt={3}
              align={{ base: "left", md: "center" }}
            >
              <Heading
                fontSize={{ sm: "lg", md: "xl" }}
                mr={5}
                color="teal.500"
              >{`Category: ${trivia[currentQuestion].category}`}</Heading>
              <Divider orientation="vertical" height={5} width={5} />

              <Stack direction="row">
                <TimeCounter finishTrivia={finishTrivia} saveTime={endTrivia} />
                <Divider orientation="vertical" height={5} width={5} />
                <Heading fontSize={{ sm: "lg", md: "xl" }} color="teal.500">{`${
                  currentQuestion + 1
                }/20`}</Heading>
                <Divider orientation="vertical" height={5} width={5} />
                <Heading
                  fontSize={{ sm: "lg", md: "xl" }}
                  color="teal.500"
                >{`Points: ${points}`}</Heading>
              </Stack>
            </Stack>
          </Center>
          <Progress
            colorScheme="blue"
            m={5}
            value={progressbarSecondsTime}
            sx={{ borderRadius: "50px" }}
          />

          <FormControl>
            <RadioGroup ml={{ base: 6, md: 12 }} onChange={checkAnswer}>
              <Stack spacing={[1, 5]} direction="column">
                <Radio
                  value={options[0]}
                  size="lg"
                  sx={{ borderColor: "gray.500" }}
                >
                  {options[0]}
                </Radio>
                <Radio
                  size="lg"
                  value={options[1]}
                  sx={{ borderColor: "gray.500" }}
                >
                  {options[1]}
                </Radio>
                <Radio
                  size="lg"
                  value={options[2]}
                  sx={{ borderColor: "gray.500" }}
                >
                  {options[2]}
                </Radio>
                <Radio
                  size="lg"
                  value={options[3]}
                  sx={{ borderColor: "gray.500" }}
                >
                  {options[3]}
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
      </Container>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveUser: (data) => dispatch({ type: SAVE_USER, data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(quiz);
