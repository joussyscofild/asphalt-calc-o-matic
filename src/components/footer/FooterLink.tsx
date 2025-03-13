
import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLink as FooterLinkType } from './types';

interface FooterLinkProps {
  link: FooterLinkType;
}

const FooterLink: React.FC<FooterLinkProps> = ({ link }) => {
  console.log(`Rendering FooterLink: "${link.label}", URL: "${link.url}", External: ${link.isExternal}`);
  
  if (link.isExternal) {
    // Clean up URL if needed
    let url = link.url;
    if (url.includes('//page/')) {
      url = url.replace('//page/', '/page/');
    }
    
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-safety transition-colors"
      >
        {link.label}
      </a>
    );
  } else {
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

export default FooterLink;
