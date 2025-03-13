
import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLink as FooterLinkType } from './types';

interface FooterLinkProps {
  link: FooterLinkType;
}

const FooterLink: React.FC<FooterLinkProps> = ({ link }) => {
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
