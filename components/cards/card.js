import { Box, Center, Text } from "@chakra-ui/react";

const categories = [
  { className: "card_history", label: "History" },
  { className: "card_science", label: "Science" },
  { className: "card_music", label: "Music" },
  { className: "card_geography", label: "Geography" },
  { className: "card_literature", label: "Literature" },
  { className: "card_cinema", label: "Cinema" },
];

const Card = () => {
  return (
    <Box display="flex">
      <Center>
        {categories.map((category, index) => (
          <Box
            key={index}
            className={`card ${category.className}`}
            position="relative"
          >
            {/* Black Overlay with Category Name */}
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.6)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
            >
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {category.label}
              </Text>
            </Box>
          </Box>
        ))}
      </Center>
    </Box>
  );
};

export default Card;
