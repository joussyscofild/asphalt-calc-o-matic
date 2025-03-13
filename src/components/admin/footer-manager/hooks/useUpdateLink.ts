
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup, FooterLink, NewLinkData } from '../types';
import { formatUrl } from '../utils/urlFormatter';
import { Dispatch, SetStateAction } from 'react';
import { updateLinkGroups } from '../utils/linkGroupUtils';
import { resetEditingState } from './useResetLinkState';

export const useUpdateLink = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: Dispatch<SetStateAction<FooterLinkGroup[]>>,
  activeTab: string,
  editingLink: FooterLink | null,
  newLinkData: NewLinkData,
  setNewLinkData: Dispatch<SetStateAction<NewLinkData>>
) => {
  const { toast } = useToast();
  
  const handleUpdateLink = async () => {
    if (!editingLink) return;
    
    if (!newLinkData.label.trim() || !newLinkData.url.trim()) {
      toast({
        title: "Validation Error",
        description: "Link label and URL cannot be empty",
        variant: "destructive"
      });
      return;
    }

    try {
      const currentGroup = linkGroups.find(group => group.id === activeTab);
      if (!currentGroup) return;
      
      const formattedUrl = formatUrl(newLinkData.url, newLinkData.isExternal);
      
      console.log('Updating link:', editingLink.id);
      console.log('New URL:', formattedUrl);
      console.log('Is External:', newLinkData.isExternal);
      
      const { error } = await supabase
        .from('footer_links')
        .update({
          label: newLinkData.label,
          url: formattedUrl,
          is_external: newLinkData.isExternal,
          last_modified: new Date().toISOString()
        })
        .eq('id', editingLink.id);
      
      if (error) throw error;

      updateLinkGroups(
        linkGroups,
        setLinkGroups, 
        activeTab,
        (group) => ({
          ...group,
          links: group.links.map(link => {
            if (link.id === editingLink.id) {
              return {
                ...link,
                label: newLinkData.label,
                url: formattedUrl,
                isExternal: newLinkData.isExternal
              };
            }
            return link;
          })
        })
      );
      
      resetEditingState(setNewLinkData);
      
      toast({
        title: "Link Updated",
        description: `"${newLinkData.label}" has been updated`
      });
    } catch (error) {
      console.error('Error updating link:', error);
      toast({
        title: "Error updating link",
        description: "There was a problem updating the link. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { handleUpdateLink };
};
