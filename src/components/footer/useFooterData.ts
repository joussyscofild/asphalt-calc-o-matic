
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { FooterLinkGroup } from './types';
import { formatUrl } from '../admin/footer-manager/utils/urlFormatter';

export const useFooterData = () => {
  const [linkGroups, setLinkGroups] = useState<FooterLinkGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        console.log('Fetching footer links from database...');
        const { data, error } = await supabase
          .from('footer_links')
          .select('*')
          .order('sort_order');
        
        if (error) {
          console.error('Error fetching footer links:', error);
          return;
        }
        
        console.log('Footer links data from DB:', data);
        
        if (data && data.length > 0) {
          // Group links by group_id
          const groups: Record<string, FooterLinkGroup> = {};
          
          data.forEach(link => {
            const groupId = link.group_id;
            
            if (!groups[groupId]) {
              groups[groupId] = {
                id: groupId,
                title: link.group_title,
                links: []
              };
            }
            
            // Format the URL properly
            const formattedUrl = formatUrl(link.url, link.is_external);
            
            // Log each link for debugging
            console.log(`Processing footer link: ${link.label}, URL: ${formattedUrl}, External: ${link.is_external}, Group: ${groupId}`);
            
            groups[groupId].links.push({
              id: link.id,
              label: link.label,
              url: formattedUrl,
              isExternal: link.is_external || false
            });
          });
          
          const groupsArray = Object.values(groups);
          console.log('Processed footer link groups:', groupsArray);
          setLinkGroups(groupsArray);
        } else {
          console.log('No footer links found in database');
        }
      } catch (error) {
        console.error('Error fetching footer links:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFooterLinks();
  }, []);

  return { linkGroups, isLoading };
};
