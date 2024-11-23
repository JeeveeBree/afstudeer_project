// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Text,
// } from "@chakra-ui/react";
// import { useDisclosure } from "@chakra-ui/react";
// import React from "react";

// function EditEvent() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [overlay, setOverlay] = React.useState();

//   const OverlayTwo = () => (
//     <ModalOverlay
//       bg="none"
//       backdropFilter="auto"
//       backdropInvert="80%"
//       backdropBlur="2px"
//     />
//   );

//   return (
//     <>
//       <Button
//         m={1}
//         ml="4"
//         onClick={() => {
//           setOverlay(<OverlayTwo />);
//           onOpen();
//         }}
//       >
//         Use Overlay two
//       </Button>
//       <Modal isCentered isOpen={isOpen} onClose={onClose}>
//         {overlay}
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text>Custom backdrop filters!</Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={onClose}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default EditEvent;
