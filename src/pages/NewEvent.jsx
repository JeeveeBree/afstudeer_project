import { Form, useLoaderData, redirect } from "react-router-dom";
import { Flex, Input, Select, Textarea, Button } from "@chakra-ui/react";
// import { Toaster, toaster } from "@/components/ui/toaster";

const convertLocalToUTC = (date) => {
  const utcDate = new Date(date);
  return utcDate.toISOString();
};

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
  const [users, categories] = await Promise.all([
    fetch("http://localhost:3000/users").then((res) => res.json()),
    fetch("http://localhost:3000/categories").then((res) => res.json()),
  ]);
  return [users, categories];
};

export const NewEvent = () => {
  const [users, categories] = useLoaderData();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const startDateTime = `${formData.get("startDate")}T${formData.get(
      "startTime"
    )}`;
    const endDateTime = `${formData.get("endDate")}T${formData.get("endTime")}`;

    const newEvent = {
      id: undefined,
      createdBy: formData.get("userId"),
      title: formData.get("title"),
      description: formData.get("description"),
      image: formData.get("image"),
      categoryIds: formData.getAll("categoryIds").map(Number),
      location: formData.get("location"),
      startTime: convertLocalToUTC(startDateTime),
      endTime: convertLocalToUTC(endDateTime),
    };

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: { "Content-Type": "application/json" },
    });

    // toaster.create({
    //   title: "Toast Title",
    //   description: "Toast Description",
    // });

    if (response.ok) {
      const result = await response.json();
      console.log("Event created:", result);
      alert("Event successfully created!");
      // <Toaster />;
      window.location.href = "/";
    } else {
      console.error("Error creating event:", response.statusText);
    }
  };

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
        <Form method="post" id="new-event-form" onSubmit={handleSubmit}>
          <span>User: </span>
          <Select name="userId" bgColor="white" required>
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <span>Title: </span>
          <Input
            name="title"
            placeholder="Title of the event"
            aria-label="title"
            bgColor="white"
            required
            mt={2}
          />
          <span>Image: </span>
          <Input
            name="image"
            placeholder="Image URL"
            aria-label="image"
            bgColor="white"
            mt={2}
          />

          <span>Categories: </span>
          <Select name="categoryIds" bgColor="white" required>
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <span>Description: </span>
          <Textarea
            name="description"
            placeholder="Description"
            aria-label="description"
            bgColor="white"
            rows={3}
            required
            mt={2}
          />
          <span>Location: </span>
          <Input
            name="location"
            placeholder="Location"
            aria-label="location"
            bgColor="white"
            required
            mt={2}
          />

          <span>Start Date & Time: </span>
          <Flex gap={2}>
            <Input name="startDate" type="date" bgColor="white" required />
            <Input name="startTime" type="time" bgColor="white" required />
          </Flex>

          <span>End Date & Time: </span>
          <Flex gap={2}>
            <Input name="endDate" type="date" bgColor="white" required />
            <Input name="endTime" type="time" bgColor="white" required />
          </Flex>

          <Button type="submit" color="white" bgColor="black" mt={4}>
            Save Event
          </Button>
        </Form>
      </div>
    </Flex>
  );
};
