import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box bg="orange.500" height="100vh" width="100vw">
      <Navigation />
      <Outlet />
    </Box>
  );
};
