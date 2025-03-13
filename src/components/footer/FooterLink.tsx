
import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLink as FooterLinkType } from './types';

interface FooterLinkProps {
  link: FooterLinkType;
}

const FooterLink: React.FC<FooterLinkProps> = ({ link }) => {
  // Process the URL to ensure consistent formatting
  const processUrl = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url; // Keep external URLs as-is
    }
    
    // Ensure page URLs are properly formatted
    if (url.includes('page/') && !url.startsWith('/')) {
      return `/${url}`; // Add leading slash if missing
    }
    
    if (!url.startsWith('/')) {
      return `/${url}`; // Add leading slash to internal URLs if missing
    }
    
    return url;
  };
  
  const processedUrl = processUrl(link.url);
  
  if (link.isExternal) {
    return (
      <a 
        href={processedUrl} 
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
        to={processedUrl}
        className="text-gray-400 hover:text-safety transition-colors"
      >
        {link.label}
      </Link>
    );
  }
};

export default FooterLink;
