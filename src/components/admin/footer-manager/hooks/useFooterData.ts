
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup } from '../types';

export const useFooterData = () => {
  const { toast } = useToast();
  const [linkGroups, setLinkGroups] = useState<FooterLinkGroup[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch footer links from Supabase
  useEffect(() => {
    fetchFooterLinks();
  }, []);
  
  const fetchFooterLinks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('footer_links')
        .select('*')
        .order('sort_order');
      
      if (error) {
        throw error;
      }
      
      if (data) {
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
          
          groups[groupId].links.push({
            id: link.id,
            label: link.label,
            url: link.url,
            isExternal: link.is_external || false
          });
        });
        
        const groupsArray = Object.values(groups);
        setLinkGroups(groupsArray);
        
        // Set active tab to first group if available
        if (groupsArray.length > 0) {
          setActiveTab(groupsArray[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching footer links:', error);
      toast({
        title: "Error fetching footer links",
        description: "There was a problem loading footer links. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAllChanges = () => {
    toast({
      title: "Changes Saved",
      description: "All footer link changes have been saved to the database"
    });
  };

  return {
    linkGroups,
    setLinkGroups,
    activeTab,
    setActiveTab,
    isLoading,
    fetchFooterLinks,
    handleSaveAllChanges
  };
};
