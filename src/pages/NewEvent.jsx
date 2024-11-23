import { Form, useLoaderData, redirect } from "react-router-dom";
import { Flex, Input, Select, Textarea, Button } from "@chakra-ui/react";

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
      categoryIds: formData.getAll("categoryIds"),
      location: formData.get("location"),
      startTime: convertLocalToUTC(startDateTime),
      endTime: convertLocalToUTC(endDateTime),
    };

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Event created:", result);
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

          <Input
            name="title"
            placeholder="Title of the event"
            aria-label="title"
            bgColor="white"
            required
            mt={2}
          />

          <Input
            name="image"
            placeholder="Image URL"
            aria-label="image"
            bgColor="white"
            mt={2}
          />

          <span>Categories: </span>
          <Select name="categoryIds" bgColor="white" multiple>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Textarea
            name="description"
            placeholder="Description"
            aria-label="description"
            bgColor="white"
            rows={3}
            required
            mt={2}
          />

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

// import { Form, useLoaderData, redirect } from "react-router-dom";
// import { Flex } from "@chakra-ui/react";

// export const action = async ({ request }) => {
//   const formData = Object.fromEntries(await request.formData());
//   const newId = await fetch("http://localhost:3000/events", {
//     method: "POST",
//     body: JSON.stringify(formData),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((json) => json.id);
//   return redirect(`/events/${newId}`);
// };

// export const loader = async () => {
//   return await fetch("http://localhost:3000/users");
// };

// fetch("http://localhost:3000/events", {
//   method: "POST",
//   body: JSON.stringify({ title: "Test Event" }),
//   headers: { "Content-Type": "application/json" },
// })
//   .then((res) => res.json())
//   .then(console.log)
//   .catch(console.error);

// export const NewEvent = () => {
//   const [users, categories] = useLoaderData();
//   return (
//     <Flex
//       gap={10}
//       w={["full", "100%"]}
//       flexWrap="wrap"
//       justify="center"
//       alignItems="center"
//     >
//       <div className="new-event">
//         <h1>Create New Event</h1>
//         <Form method="post" id="new-event-form"> */}
//          {/* <Form
//           method="post"
//           id="new-event-form"
//           onSubmit={async (e) => {
//             e.preventDefault();
//           }}
//           console.log("Submitting form")
//         >
//            */}
//         <Form
//           method="post"
//           id="new-event-form"
//           onSubmit={async (e) => {
//             e.preventDefault(); // voorkom standaard gedrag
//             const formData = new FormData(e.target);
//             const payload = Object.fromEntries(formData.entries());

//             const response = await fetch("http://localhost:3000/events", {
//               method: "POST",
//               body: JSON.stringify(payload),
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             });

//             if (response.ok) {
//               const result = await response.json();
//               console.log("Success:", result);
//             } else {
//               console.error("Failed to submit:", response.status);
//             }
//           }}
//         >
//           <ul>
//             <li>
//               <label>
//                 <span>User: </span>
//                 <select name="userId">
//                   {users.map((user) => (
//                     <option value={user.id}>{user.name}</option>
//                   ))}
//                 </select>
//               </label>
//             </li>
//             <li>
//               <label>
//                 <span>Activity: </span>
//                 <input
//                   placeholder="Activity:"
//                   aria-label="title"
//                   type="text"
//                   name="title"
//                 />
//               </label>
//             </li>
//             <label>
//               <span>Categories: </span>
//               <select name="categories">
//                 {categories.map((category) => (
//                   <option value={category.id}>{category.name}</option>
//                 ))}
//               </select>
//             </label>
//             <li>
//               <label>
//                 <span>Description: </span>
//                 <textarea
//                   placeholder="Description:"
//                   name="description"
//                   aria-label="description"
//                   type="textS"
//                   rows="1"
//                 />
//               </label>
//             </li>
//             <li>
//               <label>
//                 <span>Location: </span>
//                 <input
//                   placeholder="Location:"
//                   aria-label="location"
//                   type="text"
//                   name="location"
//                 />
//               </label>
//             </li>
//             <li>
//               <label>
//                 <span>Start time: </span>
//                 <input aria-label="startTime" type="time" name="startTime" />
//               </label>
//             </li>
//             <li>
//               <label>
//                 <span>Start date: </span>
//                 <input aria-label="startDate" type="date" name="startDate" />
//               </label>
//             </li>
//             <li>
//               <label>
//                 <span>End time: </span>
//                 <input aria-label="endTime" type="time" name="endTime" />
//               </label>
//             </li>
//             <li>
//               <label>
//                 <span>End date: </span>
//                 <input aria-label="endDate" type="date" name="endDate" />
//               </label>
//             </li>

//             <button type="submit">Save</button>
//           </ul>
//         </Form>
//       </div>
//     </Flex>
//   );
// };

/* <Input
  name="title"
  value={formState.title}
  onChange={handleInputChange}
  required
  placeholder="Title of the event"
  backgroundColor={"gray.100"}
  textColor={"black"}
  mt={2}
/>;
const startDateTimeUTC = convertLocalToUTC(formState.startDateTime);
const newEvent = {
  id: undefined,
  createdBy: formState.userId,
  title: formState.title,
  description: formState.description,
  image: formState.imageUrl,
  categoryIds: formState.categoryIds,
  location: formState.location,
  startTime: startDateTimeUTC,
  endTime: endDateTimeUTC,
}; */
