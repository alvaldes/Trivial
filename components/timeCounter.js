import { Heading, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ErrorAlert from "../components/alert";

const timeContainer = (props) => {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [delay, setDelay] = useState(0);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setSec((sec += 1));
      if (sec === 59) {
        setMin((min += 1));
        setSec(0);
      }
      if (delay === sec) {
        setErrorTitle("ERROR");
        setErrorMsg([
          "Something went wrong, make sure you don't accidentally leave the page while the tests are running.",
        ]);
        setIsError(true);
      } else {
        setDelay(sec);
      }
    }, 1000);
  });

  useEffect(() => {
    if (props.finishTrivia) {
      props.saveTime(min * 60 + sec);
    }
  }, [props.finishTrivia]);

  return (
    <Box>
      <Heading fontSize={{ sm: "lg", md: "xl" }} color="teal.500" mr={5}>
        {min < 10 ? "0" + min : min} : {sec < 10 ? "0" + sec : sec}
      </Heading>
      <ErrorAlert title={errorTitle} msg={errorMsg} open={isError} />
    </Box>
  );
};

export default timeContainer;
