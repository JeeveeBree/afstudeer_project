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
  return redirect(`/post/${newId}`);
};

export const loader = async () => {
  return await fetch("http://localhost:3000/users");
};

export const NewEvent = () => {
  const users = useLoaderData();
  return (
    <div className="new-event">
      <h1>New Event</h1>
      <Form method="event" id="new-event-form">
        <label>
          <span>Title</span>
          <input
            placeholder="An exciting title..."
            aria-label="Title"
            type="text"
            name="title"
          />
        </label>
        <label>
          <span>Body</span>
          <textarea name="body" aria-label="Body" rows="6" />
        </label>
        <label>
          <span>User</span>
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
