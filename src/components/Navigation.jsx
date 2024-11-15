import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      {/* <ul>
        <li> */}
      <Link to="/">
        <Button m="2">Home</Button>
      </Link>
      {/* </li> */}
      {/* <li>
          <Link to="/event/:id">Event</Link>
        </li> */}
      {/* <li>
          <Link to="/event/newevent">New Event</Link>
        </li> */}
      {/* </ul> */}
    </nav>
  );
};
