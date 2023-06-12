import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navigation from "@c/Navigation.tsx";
const Root: FC = () => {
  return (
    <>
      <Navigation />
      <Box pt={"55px"}>
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
