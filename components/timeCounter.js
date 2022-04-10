import { Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
const timeContainer = (props) => {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSec((sec += 1));
      if (sec === 59) {
        setMin((min += 1));
        setSec(0);
      }
    }, 1000);
  });

  useEffect(() => {
    if (props.finishTrivia) {
      props.saveTime(min * 60 + sec);
    }
  }, [props.finishTrivia]);

  return (
    <Heading fontSize={{ sm: "lg", md: "xl" }} color="teal.500" mr={5}>
      {min < 10 ? "0" + min : min} : {sec < 10 ? "0" + sec : sec}
    </Heading>
  );
};

export default timeContainer;
