import React, { useEffect, useState, useDisclosure } from "react";
import {
  Button,
  Heading,
  Flex,
  Box,
  Text,
  Center,
  List,
  AspectRatio,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import SearchAndFilter from "../components/SearchAndFilter";

export const EventsPage = () => {
  const [eventList, setEventList] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:3000/events");
      const events = await response.json();
      // console.log(events);
      setEventList(events);
      setFilteredEvents(events);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:3000/categories");
      const categories = await response.json();
      // console.log(categories);
      setCategoryList(categories);
    }
    fetchCategories();
  }, []);

  const categoryMatch = categoryList.reduce((match, category) => {
    match[category.id] = category.name;
    return match;
  }, {});

  const filterEvents = () => {
    let filtered = eventList;

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((event) =>
        event.categoryIds.includes(Number(selectedCategory))
      );
    }

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    filterEvents();
  }, [searchQuery, selectedCategory]);

  return (
    <Center>
      <List spacing={4}>
        <center>
          <Heading>List of events</Heading>
        </center>
        <Flex
          gap={10}
          w={["full", "100%"]}
          flexWrap="wrap"
          justify="center"
          alignItems="center"
        >
          <div>
            <Link to="/event/newevent">
              <Button
                className="Button"
                color="white"
                backgroundColor="black"
                justify="right"
                m={2}
              >
                Add event
              </Button>
            </Link>

            <SearchAndFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoryList={categoryList}
            />

            <Flex
              direction="row"
              wrap="wrap"
              gap={4}
              justify="center"
              align="center"
            >
              {filteredEvents.map((event) => (
                <Box
                  key={event.id}
                  p={4}
                  m={5}
                  borderWidth="3px"
                  borderRadius="lg"
                  boxShadow="dark-lg"
                  maxW="1fr"
                  bgColor="yellow.200"
                  color="black"
                >
                  <Link
                    to={`/event/${event.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box>{event.title}</Box>
                    <p>{event.description}</p>
                    <AspectRatio maxH="20em" ratio={4 / 2}>
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{ /*maxWidth: "200px",*/ borderRadius: "8px" }}
                      />
                    </AspectRatio>
                    <p>
                      Start time: {new Date(event.startTime).toLocaleString()}
                      <br />
                      End time: {new Date(event.endTime).toLocaleString()}
                    </p>
                    <p>
                      Categories:{" "}
                      {event.categoryIds?.length
                        ? event.categoryIds
                            .map((categoryId) => categoryMatch[categoryId])
                            .join(", ")
                        : "No categories"}
                    </p>
                  </Link>
                </Box>
              ))}
            </Flex>
          </div>
        </Flex>
      </List>
    </Center>
  );
};

//   return (
//     <Center>
//       <List spacing={4}>
//         <center>
//           <Heading>List of events</Heading>
//         </center>
//         <Flex
//           // flexDirection={{ lg: "row", base: "column" }}
//           gap={10}
//           w={["full", "100%"]}
//           flexWrap="wrap"
//           justify="center"
//           alignItems="center"
//         >
//           <div>
//             <Link to="/event/newevent">
//               <Button className="Button" backgroundColor="black">
//                 Add event
//               </Button>
//             </Link>
//             <ul>
//               {eventList.map((event) => (
//                 <li key={event.id}>
//                   <Link
//                     to={`/event/${event.id}`}
//                     style={{ textDecoration: "none", color: "inherit" }}
//                   >
//                     <Box>{event.title}</Box>
//                     <p>{event.description}</p>
//                     <img
//                       src={event.image}
//                       alt={event.title}
//                       style={{ maxWidth: "200px", borderRadius: "8px" }}
//                     />
//                     <p>
//                       Start time: {new Date(event.startTime).toLocaleString()}{" "}
//                       <br />
//                       End time: {new Date(event.endTime).toLocaleString()}
//                     </p>
//                     <p>
//                       Categories:{" "}
//                       {event.categoryIds
//                         .map((categoryId) => categoryMatch[categoryId])
//                         .join(", ")}
//                     </p>
//                   </Link>
//                 </li>
//               ))}
//             </ul> */}

//              <Flex
//               direction="row"
//               wrap="wrap"
//               gap={4}
//               justify="center"
//               align="center"
//             >
//               {eventList.map((event) => (
//                 <Box
//                   key={event.id}
//                   p={4}
//                   borderWidth="1px"
//                   borderRadius="lg"
//                   boxShadow="md"
//                   maxW="200px"
//                 >
//                   <Link
//                     to={`/event/${event.id}`}
//                     style={{ textDecoration: "none", color: "inherit" }}
//                   >
//                     <Box>{event.title}</Box>
//                     <p>{event.description}</p>
//                     <img
//                       src={event.image}
//                       alt={event.title}
//                       style={{ maxWidth: "200px", borderRadius: "8px" }}
//                     />
//                     <p>
//                       Start time: {new Date(event.startTime).toLocaleString()}
//                       <br />
//                       End time: {new Date(event.endTime).toLocaleString()}
//                     </p>
//                     <p>
//                       Categories:{" "}
//                       {event.categoryIds
//                         .map((categoryId) => categoryMatch[categoryId])
//                         .join(", ")}
//                     </p>
//                     <p>
//                       Categories:{" "}
//                       {event.categoryIds?.length
//                         ? event.categoryIds
//                             .map((categoryId) => categoryMatch[categoryId])
//                             .join(", ")
//                         : "No categories"}
//                     </p>
//                   </Link>
//                 </Box>
//               ))}
//             </Flex>
//           </div>
//         </Flex>
//       </List>
//     </Center>
//   );
// };
