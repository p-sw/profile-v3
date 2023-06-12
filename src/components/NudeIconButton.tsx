import { FC } from "react";
import { IconButton, IconButtonProps, IconProps, Icon } from "@chakra-ui/react";

const NudeIconButton: FC<IconButtonProps> = (props) => {
  return (
    <IconButton
      {...props}
      bg={"none"}
      _hover={{ bg: "none" }}
      w={"30px"}
      h={"30px"}
      m={0}
      p={0}
    ></IconButton>
  );
};

type NudeIconProps = {
  Iconval: typeof Icon;
};

const NudeIcon: FC<IconProps & NudeIconProps> = ({ Iconval, ...rest }) => {
  return <Iconval {...rest} />;
};

export { NudeIconButton, NudeIcon };
