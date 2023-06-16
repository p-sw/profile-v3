import { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

const About: FC = () => {
  return (
    <Flex
      direction={'column'}
      w={'100vw'}
      h={'calc(100vh - 55px)'}
      py={'20px'}
      justify={'flex-start'}
      gap={'10px'}
    >
      <Box py={'10px'} px={'30px'}>
        <Box
          as={'h1'}
          textStyle={'poppins'}
          fontWeight={'700'}
          fontSize={'36px'}
        >
          Hello, I am Ritonis!
        </Box>
      </Box>
      <Flex
        direction={'row'}
        wrap={'nowrap'}
        justify={'flex-start'}
        align={'center'}
        w={'fit-content'}
        px={'10px'}
        py={'5px'}
        gap={'10px'}
        position={'relative'}
      ></Flex>
    </Flex>
  );
};

export default About;
