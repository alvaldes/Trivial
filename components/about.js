import { Box, Center, Heading } from "@chakra-ui/react";

const About = () => {
  return (
    <Box mt={50}>
      <Heading mb={10}>Discover new Topics</Heading>
      <Box display="flex">
        <Center>
          <div className="card card_history">
            {/* <h3 className="title">History</h3> */}
          </div>
          <div className="card card_science">
            {/* <h3 className="title">Science</h3> */}
          </div>
          <div className="card card_music">
            {/* <h3 className="title">Music</h3> */}
          </div>
          <div className="card card_geography">
            {/* <h3 className="title">Geography</h3> */}
          </div>
          <div className="card card_literature">
            {/* <h3 className="title">Literature</h3> */}
          </div>
          <div className="card card_cinema">
            {/* <h3 className="title">Cimena</h3> */}
          </div>
        </Center>
      </Box>
    </Box>
  );
};

export default About;
