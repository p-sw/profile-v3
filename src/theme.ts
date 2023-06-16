import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  semanticTokens: {
    colors: {
      bg: {
        default: '#f4f4ee',
        _light: '#f4f4ee',
        _dark: '#000000',
      },
      primary: {
        default: '#000000',
        _light: '#000000',
        _dark: '#ffffff',
      },
      secondary: {
        default: '#757575',
        _light: '#757575',
        _dark: '#8F8F8F',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'html,body,div#root': {
        minH: '100vh',
        maxW: '100vw',
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': {
        w: '5px',
      },
      '::-webkit-scrollbar-track': {
        background: 'bg',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'secondary',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'primary',
      },
    },
  },
  textStyles: {
    poppins: {
      fontFamily: "'poppins'",
    },
    categorytitle: {
      fontFamily: "'poppins'",
      fontWeight: 600,
      fontSize: '28px',
    },
    categoryitem: {
      fontFamily: "'poppins'",
      fontWeight: 300,
      fontSize: '16px',
    },
    navitem: {
      fontFamily: "'poppins'",
      fontWeight: 500,
      fontSize: '18px',
    },
    navitempc: {
      fontFamily: "'poppins'",
      fontWeight: 300,
      fontSize: '20px',
    },
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
});

export default theme;
