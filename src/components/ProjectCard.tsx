import {
  FC,
  ReactNode,
  MutableRefObject,
  useState,
  useEffect,
  Children,
  useRef,
  isValidElement,
  cloneElement,
  Ref,
  ReactElement,
} from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import {
  useColorModeValue,
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  chakra,
  BoxProps,
} from '@chakra-ui/react';

export interface ProjectCardProps extends BoxProps {
  title: string;
  children: ReactNode;
  currentIndex?: number;
  color?: { dark: string; light: string };
  customRef?: Ref<HTMLDivElement>;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  children,
  currentIndex,
  color = { light: '#0088ff', dark: '#55bbff' },
  customRef,
}) => {
  const bgColor = useColorModeValue('#ffffff', '#000000');
  const bgTopColor = useColorModeValue(color.light, color.dark);
  return (
    <Box
      bg={bgColor}
      w={'280px'}
      h={'150px'}
      position={'relative'}
      top={0}
      left={`${290 * -(currentIndex ?? 0)}px`}
      transition={'all 350ms cubic-bezier(.2,.65,.5,1)'}
      ref={customRef}
    >
      <Card
        w={'280px'}
        h={'150px'}
        px={'15px'}
        py={'10px'}
        bg={`radial-gradient(circle at left top, ${bgTopColor}46 0%, ${bgTopColor}ff 100%)`}
      >
        <CardHeader
          p={0}
          textStyle={'poppins'}
          fontWeight={600}
          fontSize={'24px'}
          color={'#ffffff'}
        >
          <Heading>{title}</Heading>
        </CardHeader>
        <CardBody
          p={0}
          textStyle={'poppins'}
          fontWeight={400}
          fontSize={'14px'}
          color={'#ffffff'}
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
  firstCardRef: MutableRefObject<null | HTMLDivElement>;
  lastCardRef: MutableRefObject<null | HTMLDivElement>;
};

const PaginatorControl: FC<PaginatorControlProps> = ({
  onFront,
  onBack,
  maxLength,
  index,
  firstCardRef,
  lastCardRef,
}) => {
  const [overflow, setOverflowState] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
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

  const bgColor = useColorModeValue('#ffffff', '#000000');
  return (
    <>
      <Flex
        position={'absolute'}
        top={'5px'}
        left={!overflow || index === 0 ? '-60px' : '-30px'}
        w={'30px'}
        h={'150px'}
        zIndex={1}
        bg={`linear-gradient(to left, ${bgColor}00, ${bgColor}ff)`}
        justify={'center'}
        align={'center'}
        transition={'all 100ms ease-out'}
        onClick={onBack}
      >
        <ArrowBackIcon w={'30px'} h={'30px'} />
      </Flex>
      <Flex
        position={'absolute'}
        top={'5px'}
        right={!overflow || index === maxLength ? '-60px' : '-10px'}
        w={'30px'}
        h={'150px'}
        zIndex={1}
        bg={`linear-gradient(to right, ${bgColor}00, ${bgColor}ff)`}
        justify={'center'}
        align={'center'}
        transition={'all 100ms ease-out'}
        onClick={onFront}
      >
        <ArrowForwardIcon w={'30px'} h={'30px'} />
      </Flex>
    </>
  );
};

const ProjectCardContainerFC: FC<{
  className?: string;
  children: ReactElement<ProjectCardProps> | ReactElement<ProjectCardProps>[];
}> = ({ className, children }) => {
  const [index, setIndex] = useState<number>(0);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  return (
    <Flex
      className={className}
      direction={'row'}
      wrap={'nowrap'}
      justify={'flex-start'}
      align={'flex-start'}
      w={'full'}
      px={'10px'}
      py={'5px'}
      gap={'10px'}
      position={'relative'}
      boxSizing="content-box"
    >
      <PaginatorControl
        onFront={() => setIndex((i) => i + 1)}
        onBack={() => setIndex((i) => i - 1)}
        maxLength={Children.count(children) - 1}
        index={index}
        firstCardRef={firstCardRef}
        lastCardRef={lastCardRef}
      />
      {Children.map(children, (child, childIndex) => {
        if (isValidElement<ProjectCardProps>(child)) {
          if (childIndex === 0 || childIndex === Children.count(children) - 1) {
            return cloneElement(child, {
              customRef:
                childIndex === 0
                  ? firstCardRef
                  : childIndex === Children.count(children) - 1
                  ? lastCardRef
                  : null,
              currentIndex: index,
            });
          } else {
            return cloneElement(child, {
              currentIndex: index,
            });
          }
        } else {
          return null;
        }
      })}
    </Flex>
  );
};

const ProjectCardContainer = chakra(ProjectCardContainerFC);

/*

Usage

<PaginatorControl
  onFront={() => setIndex((i) => i + 1)}
  onBack={() => setIndex((i) => i - 1)}
  maxLength={2}
  index={index}
  firstCardRef={firstCardRef}
  lastCardRef={lastCardRef}
/>
<ProjectCard
  title={"Introduction"}
  currentIndex={index}
  lastRef={firstCardRef}
>
  I'm living in South Korea, Learning web development skills. Currently,
  I mainly write my app in Python & TypeScript (or JavaScript).
</ProjectCard>
<ProjectCard
  title={"My Skill"}
  currentIndex={index}
  lastRef={lastCardRef}
>
  Mainly using Python & TypeScript (or JavaScript). Since I fall in love
  with frontend frameworks, I use TypeScript a lot.
</ProjectCard>

*/

export { ProjectCard, PaginatorControl, ProjectCardContainer };
