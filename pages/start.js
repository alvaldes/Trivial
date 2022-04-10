import { Box, Heading, Center, Container } from "@chakra-ui/react";
import DataForm from "../components/dataForm";
import Logo from "../components/logo";
import Router from "next/router";
import { connect } from "react-redux";
import { SAVE_USER } from "../libs/store/actions";

const start = (props) => {
  const onSubmit = (user) => {
    const date = new Date();
    props.onSaveUser({ ...user, date: date });
    Router.push("/quiz");
  };

  return (
    <Box mt={{ base: 10, md: 0 }}>
      <Logo size={{ base: "4.5rem", md: "9.5rem", lg: "10rem" }} />
      <Container bg="white" borderRadius="30px">
        <Center>
          <Heading pt={{ base: "1rem", md: "1rem" }}>Fill your Data</Heading>
        </Center>
        <DataForm onSaveUser={onSubmit} />
      </Container>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveUser: (data) => dispatch({ type: SAVE_USER, data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(start);
