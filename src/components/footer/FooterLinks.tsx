
import React from 'react';
import { FooterLinkGroup } from './types';
import FooterLink from './FooterLink';

interface FooterLinksProps {
  linkGroups: FooterLinkGroup[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ linkGroups }) => {
  console.log('FooterLinks received groups:', linkGroups);
  
  // Find a specific group by exact ID match first, then try variations
  const findGroup = (preferredIds: string[]) => {
    console.log(`Looking for groups with IDs: ${preferredIds.join(', ')}`);
    
    if (!linkGroups || linkGroups.length === 0) {
      console.log('No link groups available to search through');
      return null;
    }
    
    // First try exact match
    for (const id of preferredIds) {
      const exactMatch = linkGroups.find(group => group.id === id);
      if (exactMatch) {
        console.log(`Found exact match for ID "${id}":`, exactMatch);
        return exactMatch;
      }
    }
    
    // If no exact match found, log all available group IDs for debugging
    console.log('Available group IDs:', linkGroups.map(g => g.id));
    console.log('No exact match found for any of the preferred IDs');
    return null;
  };
  
  // Get Quick Links group
  const quickLinksGroup = findGroup([
    'quick-links', 
    'quicklinks', 
    'quick'
  ]);
  
  // Get Calculator Categories group
  const calculatorCategoriesGroup = findGroup([
    'calculator-categories',
    'calculatorcategories',
    'calc-categories',
    'calccategories'
  ]);
  
  // Render a link group
  const renderGroup = (group: FooterLinkGroup | null, fallbackTitle: string, fallbackLinks: Array<{label: string, url: string}>) => {
    if (group && group.links && group.links.length > 0) {
      console.log(`Rendering group "${group.title}" with ${group.links.length} database links`);
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
    } else {
      console.log(`Using fallback for "${fallbackTitle}" since no matching group was found in database`);
      return (
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">{fallbackTitle}</h3>
          <ul className="space-y-2">
            {fallbackLinks.map((link, index) => (
              <li key={index}>
                <FooterLink 
                  link={{
                    id: `fallback-${index}`,
                    label: link.label,
                    url: link.url,
                    isExternal: link.url.startsWith('http')
                  }} 
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <>
      {/* Quick Links */}
      {renderGroup(
        quickLinksGroup,
        'Quick Links',
        [
          { label: 'Calculators', url: '/calculators' },
          { label: 'Blog', url: '/blog' },
          { label: 'About Us', url: '/about' },
          { label: 'Contact', url: '/contact' }
        ]
      )}
      
      {/* Calculator Categories */}
      {renderGroup(
        calculatorCategoriesGroup,
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
