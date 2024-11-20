import React, { useEffect, useDisclosure } from "react";
import { Heading, Button, Box, AspectRatio, Flex } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
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
  const usersFetch = await fetch(`http://localhost:3000/users?id=2`);
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
  };
};

export const EventPage = () => {
  const { event, categories, userTijdelijk } = useLoaderData();
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
        <p>{event[0].startTime}</p>
        <p>{event[0].endTime}</p>
        {/* <p>
        by{" "}
        <Link to={`/user/${event.id}`}>
          {users.find((user) => user.id === event.userId).name}
        </Link>
      </p> */}
        <p>by {userTijdelijk[0].name}</p>

        <p>{event[0]?.title || "Event title not found"}</p>
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
