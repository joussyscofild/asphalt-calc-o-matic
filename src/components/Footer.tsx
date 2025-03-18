
import React from 'react';
import FooterBrand from './footer/FooterBrand';
import FooterLinks from './footer/FooterLinks';
import FooterNewsletter from './footer/FooterNewsletter';
import { useFooterData } from './footer/useFooterData';
import { Loader2 } from 'lucide-react';

const Footer = () => {
  const { linkGroups, isLoading } = useFooterData();
  
  console.log('Footer rendering with link groups:', linkGroups);
  
  return (
    <footer className="bg-asphalt text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Brand Column */}
          <FooterBrand />
          
          {/* Link Groups */}
          {isLoading ? (
            <div className="col-span-2 flex items-center text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading footer links...
            </div>
          ) : linkGroups.length > 0 ? (
            <FooterLinks linkGroups={linkGroups} />
          ) : (
            <div className="col-span-2 text-gray-400">
              No footer links configured. Add links in the admin dashboard.
            </div>
          )}
          
          {/* Newsletter */}
          <FooterNewsletter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
