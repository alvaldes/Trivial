import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: "green.900",
      color: "black",
    },
  }),
};

const components = {
  Link: {
    baseStyle: {
      color: "teal.300",
      cursor: "pointer",
    },
    variants: {
      bread: {
        color: "white",
      },
    },
  },
  Radio: {
    baseStyle: {
      borderColor: "black",
    },
  },
};

const fonts = {};

const colors = {
  light_green: "#019267",
  light_teal: "#00C897",
  light_yellow: "#FFD365",
  light_white: "#FDFFA9",
};
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  colors,
  components,
  fonts,
});

export default theme;
