
import React from 'react';
import { FooterLinkGroup } from './types';
import FooterLink from './FooterLink';

interface FooterLinksProps {
  linkGroups: FooterLinkGroup[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ linkGroups }) => {
  console.log('FooterLinks component rendering with groups:', linkGroups);
  
  if (!linkGroups || linkGroups.length === 0) {
    console.log('No link groups available to display');
    return null;
  }

  return (
    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
      {linkGroups.map(group => (
        <div key={group.id} className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
          <ul className="space-y-2">
            {group.links.map(link => (
              <li key={link.id}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
