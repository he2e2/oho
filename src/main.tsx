import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/layout';
import { MainPage, ListPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/festival', element: <ListPage /> },
      { path: '/lodgement', element: <ListPage /> },
      { path: '/tour', element: <ListPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
