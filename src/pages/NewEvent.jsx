import { Form, useLoaderData, redirect } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/events/${newId}`);
};

export const loader = async () => {
  return await fetch("http://localhost:3000/users");
};

// fetch("http://localhost:3000/events", {
//   method: "POST",
//   body: JSON.stringify({ title: "Test Event" }),
//   headers: { "Content-Type": "application/json" },
// })
//   .then((res) => res.json())
//   .then(console.log)
//   .catch(console.error);

export const NewEvent = () => {
  const users = useLoaderData();
  return (
    <Flex
      gap={10}
      w={["full", "100%"]}
      flexWrap="wrap"
      justify="center"
      alignItems="center"
    >
      <div className="new-event">
        <h1>Create New Event</h1>
        {/* <Form method="post" id="new-event-form"> */}
        {/* <Form
          method="post"
          id="new-event-form"
          onSubmit={(e) => console.log("Submitting form")}
        > */}
        <Form
          method="post"
          id="new-event-form"
          onSubmit={async (e) => {
            e.preventDefault(); // voorkom standaard gedrag
            const formData = new FormData(e.target);
            const payload = Object.fromEntries(formData.entries());

            const response = await fetch("http://localhost:3000/events", {
              method: "POST",
              body: JSON.stringify(payload),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              const result = await response.json();
              console.log("Success:", result);
            } else {
              console.error("Failed to submit:", response.status);
            }
          }}
        >
          <ul>
            <li>
              <label>
                <span>User: </span>
                <select name="userId">
                  {users.map((user) => (
                    <option value={user.id}>{user.name}</option>
                  ))}
                </select>
              </label>
            </li>
            <li>
              <label>
                <span>Activity: </span>
                <input
                  placeholder="Activity:"
                  aria-label="title"
                  type="text"
                  name="title"
                />
              </label>
            </li>
            <li>
              <label>
                <span>Description: </span>
                <textarea
                  placeholder="Description:"
                  name="description"
                  aria-label="description"
                  rows="1"
                />
              </label>
            </li>
            <li>
              <label>
                <span>Location: </span>
                <input
                  placeholder="Location:"
                  aria-label="location"
                  type="text"
                  name="location"
                />
              </label>
            </li>
            <li>
              <label>
                <span>Start time: </span>
                <input
                  placeholder="Start time"
                  aria-label="startTime"
                  type="time"
                  name="start time"
                />
              </label>
            </li>
            <li>
              <label>
                <span>Start date: </span>
                <input
                  placeholder="Start date"
                  aria-label="startDate"
                  type="date"
                  name="start date"
                />
              </label>
            </li>
            <li>
              <label>
                <span>End time: </span>
                <input
                  placeholder="End time"
                  aria-label="endTime"
                  type="time"
                  name="end time"
                />
              </label>
            </li>

            <button type="submit">Save</button>
          </ul>
        </Form>
      </div>
    </Flex>
  );
};
