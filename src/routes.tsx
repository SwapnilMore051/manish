// src/routes.tsx
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Appbase from './components/appbase/appbase';
import MainPage from './pages/mainpage/mainpage';
import Admin from './pages/admin/admin';
import CrudAudio from './pages/admin/crud-audio/crud-audio';
import CrudVideo from './pages/admin/crud-video/crud-video';
import CrudGallery from './pages/admin/crud-gallery/crud-gallery';
import CrudProject from './pages/admin/crud-project/crud-project';
import AdminBase from './pages/admin/admin-base/admin-base';

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
      ],
    },
    {
      path: '/admin',
      element: <AdminBase />,
      children: [
        {
          path: '', // default route: /admin
          element: <Admin />,
        },
        {
          path: 'crud_audio',        // /admin/crud_audio
          element: <CrudAudio />,
        },
        {
          path: 'crud_video',        // /admin/crud_video
          element: <CrudVideo />,
        },
        {
          path: 'crud_gallery',      // /admin/crud_gallery
          element: <CrudGallery />,
        },
        {
          path: 'crud_projects',     // /admin/crud_projects
          element: <CrudProject />,
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
