import {
  Box,
  Flex,
  Badge,
  Text,
  Center,
  Avatar,
  SkeletonCircle,
  Stack,
  SkeletonText,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const item = (props) => {
  const { data, active } = props;
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
        `${Math.floor(convert)}:${Math.floor((convert % 1) * 60)}`,
      );
      setInitialTime(time);
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Center mb={5}>
        <Box
          padding="6"
          boxShadow="lg"
          bg="white"
          borderRadius={50}
          px={10}
          py={5}
        >
          <Stack direction="row">
            <SkeletonCircle size={12} />
            <SkeletonText
              mt={4}
              noOfLines={2}
              spacing="4"
              width={{ base: "10rem", md: "20rem" }}
            />
          </Stack>
        </Box>
      </Center>
    );
  } else {
    return (
      <Center mb={2}>
        <Flex
          bg={active ? "teal.200" : "blackAlpha.50"}
          borderRadius={50}
          px={{ base: 5, md: 10 }}
          py={{ base: 2, md: 5 }}
          minW={{ base: "xs", md: "xl" }}
        >
          <Avatar
            name={String(data.rankingPos + 1)
              .split("")
              .join(" ")}
            size="lg"
            my="auto"
            bg={
              data.rankingPos === 0
                ? "yellow.400"
                : data.rankingPos === 1
                  ? "gray.400" // Silver color equivalent
                  : data.rankingPos === 2
                    ? "yellow.800" // Bronze color equivalent
                    : "gray.900" // Default color
            }
          />
          <Box ml={4}>
            <Text fontSize={{ base: "md", md: "xl" }} as="strong">
              {data.name}
            </Text>
            <Box>
              <Badge colorScheme="yellow" variant="solid">
                {data.points} Points
              </Badge>
              <Badge colorScheme="whatsapp" ml={2} variant="solid">
                {durationTime} min
              </Badge>
              <Badge colorScheme="pink" ml={{ base: 0, sm: 2 }}>
                {initialTime.slice(0, 8)} | {initialDate}
              </Badge>
            </Box>
          </Box>
        </Flex>
      </Center>
    );
  }
};

export default item;
