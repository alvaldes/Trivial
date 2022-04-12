import { Box } from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img
    src="/images/card_history.svg"
    onDragStart={handleDragStart}
    role="presentation"
    className="mobile-card"
  />,
  <img
    src="/images/card_science.jpg"
    onDragStart={handleDragStart}
    role="presentation"
    className="mobile-card"
  />,
  <img
    src="/images/card_music.svg"
    onDragStart={handleDragStart}
    role="presentation"
    className="mobile-card"
  />,
  <img
    src="/images/card_geography.svg"
    onDragStart={handleDragStart}
    role="presentation"
    className="mobile-card"
  />,
  <img
    src="/images/card_literature.svg"
    onDragStart={handleDragStart}
    role="presentation"
    className="mobile-card"
  />,
  <img
    src="/images/card_cinema.jpg"
    onDragStart={handleDragStart}
    role="presentation"
    className="mobile-card"
  />,
];

const Card = () => {
  return (
    <Box>
      <AliceCarousel mouseTracking items={items} infinite />
    </Box>
  );
};

export default Card;
