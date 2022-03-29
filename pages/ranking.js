import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

const ranking = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://trivial-2b6f8-default-rtdb.firebaseio.com/ranking.json")
      .then((response) => {
        const loadingRespond = [];
        for (const key in response.data) {
          loadingRespond.push({
            id: key,
            username: response.data[key].username,
            age: response.data[key].age,
            country: response.data[key].country,
            date: response.data[key].data,
            time: response.data[key].time,
            points: response.data[key].points,
          });
        }
        console.log(loadingRespond);
        setData(loadingRespond);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (isLoading) {
    return <div>Is Loading</div>;
  } else {
    return (
      <Box>
        {console.log(data)}
        <ol>
          {data.map((user) => {
            return <li>Usuario: {user.username}</li>;
          })}
        </ol>
      </Box>
    );
  }
};

export default ranking;
