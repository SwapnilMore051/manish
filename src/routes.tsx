// src/routes.tsx
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Appbase from './components/appbase/appbase';
import MainPage from './pages/mainpage/mainpage';
import Admin from './pages/admin/admin';

export const router = createBrowserRouter(
  [
    {
      path: '',
      element: <Appbase />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/admin',
          element: <Admin />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ],
  {
    basename: '/',
  }
);
