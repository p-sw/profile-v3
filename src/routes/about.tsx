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
  return (
    <Box
      bg={"#ffffff"}
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
  return (
    <>
      <Flex
        position={"absolute"}
        top={"5px"}
        left={0}
        w={"30px"}
        h={"150px"}
        zIndex={1}
        bg={"linear-gradient(to left, #ffffff00, #ffffffff)"}
        justify={"center"}
        align={"center"}
        opacity={!overflow || index === 0 ? 0 : 1}
        transition={"opacity 100ms ease-out"}
        pointerEvents={!overflow || index === 0 ? "none" : "all"}
        onClick={onBack}
      >
        <ArrowBackIcon w={"30px"} h={"30px"} />
      </Flex>
      <Flex
        position={"absolute"}
        top={"5px"}
        left={"calc(100vw - 30px)"}
        w={"30px"}
        h={"150px"}
        zIndex={1}
        bg={"linear-gradient(to right, #ffffff00, #ffffffff)"}
        justify={"center"}
        align={"center"}
        opacity={!overflow || index === maxLength - 1 ? 0 : 1}
        transition={"opacity 100ms ease-out"}
        pointerEvents={!overflow || index === maxLength - 1 ? "none" : "all"}
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
  const lastCardRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (
        lastCardRef.current &&
        lastCardRef.current.getBoundingClientRect().right > window.innerWidth
      ) {
        setOverflowState(true);
      } else {
        setOverflowState(false);
      }
    });
  }, []);

  useEffect(() => {
    if (
      lastCardRef.current &&
      lastCardRef.current.getBoundingClientRect().right > window.innerWidth
    ) {
      setOverflowState(true);
    } else {
      setOverflowState(false);
    }
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
          onFront={() => {
            setIndex((i) => i + 1);
            console.log("front");
          }}
          onBack={() => {
            setIndex((i) => i - 1);
            console.log("back");
          }}
          maxLength={2}
          index={index}
          overflow={overflow}
        />
        <AboutCard title={"Introduction"} currentIndex={index}>
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
