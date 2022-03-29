import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Monoton';
        src: url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400;1,700&family=Monoton&display=swap');
        font-weight: normal;
        font-style: normal;
      }
      `}
  />
);

export default Fonts;
