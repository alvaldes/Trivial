import {
  Box,
  Flex,
  Badge,
  Text,
  Center,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const item = (props) => {
  const { data, index, playIndex, active } = props;
  const [initialDate, setInitialDate] = useState();
  const [initialTime, setInitialTime] = useState();
  const [durationTime, setDurationTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data.date) {
      const [date, time] = data.date.split("T");
      setInitialDate(date);
      let convert = +data.time / 60;
      setDurationTime(
        `${Math.floor(convert)}:${Math.floor((convert % 1) * 60)}`
      );
      setInitialTime(time);
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <div>wait</div>;
  } else if (
    index != playIndex &&
    index != playIndex + 1 &&
    index != playIndex + 2
  )
    return null;
  else {
    return (
      <Center mb={5}>
        <Flex
          bg={active ? "teal.200" : "gray.100"}
          borderRadius={50}
          px={10}
          py={5}
        >
          <Avatar
            name={String(index + 1)
              .split("")
              .join(" ")}
            size="lg"
            my="auto"
            bg="green.700"
          />
          <Box ml={4}>
            <Text fontSize="xl" as="strong">
              {data.name}
            </Text>
            <Badge colorScheme="blue" ml={3}>
              {data.age} | {data.country}
            </Badge>
            <Box>
              <Badge colorScheme="yellow" variant="solid">
                {data.points} Points
              </Badge>
              <Badge colorScheme="whatsapp" ml={2} variant="solid">
                {durationTime} min
              </Badge>
              <Badge colorScheme="pink" ml={2}>
                {initialDate} | {initialTime.slice(0, 8)}
              </Badge>
            </Box>
          </Box>
        </Flex>
      </Center>
    );
  }
};

export default item;
