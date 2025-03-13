
import React from 'react';
import FooterBrand from './footer/FooterBrand';
import FooterLinks from './footer/FooterLinks';
import FooterNewsletter from './footer/FooterNewsletter';
import FooterBottom from './footer/FooterBottom';
import { useFooterData } from './footer/useFooterData';

const Footer = () => {
  const { linkGroups, isLoading } = useFooterData();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-asphalt text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Brand Column */}
          <FooterBrand />
          
          {/* Link Groups */}
          <FooterLinks linkGroups={linkGroups} />
          
          {/* Newsletter */}
          <FooterNewsletter />
        </div>
        
        <FooterBottom currentYear={currentYear} />
      </div>
    </footer>
  );
};

export default Footer;
