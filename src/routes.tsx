
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Calculators from './pages/Calculators';
import Calculator from './pages/Calculator';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';

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
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/blog/:id',
    element: <BlogPost />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
