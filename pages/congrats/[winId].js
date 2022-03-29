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

const finish = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [indexWinID, setIndexWinID] = useState(0);
  const router = useRouter();
  const winId = router.query.winId;

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
              if (a.points < b.points) return -1;
              else if (a.points > b.points) return 1;
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
          setIndexWinID(indexCurrent);
          setData(convertData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [winId]);

  if (isLoading) return <div>wait</div>;
  else
    return (
      <Box>
        <Logo />
        <Box bg="white" borderRadius="30px" p={5} mt={-10}>
          <Heading align="center">Congratulations!</Heading>
          <Divider borderColor="gray.500" my={3} />

          {data.map((key, index) => (
            <ItemRanking
              key={key.id}
              data={key}
              index={index}
              playIndex={indexWinID}
              active={key.id === winId ? true : false}
            />
          ))}

          <Center>
            <ButtonGroup spacing={6}>
              <Nextlink href="/">
                <Button colorScheme="teal">Home</Button>
              </Nextlink>
              <Nextlink href="/ranking" ml={5}>
                <Button colorScheme="green">Ranking</Button>
              </Nextlink>
            </ButtonGroup>
          </Center>
        </Box>
      </Box>
    );
};

export default finish;
