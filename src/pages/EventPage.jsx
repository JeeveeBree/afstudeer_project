import React, { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
  if (!params.id) {
    throw new Error("No event ID provided");
  }
  const users = await fetch(`http://localhost:3000/users?id=${params.id}`);
  const event = await fetch(`http://localhost:3000/events?id=${params.id}`);
  console.log("event", event);
  console.log("params.id", params.id);
  const categories = await fetch(
    `http://localhost:3000/categories?id=${params.id}`
  );

  if (!users.ok || !event.ok || !categories.ok) {
    throw new Error("Failed to fetch data");
  }

  console.log("Users:", users);
  console.log("Event:", event);
  console.log("Categories:", categories);

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  console.log(event);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/events?id=1`);
      const data = await response.json();
      console.log("Fetched data:", data);
      console.log("response", response);
      console.log("data", data);
    };
    fetchData();
  }, []);
  console.log("event", event[0]);
  console.log("event.title", event[0].title);
  return (
    <div className="event">
      <h1>{event[0].title}</h1>
      {/* <p>
        by{" "}
        <Link to={`/user/${event.id}`}>
          {users.find((user) => user.id === event.userId).name}
        </Link>
      </p> */}
      <p>
        by{" "}
        <Link to={`/user/${event[0]?.id || ""}`}>
          {users.length > 0
            ? users.find((user) => user.id === event[0]?.userId)?.name ||
              "Unknown User"
            : "User data not available"}
        </Link>
      </p>

      <p>{event[0]?.title || "Event title not found"}</p>
      <hr />
      {categories.length > 0 && (
        <div className="comments">
          <h2>Categories:</h2>
          {categories.map((category) => {
            return <div key={category.id} className="category"></div>;
          })}
        </div>
      )}
    </div>
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
