import React, { useEffect, useState } from "react";
import {
  Heading,
  Button,
  Box,
  AspectRatio,
  Flex,
  useDisclosure,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useLoaderData, Link, Form } from "react-router-dom";
// import DeleteEvent from "../components/DeleteEvent";
// import EditEvent from "../components/EditEvent";
import { NewEvent } from "./NewEvent";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const loader = async ({ params }) => {
  if (!params.id) {
    throw new Error("No event ID provided");
  }
  const usersFetch = await fetch(`http://localhost:3000/users`);
  const eventFetch = await fetch(
    `http://localhost:3000/events?id=${params.id}`
  );
  // console.log("eventFetch", eventFetch);
  // console.log("params.id", params.id);
  const categoriesFetch = await fetch(`http://localhost:3000/categories`);
  const users = await usersFetch.json();
  const event = await eventFetch.json();
  const categories = await categoriesFetch.json();

  // if (!users.ok || !event.ok || !categories.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // console.log("Users:", users);
  // console.log("Event:", event);
  // console.log("Categories:", categories);
  const userId = event[0].createdBy;
  const categoryId = event[0].categoryIds;
  // console.log("userId", userId);
  // console.log("catergoryId", categoryId);
  const userIdFetch = await fetch(`http://localhost:3000/users?id=${userId}`);
  const userTijdelijk = await userIdFetch.json();
  // console.log("userTijdelijk", userTijdelijk);

  return {
    userTijdelijk,
    event,
    categories,
    users,
  };
};

