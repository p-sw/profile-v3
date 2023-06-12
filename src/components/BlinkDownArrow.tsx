import { FC } from "react";
import { Box, chakra } from "@chakra-ui/react";

const BlinkDownArrowFC: FC<{ className?: string }> = ({ className }) => {
  return (
    <Box className={className} w={"50px"} h={"50px"}>
      <style>{`
        @keyframes blink {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        `}</style>
      <Box
        bg={"secondary"}
        h={"1px"}
        w={"50%"}
        position={"relative"}
        top={0}
        left={0}
        transform={"rotateZ(45deg)"}
        animation={"blink 0.5s alternate infinite ease-in-out"}
      />
      <Box
        bg={"secondary"}
        h={"1px"}
        w={"50%"}
        position={"relative"}
        top={0}
        right={"-18px"}
        transform={"rotateZ(-45deg)"}
        animation={"blink 0.5s alternate infinite ease-in-out"}
      />
      <Box
        bg={"secondary"}
        h={"1px"}
        w={"50%"}
        position={"relative"}
        top={"10px"}
        left={0}
        transform={"rotateZ(45deg)"}
        animation={"blink 0.5s 0.2s alternate infinite ease-in-out"}
      />
      <Box
        bg={"secondary"}
        h={"1px"}
        w={"50%"}
        position={"relative"}
        top={"10px"}
        right={"-18px"}
        transform={"rotateZ(-45deg)"}
        animation={"blink 0.5s 0.2s alternate infinite ease-in-out"}
      />
    </Box>
  );
};

const BlinkDownArrow = chakra(BlinkDownArrowFC);

export default BlinkDownArrow;
