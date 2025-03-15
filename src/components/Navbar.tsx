
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks/use-theme';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Direct link to WordPress blog subdomain with explicit protocol 
  // Using window.location.href for the blog link to force a full page navigation
  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'https://blog.asphaltcalculator.co';
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-transparent dark:bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-1 text-asphalt dark:text-white font-merriweather font-bold text-xl animate-fade-in"
          >
            <span className="text-safety-dark">asphalt</span>
            calculator.co
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/calculators" 
              className={`nav-link flex items-center space-x-1 ${isActive('/calculators') ? 'text-foreground font-semibold' : ''}`}
            >
              <Calculator size={18} />
              <span>Calculators</span>
            </Link>
            <a 
              href="https://blog.asphaltcalculator.co"
              className="nav-link flex items-center space-x-1"
              onClick={handleBlogClick}
            >
              <BookOpen size={18} />
              <span>Blog</span>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="p-2 rounded-md focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-asphalt dark:text-white" />
              ) : (
                <Menu size={24} className="text-asphalt dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-60 opacity-100 py-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col space-y-4 pb-4">
            <Link 
              to="/calculators" 
              className={`flex items-center space-x-2 p-2 rounded-md ${
                isActive('/calculators') ? 'bg-muted font-medium' : ''
              }`}
            >
              <Calculator size={18} />
              <span>Calculators</span>
            </Link>
            <a 
              href="https://blog.asphaltcalculator.co"
              className="flex items-center space-x-2 p-2 rounded-md"
              onClick={handleBlogClick}
            >
              <BookOpen size={18} />
              <span>Blog</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
