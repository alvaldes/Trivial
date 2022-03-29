import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Logo from "../components/logo";

function quiz() {
  const [trivia, setTrivia] = useState([]);
  /**
"category": "Music",
"id": "622a1c367cc59eab6f9503b8",
"correctAnswer": "Walk This Way ",
"incorrectAnswers": [
"I Don't Want To Miss A Thing",
"Sweet Emotion",
"Last Child"
],
"question": "Which Aerosmith song was re-made by Run D.M.C.?",
"tags": [],
"type": "Multiple Choice"
   */
  function getTrivia() {
    return axios({
      url: "https://the-trivia-api.com/questions?limit=20",
      method: "get",
    })
      .then((res) => res.data)
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await getTrivia();
      setTrivia(res);
    };

    fetch();
  }, []);

  return (
    <Box>
      <Logo />
      <h3>{`Categoria: /n ${trivia}`}</h3>
    </Box>
  );
}

export default quiz;
