
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Calculators from './pages/Calculators';
import Calculator from './pages/Calculator';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogTagResults from './pages/BlogTagResults';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import BlogPostEditPage from './pages/BlogPostEditPage';
import Page from './pages/Page'; // Import the new Page component

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
    path: '/blog/tag/:tag',
    element: <BlogTagResults />,
  },
  {
    path: '/blog/category/:category',
    element: <BlogTagResults />,
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
    path: '/admin/blog/edit/:id?',
    element: <ProtectedRoute><BlogPostEditPage /></ProtectedRoute>,
  },
  {
    path: '/page/:slug', // Add custom page route
    element: <Page />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
