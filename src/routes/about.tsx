import { FC, ReactNode, useState, useEffect } from 'react';
import { Box, Flex, useToken } from '@chakra-ui/react';
import BlinkDownArrow from '@c/BlinkDownArrow';

type AboutItemProps = {
  children: ReactNode;
  currentIndex: number;
  myIndex: number;
};

function AboutItem({ children, currentIndex, myIndex }: AboutItemProps) {
  const color = useToken('colors', 'secondary');
  return (
    <Box
      textStyle="aboutitem"
      w="full"
      h="fit-content"
      position="absolute"
      color={color}
      top={`${(myIndex - currentIndex) * 45}%`}
      sx={{
        textStroke: `${myIndex - currentIndex === 1 ? '2px' : '0px'} ${color}`,
        WebkitTextStroke: `${
          myIndex - currentIndex === 1 ? '2px' : '0px'
        } ${color}`,
      }}
      transition="all 500ms ease-out"
    >
      {children}
    </Box>
  );
}

const About: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [swipeState, setSwipeState] = useState<{
    start: number;
    delta: number;
  }>({ start: 0, delta: 0 });
  const maxIndex = 6;

  function addIndex() {
    setCurrentIndex((current) => {
      if (current < maxIndex) {
        return current + 1;
      } else {
        return current;
      }
    });
  }

  function subIndex() {
    setCurrentIndex((current) => {
      if (current > 0) {
        return current - 1;
      } else {
        return current;
      }
    });
  }

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        subIndex();
      } else if (event.key === 'ArrowDown') {
        addIndex();
      }
    });
  }, []);

  return (
    <Flex
      position="relative"
      direction={'column'}
      w={'100vw'}
      h={'calc(100vh - 55px)'}
      px={'30px'}
      py={'20px'}
      justify={'flex-start'}
      gap={'10px'}
    >
      <BlinkDownArrow
        position="absolute"
        bottom="0px"
        left="calc(50vw - 25px)"
        zIndex="2"
        opacity={currentIndex === 0 ? '1' : '0'}
        pointerEvents={currentIndex === 0 ? 'all' : 'none'}
        transition="all 200ms ease-out"
      />
      <Box
        as={'h1'}
        textStyle={'poppins'}
        fontWeight={'bold'}
        fontSize={{ base: '36px', md: '48px' }}
      >
        Hello, I am Ritonis!
      </Box>
      <Flex
        position="relative"
        direction="column"
        py="30px"
        gap="60px"
        w="full"
        h="full"
        boxShadow="inset 0px 70px 20px -15px #ffffff, inset 0px -70px 20px -15px #ffffff"
        overflowY="hidden"
        onWheel={(event) => {
          if (event.deltaY > 50) {
            addIndex();
          } else if (event.deltaY < -50) {
            subIndex();
          }
        }}
        onTouchStart={(event) => {
          setSwipeState({ start: event.changedTouches[0].screenY, delta: 0 });
        }}
        onTouchMove={(event) => {
          setSwipeState((current) => ({
            start: current.start,
            delta: current.start - event.changedTouches[0].screenY,
          }));
        }}
        onTouchEnd={() => {
          console.log(swipeState.delta);
          if (swipeState.delta > 60) {
            addIndex();
          } else if (swipeState.delta < -60) {
            subIndex();
          }
        }}
      >
        <AboutItem currentIndex={currentIndex} myIndex={0}>
          From South Korea, Developer-like Student
        </AboutItem>
        <AboutItem currentIndex={currentIndex} myIndex={1}>
          Born in 2005, Incheon Metropolitan City
        </AboutItem>
        <AboutItem currentIndex={currentIndex} myIndex={2}>
          Developer since 2015
        </AboutItem>
        <AboutItem currentIndex={currentIndex} myIndex={3}>
          High school student
        </AboutItem>
        <AboutItem currentIndex={currentIndex} myIndex={4}>
          Full-stack web developer
        </AboutItem>
        <AboutItem currentIndex={currentIndex} myIndex={5}>
          Hugh fan of Python programming language
        </AboutItem>
        <AboutItem currentIndex={currentIndex} myIndex={6}>
          Typescript lover
        </AboutItem>
        <AboutItem currentIndex={currentIndex} myIndex={7}>
          React & NextJS user
        </AboutItem>
        <AboutItem currentIndex={currentIndex} myIndex={8}>
          Using FastAPI for backend A LOT
        </AboutItem>
      </Flex>
    </Flex>
  );
};

export default About;
