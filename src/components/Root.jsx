import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box bg="yellow.100" height="100vh" width="100vw">
      <Navigation />
      <Outlet />
    </Box>
  );
};
