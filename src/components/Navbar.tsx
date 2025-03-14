
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-1 text-asphalt dark:text-foreground font-merriweather font-bold text-xl animate-fade-in"
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
            <Link 
              to="/blog" 
              className={`nav-link flex items-center space-x-1 ${isActive('/blog') ? 'text-foreground font-semibold' : ''}`}
            >
              <BookOpen size={18} />
              <span>Blog</span>
            </Link>
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
                <X size={24} className="text-asphalt dark:text-foreground" />
              ) : (
                <Menu size={24} className="text-asphalt dark:text-foreground" />
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
            <Link 
              to="/blog" 
              className={`flex items-center space-x-2 p-2 rounded-md ${
                isActive('/blog') ? 'bg-muted font-medium' : ''
              }`}
            >
              <BookOpen size={18} />
              <span>Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
