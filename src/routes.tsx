
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Calculators from './pages/Calculators';
import Calculator from './pages/Calculator';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Page from './pages/Page';

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
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: '/page/:slug',
    element: <Page />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
