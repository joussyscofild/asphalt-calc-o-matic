
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { FooterLinkGroup } from './types';
import FooterLink from './FooterLink';

interface FooterLinksProps {
  linkGroups: FooterLinkGroup[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ linkGroups }) => {
  console.log('FooterLinks received groups:', linkGroups);
  
  // Find a specific group by ID, title, or close match
  const findGroup = (targetIds: string[], fallbackTitle: string) => {
    // Log what we're looking for
    console.log(`Looking for group with IDs ${targetIds.join(' or ')} or title "${fallbackTitle}"`);
    
    // Try exact ID match first
    for (const targetId of targetIds) {
      const exactMatch = linkGroups.find(g => g.id === targetId);
      if (exactMatch) {
        console.log(`Found exact match for group ID "${targetId}":`, exactMatch);
        return exactMatch;
      }
    }
    
    // Try case-insensitive ID match
    for (const targetId of targetIds) {
      const idMatch = linkGroups.find(g => 
        g.id.toLowerCase() === targetId.toLowerCase()
      );
      if (idMatch) {
        console.log(`Found case-insensitive ID match for "${targetId}":`, idMatch);
        return idMatch;
      }
    }
    
    // Try title match
    const titleMatch = linkGroups.find(g => 
      g.title.toLowerCase() === fallbackTitle.toLowerCase()
    );
    
    if (titleMatch) {
      console.log(`Found title match for "${fallbackTitle}":`, titleMatch);
      return titleMatch;
    }
    
    console.log(`No match found for "${fallbackTitle}" with IDs ${targetIds.join(', ')}`);
    return null;
  };
  
  // Render a link group if available, otherwise render a placeholder
  const renderLinkGroup = (targetIds: string[], title: string, fallbackLinks: { label: string, url: string, icon?: React.ReactNode }[]) => {
    const group = findGroup(targetIds, title);
    
    if (group && group.links.length > 0) {
      console.log(`Rendering group "${title}" with ${group.links.length} links from database`);
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
    console.log(`Using fallback for "${title}" - no matching group found in database`);
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
      {renderLinkGroup(
        ['quick-links', 'quicklinks', 'quick'], 
        'Quick Links', 
        [
          { label: 'Calculators', url: '/calculators', icon: <Calculator size={16} className="mr-2" /> },
          { label: 'Blog', url: '/blog' },
          { label: 'About Us', url: '/about' },
          { label: 'Contact', url: '/contact' }
        ]
      )}
      
      {/* Calculator Categories - Either from database or fallback */}
      {renderLinkGroup(
        ['calc-categories', 'calccategories', 'calculator-categories', 'calculatorcategories'], 
        'Calculator Categories', 
        [
          { label: 'Asphalt Calculators', url: '/calculators/asphalt' },
          { label: 'Concrete Calculators', url: '/calculators/concrete' },
          { label: 'Cost Estimators', url: '/calculators/cost' },
          { label: 'Measurement Tools', url: '/calculators/measurement' }
        ]
      )}
    </>
  );
};

export default FooterLinks;
