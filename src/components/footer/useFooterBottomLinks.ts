
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BottomLink } from '@/components/admin/footer-manager/types';

export const useFooterBottomLinks = () => {
  const [bottomLinks, setBottomLinks] = useState<BottomLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBottomLinks = async () => {
      try {
        console.log('Fetching footer bottom links...');
        const { data, error } = await supabase
          .from('footer_links')
          .select('*')
          .eq('group_id', 'bottom-links')
          .order('sort_order');
        
        if (error) {
          console.error('Error fetching footer bottom links:', error);
          setIsLoading(false);
          return;
        }
        
        console.log('Bottom links data from DB:', data);
        
        if (data && data.length > 0) {
          const links = data.map(link => ({
            id: link.id,
            label: link.label,
            url: link.url,
            isExternal: link.is_external || false
          }));
          
          setBottomLinks(links);
        } else {
          console.log('No footer bottom links found in database');
        }
      } catch (error) {
        console.error('Error fetching footer bottom links:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBottomLinks();
  }, []);

  return { bottomLinks, isLoading };
};
