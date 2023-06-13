import {
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

type AboutCardProps = {
  title: string;
  children: ReactNode;
  currentIndex: number;
  lastRef?: MutableRefObject<null | HTMLDivElement>;
  color?: string;
};

const AboutCard: FC<AboutCardProps> = ({
  title,
  children,
  currentIndex,
  lastRef,
  color = "#0088ff",
}) => {
  const bgColor = useColorModeValue("#ffffff", "#000000");
  return (
    <Box
      bg={bgColor}
      w={"280px"}
      h={"150px"}
      position={"relative"}
      top={0}
      left={`${280 * -currentIndex}px`}
      transition={"all 350ms cubic-bezier(.2,.65,.5,1)"}
      ref={lastRef}
    >
      <Card
        w={"280px"}
        h={"150px"}
        px={"15px"}
        py={"10px"}
        bg={`radial-gradient(circle at left top, ${color}46 0%, ${color}ff 100%)`}
      >
        <CardHeader
          p={0}
          textStyle={"poppins"}
          fontWeight={600}
          fontSize={"24px"}
          color={"#ffffff"}
        >
          <Heading>{title}</Heading>
        </CardHeader>
        <CardBody
          p={0}
          textStyle={"poppins"}
          fontWeight={400}
          fontSize={"14px"}
          color={"#ffffff"}
        >
          {children}
        </CardBody>
      </Card>
    </Box>
  );
};

type PaginatorControlProps = {
  onFront: () => void;
  onBack: () => void;
  maxLength: number;
  index: number;
  overflow: boolean;
};

const PaginatorControl: FC<PaginatorControlProps> = ({
  onFront,
  onBack,
  maxLength,
  index,
  overflow,
}) => {
  const bgColor = useColorModeValue("#ffffff", "#000000");
  return (
    <>
      <Flex
        position={"absolute"}
        top={"5px"}
        left={!overflow || index === 0 ? "-30px" : 0}
        w={"30px"}
        h={"150px"}
        zIndex={1}
        bg={`linear-gradient(to left, ${bgColor}00, ${bgColor}ff)`}
        justify={"center"}
        align={"center"}
        transition={"all 100ms ease-out"}
        onClick={onBack}
      >
        <ArrowBackIcon w={"30px"} h={"30px"} />
      </Flex>
      <Flex
        position={"absolute"}
        top={"5px"}
        left={
          !overflow || index === maxLength - 1 ? "100vw" : "calc(100vw - 30px)"
        }
        w={"30px"}
        h={"150px"}
        zIndex={1}
        bg={`linear-gradient(to right, ${bgColor}00, ${bgColor}ff)`}
        justify={"center"}
        align={"center"}
        transition={"all 100ms ease-out"}
        onClick={onFront}
      >
        <ArrowForwardIcon w={"30px"} h={"30px"} />
      </Flex>
    </>
  );
};

const About: FC = () => {
  const [index, setIndex] = useState(0);
  const [overflow, setOverflowState] = useState(false);
  const firstCardRef = useRef<null | HTMLDivElement>(null);
  const lastCardRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (
        (lastCardRef.current &&
          lastCardRef.current.getBoundingClientRect().right >
            window.innerWidth) ||
        (firstCardRef.current &&
          firstCardRef.current.getBoundingClientRect().left < 0)
      ) {
        setOverflowState(true);
      } else {
        setOverflowState(false);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (
        (lastCardRef.current &&
          lastCardRef.current.getBoundingClientRect().right >
            window.innerWidth) ||
        (firstCardRef.current &&
          firstCardRef.current.getBoundingClientRect().left < 0)
      ) {
        setOverflowState(true);
      } else {
        setOverflowState(false);
      }
    }, 200);
  }, [index]);

  return (
    <Flex
      direction={"column"}
      w={"100vw"}
      h={"calc(100vh - 55px)"}
      py={"20px"}
      justify={"flex-start"}
      gap={"10px"}
    >
      <Box py={"10px"} px={"30px"}>
        <Box
          as={"h1"}
          textStyle={"poppins"}
          fontWeight={"700"}
          fontSize={"36px"}
        >
          Hello, I am Ritonis!
        </Box>
      </Box>
      <Flex
        direction={"row"}
        wrap={"nowrap"}
        justify={"flex-start"}
        align={"center"}
        w={"fit-content"}
        px={"10px"}
        py={"5px"}
        gap={"10px"}
        position={"relative"}
      >
        <PaginatorControl
          onFront={() => setIndex((i) => i + 1)}
          onBack={() => setIndex((i) => i - 1)}
          maxLength={2}
          index={index}
          overflow={overflow}
        />
        <AboutCard
          title={"Introduction"}
          currentIndex={index}
          lastRef={firstCardRef}
        >
          I'm living in South Korea, Learning web development skills. Currently,
          I mainly write my app in Python & TypeScript (or JavaScript).
        </AboutCard>
        <AboutCard
          title={"My Skill"}
          currentIndex={index}
          lastRef={lastCardRef}
        >
          Mainly using Python & TypeScript (or JavaScript). Since I fall in love
          with frontend frameworks, I use TypeScript a lot.
        </AboutCard>
      </Flex>
    </Flex>
  );
};

export default About;
