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
// import { useDisclosure, useEffect } from "@chakra-ui/react";
// import React from "react";

// function DeleteEvent() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [overlay, setOverlay] = React.useState();

//   const OverlayOne = () => (
//     <ModalOverlay
//       bg="blackAlpha.300"
//       backdropFilter="blur(10px) hue-rotate(90deg)"
//     />
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:3000/events?id=1`);
//       const data = await response.json();
//       // console.log("Fetched data:", data);
//       // console.log("response", response);
//       // console.log("data", data);
//     };
//     fetchData();
//   }, []);

//   const deleteEvent = async (eventId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/events/${eventId}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         alert("Event successfully deleted");
//         window.location.href = "/";
//       } else {
//         alert("Failed to delete the event");
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       alert("An error occurred while deleting the event");
//     }
//   };

//   return (
//     <>
//       <Button
//         m={1}
//         onClick={() => {
//           setOverlay(<OverlayOne />);
//           onOpen();
//         }}
//       >
//         Use Overlay one
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
//             {/* <Button onClick={onClose}>Oh nee toch niet</Button>
//             <Button onClick={deleteEvent}>Delete fo sure</Button> */}
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default DeleteEvent;
