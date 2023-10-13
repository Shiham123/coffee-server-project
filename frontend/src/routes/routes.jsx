import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import ErrorPage from '../pages/errorPage';
import AddCoffee from '../pages/addCoffee';
import UpdateCoffee from '../pages/updateCoffee';

const routes = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
  { path: '/addCoffee', element: <AddCoffee /> },
  { path: '/updateCoffee', element: <UpdateCoffee /> },
]);

export default routes;
