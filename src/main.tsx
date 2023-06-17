import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import Index from '@r/Index';
import About from '@r/about';
import Projects from '@r/projects';
import Teams from '@r/teams';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error';
import theme from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'teams', element: <Teams /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
