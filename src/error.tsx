import { useRouteError } from "react-router-dom";
import { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

const ErrorPage: FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const error: { status?: number; statusText?: string } = useRouteError();

  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      gap={"50px"}
      h={"100vh"}
      w={"100vw"}
    >
      <Box as={"h1"} textStyle={"poppins"} fontWeight={"800"} fontSize={"48px"}>
        {error.status}: {error.statusText}
      </Box>
      <Box as={"p"} textStyle={"poppins"} fontWeight={"500"} fontSize={"20px"}>
        Instead, I have a little gift for you.
      </Box>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&showinfo=0"
        title="YOU ARE RICKROLLED LOL"
        allow="autoplay; encrypted-media"
      ></iframe>
    </Flex>
  );
};

export default ErrorPage;