export const EventPage = () => {
  const { event, categories, userTijdelijk, users } = useLoaderData();
  const [geupdateEvent, functieOmEventUpdate] = useState(event[0]);
  // console.log("geupdateEvent", geupdateEvent);
  // const [title, setTitle] = useState("");
  const [title, setTitle] = useState(event[0].title || "");
  const [description, setDescription] = useState(event[0].description || "");
  const [image, setImage] = useState(event[0].image || "");
  const [location, setLocation] = useState(event[0].location || "");

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // console.log(event);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/events?id=1`);
      const data = await response.json();
      // console.log("Fetched data:", data);
      // console.log("response", response);
      // console.log("data", data);
    };
    fetchData();
  }, []);
  // console.log("event", event[0]);
  // console.log("event.title", event[0].title);
  // console.log("users[0].name", userTijdelijk[0].name);

  const eventCategories = categories.filter((category) =>
    event[0].categoryIds.includes(category.id)
  );
  // console.log("eventCategories", eventCategories);

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Event successfully deleted");
        window.location.href = "/";
      } else {
        alert("Failed to delete the event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event");
    }
  };

  // const editEvent = async (eventId) => {
  //   try {
  //     const formData = new FormData(event[0].target);
  //     const aangepastEvent = {
  //       id: undefined,
  //       createdBy: formData.get("userId"),
  //       // id: eventId.id,
  //       // createdBy: 1,
  //       title: title,
  //     };
  //     // const aangepastEvent = {
  //     //   id: id,
  //     //   createdBy: createdBy,
  //     //   title: title,
  //     //   description: description,
  //     //   image: image,
  //     //   categoryIds: categoryIds,
  //     //   location: location,
  //     //   startTime: startTime,
  //     //   endTime: endTime,
  //     // };
  //     console.log("aangepastEvent", aangepastEvent);
  //     console.log("eventId", eventId);
  //     console.log("title", title);
  //     const response = await fetch(
  //       `http://localhost:3000/events/${eventId.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(aangepastEvent),
  //       }
  //     );
  //     functieOmEventUpdate(aangepastEvent);
  //     console.log("geupdateEvent", geupdateEvent);
  //     console.log("response", response);
  //     if (response.ok) {
  //       alert("Event successfully edited.");
  //       // window.location.href = "/";
  //     } else {
  //       alert("Failed to edit the event.");
  //     }
  //   } catch (error) {
  //     console.error("Error editing event:", error);
  //     alert("An error occurred while editing the event.");
  //   }
  // };

  const fetchUpdatedEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events?id=${eventId}`
      );
      if (response.ok) {
        const updatedEvent = await response.json();
        functieOmEventUpdate(updatedEvent[0]); // Update de state met het bijgewerkte event
      } else {
        console.error("Failed to fetch updated event.");
      }
    } catch (error) {
      console.error("Error fetching updated event:", error);
    }
  };

  const editEvent = async (eventId) => {
    try {
      const formElement = document.getElementById("edit-event-form");
      const formData = new FormData(formElement);

      const eventEdited = {
        id: eventId.id,
        createdBy: formData.get("userId"),
        title: title /*formData.get("title"),*/,
        description: description /*formData.get("description")*/,
        image: image /*formData.get("image")*/,
        categoryIds: Array.from(
          formElement.querySelectorAll(
            "select[name='categoryIds'] option:checked"
          )
        ).map((option) => option.value),
        location: location /*formData.get("location")*/,
        startTime: `${formData.get("startDate")}T${formData.get("startTime")}`,
        endTime: `${formData.get("endDate")}T${formData.get("endTime")}`,
      };

      console.log("aangepastEvent", eventEdited);

      const response = await fetch(
        `http://localhost:3000/events/${eventId.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventEdited),
        }
      );

      if (response.ok) {
        alert("Event successfully edited.");

        await fetchUpdatedEvent(eventId.id);
        functieOmEventUpdate(eventEdited);
        // window.location.href = "/";
      } else {
        alert("Failed to edit the event.");
      }
    } catch (error) {
      console.error("Error editing event:", error);
      alert("An error occurred while editing the event.");
    }
  };

  return (
    <Flex p={2} m={2} flexWrap="wrap" justify="center" alignItems="center">
      <div className="event">
        <Heading>{event[0].title}</Heading>
        <p>{event[0].description}</p>
        <AspectRatio /*maxH="20em"*/ maxW="400px" ratio={4 / 3}>
          <img
            src={event[0].image}
            alt={event[0].title}
            style={{ maxWidth: "50vw", borderRadius: "8px" }}
          />
        </AspectRatio>
        <p>Start time: {event[0].startTime}</p>
        <p>End time: {event[0].endTime}</p>
        {/* <p>
        by{" "}
        <Link to={`/user/${event.id}`}>
          {users.find((user) => user.id === event.userId).name}
        </Link>
      </p> */}

        {/* <hr /> */}
        {eventCategories.length > 0 && (
          <div className="categories">
            <h2>Categories:</h2>
            {eventCategories.map((category) => {
              return (
                <div key={category.id} className="category">
                  {category.name}
                </div>
              );
            })}
          </div>
        )}
        <div>
          <p>{userTijdelijk[0].name}</p>
          <AspectRatio maxW="50px" ratio={4 / 3}>
            <img
              src={userTijdelijk[0].image}
              alt={userTijdelijk[0].title}
              style={{ maxWidth: "50vw", borderRadius: "4px" }}
            />
          </AspectRatio>
        </div>

        {/* <DeleteEvent></DeleteEvent>
        <EditEvent></EditEvent> */}

        <Button m={1} colorScheme="red" onClick={onDeleteOpen}>
          Delete event
        </Button>
        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <ModalOverlay
            bg="none"
            backdropFilter="blur(10px) hue-rotate(330deg)"
            // backdropBlur="10px"
            // backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader>Delete event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>This will delete the event, are you sure?</ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                m={2}
                onClick={() => deleteEvent(event[0].id)}
              >
                Delete event
              </Button>
              <Button onClick={onDeleteClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Button m={1} colorScheme="blue" onClick={onEditOpen}>
          Edit event
        </Button>
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="80%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>Edit event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <NewEvent /> */}

              {/* <form onSubmit={submitFunctie}>
   
          <FormLabel>Titel:</FormLabel> */}

              {/* <Button type="submit">
          Updaten
        </Button>
          </form> */}

              <Form
                method="post"
                id="edit-event-form" /*onSubmit={handleSubmit}*/
              >
                <span>User: </span>
                <Select name="userId" m={1} required>
                  <option value="" disabled>
                    Select a user
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titel van het evenement"
                  required
                  m={1}
                />

                <Input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Image URL"
                  required
                  m={1}
                />

                <span>Categories: </span>
                <Select m={1} name="categoryIds" multiple required>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>

                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={3}
                  required
                  m={1}
                />

                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  required
                  m={1}
                />

                <span>Start Date & Time: </span>
                <Flex gap={2}>
                  <Input
                    name="startDate"
                    type="date"
                    bgColor="white"
                    required
                  />
                  <Input
                    name="startTime"
                    type="time"
                    bgColor="white"
                    required
                  />
                </Flex>

                <span>End Date & Time: </span>
                <Flex gap={2}>
                  <Input name="endDate" type="date" bgColor="white" required />
                  <Input name="endTime" type="time" bgColor="white" required />
                </Flex>
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                m={2}
                onClick={() => editEvent(event[0])}
              >
                Edit event
              </Button>
              <Button onClick={onEditClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Flex>
  );
};

// export const EventPage = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:3000/events?id=1`);
//       const data = await response.json();
//       console.log("Fetched data:", data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Heading>Event</Heading>
//       <div>Testing direct fetch...</div>
//     </div>
//   );
// };

// export const loader = async ({ params }) => {
//   if (!params.id) {
//     throw new Error("No event ID provided");
//   }
//   const [users, event, categories] = await Promise.all([
//     fetch(`http://localhost:3000/users?id=${params.id}`),
//     fetch(`http://localhost:3000/events?id=${params.id}`),
//     fetch(`http://localhost:3000/categories?id=${params.id}`),
//   ]);
//   console.log(params.id);
//   if (!users.ok || !event.ok || !categories.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return {
//     users: await users.json(),
//     event: await event.json(),
//     categories: await categories.json(),
//   };
// };
