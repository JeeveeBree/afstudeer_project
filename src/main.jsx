import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { NewEvent, loader as newEventLoader } from "./pages/NewEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        // loader: postListLoader,
      },
      {
        path: "/event/:id",
        element: <EventPage />,
        loader: eventLoader,
        // action: addComment,
      },
      {
        path: "/event/newevent",
        element: <NewEvent />,
        loader: newEventLoader,
        // action:
        // action: {async ({params, request}) => {
        //   let formData = await request.formData();
        //   return placeholder(params.newId, formData);
        // }}
        // action: {"`/events/${newId}`"},
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
