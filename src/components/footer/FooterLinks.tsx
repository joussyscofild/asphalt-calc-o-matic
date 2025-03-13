
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { FooterLinkGroup } from './types';
import FooterLink from './FooterLink';

interface FooterLinksProps {
  linkGroups: FooterLinkGroup[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ linkGroups }) => {
  // Find a specific group by ID, or use a close match
  const findGroup = (targetId: string, fallbackTitle: string) => {
    // Try exact match first
    let group = linkGroups.find(g => g.id === targetId);
    
    // If no exact match, try case-insensitive match
    if (!group) {
      group = linkGroups.find(g => 
        g.id.toLowerCase() === targetId.toLowerCase() || 
        g.title.toLowerCase() === fallbackTitle.toLowerCase()
      );
    }
    
    return group;
  };
  
  // Render a link group if available, otherwise render a placeholder
  const renderLinkGroup = (groupId: string, title: string, fallbackLinks: { label: string, url: string, icon?: React.ReactNode }[]) => {
    const group = findGroup(groupId, title);
    
    if (group && group.links.length > 0) {
      return (
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
          <ul className="space-y-2">
            {group.links.map(link => (
              <li key={link.id}>
                <FooterLink link={link} />
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
    <>
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
    </>
  );
};

export default FooterLinks;
