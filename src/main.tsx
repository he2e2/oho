import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Layout } from '@/components/layout';
import { MainPage, ListPage, DetailPage, MyPage, ErrorPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/festival', element: <ListPage /> },
      { path: '/lodgement', element: <ListPage /> },
      { path: '/tour', element: <ListPage /> },
      { path: '/detail/:id', element: <DetailPage /> },
      { path: '/my', element: <MyPage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
