import { useEffect, useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Code,
} from "@chakra-ui/react";
import Router from "next/router";

const alert = (props) => {
  const { title, msg, open } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    open ? onOpen() : onClose();
  }, [open]);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg="red.500">
          <AlertDialogHeader color="white">{title}</AlertDialogHeader>
          <AlertDialogBody>
            {msg.map((elem) => (
              <Code colorScheme="red" children={elem} mb={2} />
            ))}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="teal" ml={3} onClick={() => Router.push("/")}>
              Home
            </Button>
            <Button
              colorScheme="gray"
              ml={3}
              onClick={() => Router.reload(window.location.pathname)}
            >
              Reload
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default alert;
