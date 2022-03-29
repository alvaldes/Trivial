import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Heading,
  Center,
  Divider,
  Progress,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Logo from "../components/logo";
import TimeCounter from "../components/timeCounter";
import { connect } from "react-redux";
import { SAVE_USER } from "../libs/store/actions";
import Router from "next/router";

const test = (props) => {
  const [trivia, setTrivia] = useState([]);
  const [options, setOptions] = useState([]);
  const [loadingTrivia, setLoadingTrivia] = useState(true);
  const [finishTrivia, setFinishTrivia] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points, setPoints] = useState(0);
  const [progressbarSecondsTime, setProgressbarSecondsTime] = useState(0);
  // {
  //   category: "Music",
  //   id: "622a1c367cc59eab6f9503b8",
  //   correctAnswer: "Walk This Way ",
  //   incorrectAnswers: [
  //     "I Don't Want To Miss A Thing",
  //     "Sweet Emotion",
  //     "Last Child",
  //   ],
  //   question: "Which Aerosmith song was re-made by Run D.M.C.?",
  //   tags: [],
  //   type: "Multiple Choice",
  // },

  function getTrivia() {
    return axios({
      url: "https://the-trivia-api.com/questions?limit=20",
      method: "get",
    })
      .then((res) => res.data)
      .catch((err) => console.error(`API_ERROR: ${err}`));
  }

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      const res = await getTrivia();
      if (isMounted) setTrivia(res);
    };

    fetch();
    return () => {
      isMounted = false;
    };
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
    if (trivia.length > 0) orderAnswers();
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
      .catch((err) => console.log(err));
  };

  if (props.userData == {}) {
    Router.push("/start");
  } else {
    if (loadingTrivia) {
      return <div>wait</div>;
    } else {
      return (
        <Container maxW="container.lg">
          <Logo />
          <Box bg="white" borderRadius="30px" p={5} mt={-8}>
            <Heading align="center">{`${trivia[currentQuestion].question}`}</Heading>
            <Center mt={3}>
              <Heading
                fontSize="xl"
                mr={5}
                color="teal.500"
              >{`Category: ${trivia[currentQuestion].category}`}</Heading>
              <Divider orientation="vertical" height={5} width={5} />
              <TimeCounter finishTrivia={finishTrivia} saveTime={endTrivia} />
              <Divider orientation="vertical" height={5} width={5} />
              <Heading fontSize="xl" color="teal.500">{`${
                currentQuestion + 1
              }/20`}</Heading>
              <Divider orientation="vertical" height={5} width={5} />
              <Heading
                fontSize="xl"
                color="teal.500"
              >{`Points: ${points}`}</Heading>
            </Center>
            <Progress
              colorScheme="blue"
              m={5}
              value={progressbarSecondsTime}
              sx={{ borderRadius: "50px" }}
            />

            <FormControl>
              <RadioGroup ml={12} onChange={checkAnswer}>
                <Stack spacing={[1, 5]} direction="column">
                  <Radio
                    size="lg"
                    value={options[0]}
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

export default connect(mapStateToProps, mapDispatchToProps)(test);
