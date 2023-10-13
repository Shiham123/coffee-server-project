import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import ErrorPage from '../pages/errorPage';
import AddCoffee from '../pages/addCoffee';
import UpdateCoffee from '../pages/updateCoffee';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: () => fetch('http://localhost:3000/coffee'),
  },
  { path: '/addCoffee', element: <AddCoffee /> },
  {
    path: '/updateCoffee/:id',
    element: <UpdateCoffee />,
    loader: ({ params }) => fetch(`http://localhost:3000/coffee/${params.id}`),
  },
]);

export default routes;
