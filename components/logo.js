import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
const Logo = ({
  size = { base: "4rem", md: "9rem", lg: "12rem" },
  ...props
}) => {
  return (
    <Link href="/">
      <Box className="logoBox">
        <Text sx={{ cursor: "pointer" }} className="logo" fontSize={size}>
          TRIVIAL
        </Text>
      </Box>
    </Link>
  );
};

export default Logo;
