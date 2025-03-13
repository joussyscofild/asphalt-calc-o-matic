
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup, FooterLink, NewLinkData } from '../types';
import { formatUrl } from '../utils/urlFormatter';
import { Dispatch, SetStateAction } from 'react';
import { updateLinkGroups } from '../utils/linkGroupUtils';

export const useAddLink = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: Dispatch<SetStateAction<FooterLinkGroup[]>>,
  activeTab: string,
  newLinkData: NewLinkData,
  setNewLinkData: Dispatch<SetStateAction<NewLinkData>>
) => {
  const { toast } = useToast();
  
  const handleAddLink = async () => {
    if (!newLinkData.label.trim() || !newLinkData.url.trim()) {
      toast({
        title: "Validation Error",
        description: "Link label and URL cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const currentGroup = linkGroups.find(group => group.id === activeTab);
    if (!currentGroup) return;
    
    try {
      const formattedUrl = formatUrl(newLinkData.url, newLinkData.isExternal);
      
      const nextSortOrder = currentGroup.links.length;
      
      const { data, error } = await supabase
        .from('footer_links')
        .insert({
          group_id: activeTab,
          group_title: currentGroup.title,
          label: newLinkData.label,
          url: formattedUrl,
          is_external: newLinkData.isExternal,
          sort_order: nextSortOrder
        })
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        const newLink: FooterLink = {
          id: data[0].id,
          label: data[0].label,
          url: data[0].url,
          isExternal: data[0].is_external
        };

        updateLinkGroups(
          linkGroups,
          setLinkGroups,
          activeTab,
          (group) => ({
            ...group,
            links: [...group.links, newLink]
          })
        );

        setNewLinkData({
          label: '',
          url: '',
          isExternal: false
        });
        
        toast({
          title: "Link Added",
          description: `"${newLink.label}" has been added to ${currentGroup.title}`
        });
      }
    } catch (error) {
      console.error('Error adding link:', error);
      toast({
        title: "Error adding link",
        description: "There was a problem adding the link. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { handleAddLink };
};
