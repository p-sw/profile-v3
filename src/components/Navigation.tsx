import { FC, useEffect, useRef, useState } from 'react';
import {
  Flex,
  Link,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  Icon,
} from '@chakra-ui/icons';
import { NudeIcon, NudeIconButton } from './NudeIconButton';
import { IoLogoGithub } from 'react-icons/io';
import { Link as ReactLink } from 'react-router-dom';

type NavItemProps = {
  children: string;
  isMobile: boolean;
  href: string;
  navClose: () => void;
};

const NavItem: FC<NavItemProps> = ({ navClose, children, isMobile, href }) => {
  return (
    <Link
      as={ReactLink}
      textStyle={isMobile ? 'navitem' : 'navitempc'}
      color={'secondary'}
      to={href}
      onClick={navClose}
    >
      {children}
    </Link>
  );
};

const NavThemeChanger: FC = () => {
  const { colorMode, setColorMode } = useColorMode();
  const themeColor = useColorModeValue('#f4f4ee', '#000000');

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', themeColor);
  }, [themeColor]);

  if (colorMode === 'light') {
    return (
      <NudeIconButton
        aria-label={'light mode'}
        icon={<NudeIcon Iconval={SunIcon} />}
        onClick={() => {
          setColorMode('dark');
        }}
      />
    );
  } else {
    return (
      <NudeIconButton
        aria-label={'dark mode'}
        icon={<NudeIcon Iconval={MoonIcon} />}
        onClick={() => {
          setColorMode('light');
        }}
      />
    );
  }
};

const NavGithubButton: FC = () => {
  return (
    <NudeIconButton
      aria-label={'github'}
      icon={<Icon as={IoLogoGithub} />}
      onClick={() =>
        (window.location.href = 'https://github.com/ritonis/profile-v3')
      }
    />
  );
};

const Navigation: FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;
  const navHeight = useBreakpointValue({ base: 40, md: 55 }) ?? 40;
  const [onLoad, setOnLoad] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navDropdownRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setOnLoad(true);
  }, []);

  return (
    <Flex
      direction={'column'}
      justify={'flex-start'}
      align={'flex-start'}
      position={'fixed'}
      top={0}
      left={0}
      w={'100vw'}
      h={'fit-content'}
      zIndex={1000}
    >
      <Flex
        position={'relative'}
        direction={'row'}
        justify={'space-between'}
        align={'center'}
        px={'25px'}
        h={`${navHeight}px`}
        w={'100vw'}
        zIndex={1000}
        top={onLoad ? 0 : `-${navHeight}px`}
        left={0}
        transition={'all 200ms ease-out'}
        bgColor={'bg'}
      >
        <Link
          as={ReactLink}
          textStyle={'poppins'}
          fontWeight={300}
          fontSize={['18px', null, '30px']}
        >
          Ritonis
        </Link>
        {!isMobile ? (
          <Flex
            direction={'row'}
            justify={'flex-start'}
            align={'center'}
            px={'5px'}
            gap={'10px'}
          >
            <NavItem isMobile={isMobile} href={'/about'} navClose={onClose}>
              About
            </NavItem>
            <NavItem isMobile={isMobile} href={'/projects'} navClose={onClose}>
              Projects
            </NavItem>
            <Flex
              direction={'row'}
              justify={'flex-start'}
              align={'center'}
              px={'15px'}
              gap={'10px'}
            >
              <NavThemeChanger />
              <NavGithubButton />
            </Flex>
          </Flex>
        ) : null}
        {isMobile ? (
          isOpen ? (
            <NudeIconButton
              aria-label={'Close'}
              icon={<NudeIcon Iconval={CloseIcon} w={'20px'} h={'20px'} />}
              onClick={onClose}
            />
          ) : (
            <NudeIconButton
              aria-label={'Open'}
              icon={<NudeIcon Iconval={HamburgerIcon} w={'30px'} h={'30px'} />}
              onClick={onOpen}
            />
          )
        ) : null}
      </Flex>
      {isMobile ? (
        <>
          <Flex
            position={'absolute'}
            top={isOpen ? `${navHeight}px` : 0}
            left={0}
            bgColor={'bg'}
            zIndex={999}
            direction={'row'}
            justify={'flex-end'}
            align={'center'}
            px={'15px'}
            gap={'5px'}
            w={'100vw'}
            h={`${navHeight}px`}
            transition={'all 200ms ease-out'}
            transitionDelay={isOpen ? '0' : '300ms'}
          >
            <NavThemeChanger />
            <NavGithubButton />
          </Flex>
          <Flex
            position={'absolute'}
            direction={'column'}
            justify={'flex-start'}
            align={'center'}
            gap={'25px'}
            py={'25px'}
            w={'100vw'}
            h={'fit-content'}
            top={
              isOpen
                ? `${navHeight * 2}px`
                : `-${
                    navDropdownRef.current?.getBoundingClientRect().height ??
                    10000
                  }px`
            }
            transition={'all 400ms ease-out'}
            transitionDelay={isOpen ? '100ms' : '0'}
            bg={'bg'}
            ref={navDropdownRef}
          >
            <NavItem isMobile={isMobile} href={'/about'} navClose={onClose}>
              About
            </NavItem>
            <NavItem isMobile={isMobile} href={'/projects'} navClose={onClose}>
              Projects
            </NavItem>
          </Flex>
        </>
      ) : null}
    </Flex>
  );
};

export default Navigation;
