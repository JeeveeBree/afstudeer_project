import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

// export const EventPage = () => {
//   return <Heading>Event</Heading>;
// };

// export const loader = async ({ params }) => {
//   const users = await fetch(`http://localhost:3000/users?id=${params.id}`);
//   const event = await fetch(`http://localhost:3000/events?id=${params.id}`);
//   console.log(event);
//   console.log(params.id);
//   const categories = await fetch(
//     `http://localhost:3000/categories?id=${params.id}`
//   );

//   return {
//     users: await users.json(),
//     event: await event.json(),
//     categories: await categories.json(),
//   };
// };

export const loader = async ({ params }) => {
  if (!params.id) {
    throw new Error("No event ID provided");
  }
  const [users, event, categories] = await Promise.all([
    fetch(`http://localhost:3000/users?id=${params.id}`),
    fetch(`http://localhost:3000/events?id=${params.id}`),
    fetch(`http://localhost:3000/categories?id=${params.id}`),
  ]);
  console.log(params.id);
  if (!users.ok || !event.ok || !categories.ok) {
    throw new Error("Failed to fetch data");
  }

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  console.log(event);

  return (
    <div className="event">
      {/* <h1>{event.title}</h1> */}
      {/* <p>
        by{" "}
        <Link to={`/user/${event.id}`}>
          {users.find((user) => user.id === event.userId).name}
        </Link>
      </p> */}
      {/* <p>{event.title}</p> */}
      <p>{event?.title || "Event title not found"}</p>
      {/* <hr />
      {categories.length > 0 && (
        <div className="comments">
          <h2>Comments:</h2>
          {categories.map((category) => {
            return <div key={category.id} className="category"></div>;
          })}
        </div>
      )} */}
    </div>
  );
};
