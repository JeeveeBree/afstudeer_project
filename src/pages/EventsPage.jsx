import React, { useEffect, useState, useDisclosure } from "react";
import { Button, Heading, Flex, Box, Text } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";

// export const loader = async ({ params }) => {
//   const users = await fetch(`http://localhost:3000/users/${params.id}`);
//   const events = await fetch(`http://localhost:3000/events/${params.id}`);
//   const categories = await fetch(
//     `http://localhost:3000/categories?id=${params.id}`
//   );

//   return {
//     users: await users.json(),
//     events: await events.json(),
//     categories: await categories.json(),
//   };
// };

export const EventsPage = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:3000/events");
      const events = await response.json();
      console.log(events);
      setEventList(events);
    }
    fetchEvents();
  }, []);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:3000/categories");
      const categories = await response.json();
      console.log(categories);
      setCategoryList(categories);
    }
    fetchCategories();
  }, []);

  const categoryMatch = categoryList.reduce((match, category) => {
    match[category.id] = category.name;
    return match;
  }, {});

  // const [newEvent, setNewEvent] = useState(false);
  // const clickHandler = () => {
  //   setNewEvent(true);
  // };

  return (
    <Flex /*flexDirection={{ lg: "row", base: "column" }}*/ wrap="wrap">
      <div>
        <Heading>List of events</Heading>
        <Link to="/event/newevent">
          <Button className="Button" backgroundColor="black">
            Add event
          </Button>
        </Link>
        <ul>
          {eventList.map((event) => (
            <li key={event.id}>
              <Link
                to={`/event/${event.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box>{event.title}</Box>
                <p>{event.description}</p>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ maxWidth: "200px", borderRadius: "8px" }}
                />
                <p>
                  Start time: {new Date(event.startTime).toLocaleString()}{" "}
                  <br />
                  End time: {new Date(event.endTime).toLocaleString()}
                </p>
                <p>
                  Categories:{" "}
                  {event.categoryIds
                    .map((categoryId) => categoryMatch[categoryId])
                    .join(", ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Flex>
  );
};
