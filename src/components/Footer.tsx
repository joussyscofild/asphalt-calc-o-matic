
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Globe, Mail } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { formatUrl } from './admin/footer-manager/utils/urlFormatter';

type FooterLink = {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
};

type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [linkGroups, setLinkGroups] = useState<FooterLinkGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('footer_links')
          .select('*')
          .order('sort_order');
        
        if (error) {
          console.error('Error fetching footer links:', error);
          return;
        }
        
        if (data && data.length > 0) {
          // Group links by group_id
          const groups: Record<string, FooterLinkGroup> = {};
          
          data.forEach(link => {
            const groupId = link.group_id;
            
            if (!groups[groupId]) {
              groups[groupId] = {
                id: groupId,
                title: link.group_title,
                links: []
              };
            }
            
            groups[groupId].links.push({
              id: link.id,
              label: link.label,
              url: link.url, // We'll format this when rendering
              isExternal: link.is_external || false
            });
          });
          
          setLinkGroups(Object.values(groups));
        }
      } catch (error) {
        console.error('Error fetching footer links:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFooterLinks();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscribe logic would go here
    console.log('Subscribing email:', email);
    setEmail('');
    // Show a success message (could use toast)
  };
  
  const currentYear = new Date().getFullYear();
  
  // Render a link based on its type (external or internal)
  const renderLink = (link: FooterLink) => {
    if (link.isExternal) {
      return (
        <a 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-safety transition-colors"
        >
          {link.label}
        </a>
      );
    } else {
      // Use the route as is without additional formatting
      return (
        <Link 
          to={link.url}
          className="text-gray-400 hover:text-safety transition-colors"
        >
          {link.label}
        </Link>
      );
    }
  };
  
  // Render a link group if available, otherwise render a placeholder
  const renderLinkGroup = (groupId: string, title: string, fallbackLinks: { label: string, url: string, icon?: React.ReactNode }[]) => {
    const group = linkGroups.find(g => g.id === groupId);
    
    if (group && group.links.length > 0) {
      return (
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
          <ul className="space-y-2">
            {group.links.map(link => (
              <li key={link.id}>
                {renderLink(link)}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    // Fallback if no links found for this group
    return (
      <div className="col-span-1">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <ul className="space-y-2">
          {fallbackLinks.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.url}
                className="text-gray-400 hover:text-safety transition-colors flex items-center"
              >
                {link.icon && link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <footer className="bg-asphalt text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-1 text-white font-merriweather font-bold text-xl mb-4">
              <span className="text-safety">asphalt</span>
              calculator.co
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              The leading resource for asphalt and construction calculators, trusted by professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-safety transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-safety transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-safety transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links - Either from database or fallback */}
          {renderLinkGroup('quick-links', 'Quick Links', [
            { label: 'Calculators', url: '/calculators', icon: <Calculator size={16} className="mr-2" /> },
            { label: 'Blog', url: '/blog' },
            { label: 'About Us', url: '/about' },
            { label: 'Contact', url: '/contact' }
          ])}
          
          {/* Calculator Categories - Either from database or fallback */}
          {renderLinkGroup('calc-categories', 'Calculator Categories', [
            { label: 'Asphalt Calculators', url: '/calculators/asphalt' },
            { label: 'Concrete Calculators', url: '/calculators/concrete' },
            { label: 'Cost Estimators', url: '/calculators/cost' },
            { label: 'Measurement Tools', url: '/calculators/measurement' }
          ])}
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest updates on new calculators and industry insights.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="input-field text-asphalt flex-grow bg-gray-800 text-white border-0 focus:ring-1 focus:ring-safety-light"
              />
              <button 
                type="submit"
                className="bg-safety text-asphalt px-3 py-2 rounded-r-md ml-0 hover:bg-safety-dark transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} asphaltcalculator.co. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-gray-400">
              Terms of Service
            </Link>
            <a href="mailto:info@asphaltcalculator.co" className="text-gray-500 text-sm hover:text-gray-400 flex items-center">
              <Mail size={14} className="mr-1" />
              Contact
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-400 flex items-center">
              <Globe size={14} className="mr-1" />
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
