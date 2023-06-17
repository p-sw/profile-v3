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
import { IoLogoGithub } from 'react-icons/io';
import { IoGlobeOutline } from 'react-icons/io5';
import {
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Flex,
  chakra,
  BoxProps,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';

export interface ProjectCardProps extends BoxProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  github?: string;
  web?: string;
  currentIndex?: number;
  customRef?: Ref<HTMLDivElement>;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  subtitle,
  children,
  github,
  web,
  currentIndex,
  customRef,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        position={'relative'}
        top={0}
        left={`${270 * -(currentIndex ?? 0)}px`}
        transition={'all 350ms cubic-bezier(.2,.65,.5,1)'}
        _hover={{ transform: 'scale(1.04)' }}
        ref={customRef}
        w={'260px'}
        minW={'260px'}
        h={'150px'}
        px={'15px'}
        py={'10px'}
        onClick={onOpen}
        cursor="pointer"
      >
        <CardHeader
          p={0}
          textStyle={'poppins'}
          fontWeight={'medium'}
          fontSize={'18px'}
          color={'primary'}
        >
          {title}
        </CardHeader>
        <CardBody
          p={0}
          textStyle={'poppins'}
          fontWeight={'light'}
          fontSize={'14px'}
          color={'secondary'}
        >
          {subtitle}
        </CardBody>
      </Card>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
          {github || web ? (
            <DrawerFooter
              display="flex"
              flexDirection="row"
              gap="10px"
              py="8px"
              h="32px"
              boxSizing="content-box"
            >
              {github ? (
                <Icon
                  as={IoLogoGithub}
                  w="32px"
                  h="32px"
                  cursor="pointer"
                  p="4px"
                  onClick={() => (window.location.href = github)}
                />
              ) : null}
              {web ? (
                <Icon
                  as={IoGlobeOutline}
                  w="32px"
                  h="32px"
                  cursor="pointer"
                  p="4px"
                  onClick={() => (window.location.href = web)}
                />
              ) : null}
            </DrawerFooter>
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
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
        right={!overflow || index === maxLength ? '-60px' : '-30px'}
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

  function addIndex() {
    setIndex((i) => (i < Children.count(children) - 1 ? i + 1 : i));
  }
  function subIndex() {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }

  return (
    <Flex
      className={className}
      direction={'row'}
      wrap={'nowrap'}
      justify={'flex-start'}
      align={'flex-start'}
      w={'full'}
      py={'5px'}
      gap={'10px'}
      position={'relative'}
      boxSizing="content-box"
      onWheel={(event) => {
        if (event.deltaY > 50) {
          addIndex();
        } else if (event.deltaY < -50) {
          subIndex();
        }
      }}
    >
      <PaginatorControl
        onFront={() => addIndex()}
        onBack={() => subIndex()}
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
