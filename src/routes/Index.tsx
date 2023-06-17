import { FC, ReactNode } from 'react';
import { Image, Box, Flex } from '@chakra-ui/react';
import BlinkDownArrow from '@c/BlinkDownArrow';

type CategoryProps = {
  direction: 'start' | 'end';
  title: string;
  items: string[];
  img: ReactNode;
};

const Category: FC<CategoryProps> = ({ direction, title, items, img }) => {
  return (
    <Flex
      direction={{
        base: direction === 'start' ? 'row' : 'row-reverse',
        md: 'column-reverse',
      }}
      justify={{ base: 'center', md: 'flex-end' }}
      align={'center'}
      w={'100vw'}
      h={{ base: 'fit-content', md: 'full' }}
      userSelect={'none'}
    >
      <Flex
        direction={'column'}
        justify={'center'}
        align={{
          base: direction === 'start' ? 'flex-end' : 'flex-start',
          md: 'center',
        }}
        h={{ base: 'fit-content', md: 'full' }}
      >
        <Box textStyle={'categorytitle'} as={'h1'}>
          {title}
        </Box>
        <Flex
          direction={'column'}
          justify={{ base: 'center', md: 'space-between' }}
          align={{
            base: direction === 'start' ? 'flex-end' : 'flex-start',
            md: 'center',
          }}
          gap={'10px'}
          h={{ base: 'auto', md: 'full' }}
        >
          {items.map((item, index) => (
            <Box key={index} textStyle={'categoryitem'} as={'p'}>
              {item}
            </Box>
          ))}
        </Flex>
      </Flex>
      {img}
    </Flex>
  );
};

const Index: FC = () => {
  return (
    <>
      <Flex
        as={'section'}
        direction={'column'}
        justify={'center'}
        align={'flex-start'}
        pl={{ base: '50px', md: '100px' }}
        h={'100vh'}
        w={'100vw'}
        position={'relative'}
      >
        <Image
          src={'/wavingHand.png'}
          w={{ base: '258px', md: '320px', '2xl': '462px' }}
          h={{ base: '301px', md: '372px', '2xl': '537px' }}
          position={'absolute'}
          top={'100px'}
          right={{ base: '-65px', '2xl': '-100px' }}
          transform={'rotateZ(-12deg)'}
          zIndex={-1}
          userSelect={'none'}
        />
        <Box
          as={'h1'}
          textStyle={'poppins'}
          fontWeight={700}
          fontSize={{ base: '48px', xl: '64px' }}
          userSelect={'none'}
        >
          Hello!
        </Box>
        <Box
          as={'p'}
          textStyle={'poppins'}
          fontWeight={400}
          fontSize={{ base: '24px', xl: '32px' }}
          pr={'50px'}
          color={'secondary'}
          userSelect={'none'}
        >
          I am{' '}
          <Box
            as={'span'}
            textDecoration={'underline'}
            bg={'linear-gradient(-25deg, #73e79e, #6323d1)'}
            backgroundClip={'text'}
            color={'secondary'}
            transition={'all 200ms ease-out'}
            _hover={{
              color: 'transparent',
              transition: 'all 200ms ease-out',
            }}
            cursor={'pointer'}
            onClick={() => {
              window.location.href = 'https://github.com/ritonis';
            }}
          >
            Ritonis
          </Box>
          ,
          <br />a full-stack web developer.
        </Box>
        <BlinkDownArrow
          position={'absolute'}
          top={'calc(100svh - 50px - 55px)'}
          left={'calc(50vw - 25px)'}
        />
      </Flex>
      <Flex
        as={'section'}
        direction={'column'}
        justify={'center'}
        align={{ base: 'flex-start', md: 'center' }}
        w={'100vw'}
        h={'fit-content'}
        minH={'60vh'}
        py={'35px'}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify={'center'}
          align={'flex-start'}
          w={'100vw'}
          h={'fit-content'}
          gap={'35px'}
        >
          <Category
            direction={'start'}
            title={'Frontend'}
            items={['React', 'NextJS', 'Chakra-UI', 'TailwindCSS']}
            img={<Image src={'/frontend.png'} w={'125px'} h={'125px'} />}
          />
          <Category
            direction={'end'}
            title={'Backend'}
            items={['Django', 'Flask', 'FastAPI']}
            img={<Image src={'/backend.png'} w={'125px'} h={'125px'} />}
          />
          <Category
            direction={'start'}
            title={'Design'}
            items={['Figma', 'Lunacy']}
            img={<Image src={'/design.png'} w={'125px'} h={'125px'} />}
          />
          <Category
            direction={'end'}
            title={'Server'}
            items={['Nginx', 'Ubuntu Server', 'Arch Linux', 'Docker', 'PM2']}
            img={<Image src={'/server.png'} w={'125px'} h={'125px'} />}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Index;
