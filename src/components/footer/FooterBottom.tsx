
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe, Loader2 } from 'lucide-react';
import { useFooterBottomLinks } from './useFooterBottomLinks';
import FooterLink from './FooterLink';

interface FooterBottomProps {
  currentYear: number;
}

const FooterBottom: React.FC<FooterBottomProps> = ({ currentYear }) => {
  const { bottomLinks, isLoading } = useFooterBottomLinks();
  
  return (
    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm">
        © {currentYear} asphaltcalculator.co. All rights reserved.
      </p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
        ) : bottomLinks.length > 0 ? (
          bottomLinks.map(link => (
            <span key={link.id} className="text-gray-500 text-sm">
              <FooterLink link={link} />
            </span>
          ))
        ) : (
          <>
            <Link to="/page/privacy" className="text-gray-500 text-sm hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="/page/terms" className="text-gray-500 text-sm hover:text-gray-400">
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
          </>
        )}
      </div>
    </div>
  );
};

export default FooterBottom;
