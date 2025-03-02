import { Box, Image, Text } from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const images = [
  { src: "/images/card_history.svg", alt: "History Card", label: "History" },
  { src: "/images/card_science.jpg", alt: "Science Card", label: "Science" },
  { src: "/images/card_music.svg", alt: "Music Card", label: "Music" },
  {
    src: "/images/card_geography.svg",
    alt: "Geography Card",
    label: "Geography",
  },
  {
    src: "/images/card_literature.svg",
    alt: "Literature Card",
    label: "Literature",
  },
  { src: "/images/card_cinema.jpg", alt: "Cinema Card", label: "Cinema" },
];

const CardCarousel = () => {
  const items = images.map((img, index) => (
    <Box key={index} position="relative" className="mobile-card">
      {/* Image */}
      <Image
        src={img.src}
        alt={img.alt}
        onDragStart={(e) => e.preventDefault()}
        role="presentation"
        objectFit="cover"
        borderRadius="lg"
        className="mobile-card-img"
      />

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
        borderRadius="lg"
      >
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {img.label}
        </Text>
      </Box>
    </Box>
  ));

  return (
    <Box maxW="100%" overflow="hidden">
      <AliceCarousel
        mouseTracking
        items={items}
        infinite
        autoPlay
        autoPlayInterval={3000}
        animationDuration={1000}
        // disableButtonsControls
        disableDotsControls
        responsive={{
          0: { items: 1 },
          600: { items: 2 },
          1024: { items: 3 },
        }}
        stagePadding={{ paddingLeft: 20, paddingRight: 20 }}
      />
    </Box>
  );
};

export default CardCarousel;
