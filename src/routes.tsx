
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Calculators from './pages/Calculators';
import Calculator from './pages/Calculator';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/calculators',
    element: <Calculators />,
  },
  {
    path: '/calculator/:id',
    element: <Calculator />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
