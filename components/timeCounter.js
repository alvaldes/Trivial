import { Heading, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ErrorAlert from "../components/alert";

const timeContainer = (props) => {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sec >= 59) {
        setMin((min += 1));
        setSec(0);
      } else {
        setSec((sec += 1));
      }
    }, 1000);
    return () => clearInterval(intervalId);
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
