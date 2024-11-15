import { Form, useLoaderData, redirect } from "react-router-dom";

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

export const NewEvent = () => {
  const users = useLoaderData();
  return (
    <div className="new-event">
      <h1>Create New Event</h1>
      <Form method="post" id="new-event-form">
        <label>
          <span>Activity: </span>
          <input
            placeholder="wat wilde doen dan"
            aria-label="Title"
            type="text"
            name="title"
          />
        </label>
        <label>
          <span>Description: </span>
          <textarea name="description" aria-label="description" rows="6" />
        </label>
        <label>
          <span>User: </span>
          <select name="userId">
            {users.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Save</button>
      </Form>
    </div>
  );
};
