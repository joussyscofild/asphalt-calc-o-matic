
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup } from '../types';
import { Dispatch, SetStateAction } from 'react';
import { updateLinkGroups } from '../utils/linkGroupUtils';

export const useReorderLinks = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: Dispatch<SetStateAction<FooterLinkGroup[]>>,
  activeTab: string
) => {
  const { toast } = useToast();
  
  const handleReorderLinks = async (sourceIndex: number, destinationIndex: number) => {
    try {
      const currentGroup = linkGroups.find(group => group.id === activeTab);
      if (!currentGroup) return;
      
      const newLinks = [...currentGroup.links];
      const [removed] = newLinks.splice(sourceIndex, 1);
      newLinks.splice(destinationIndex, 0, removed);
      
      updateLinkGroups(
        linkGroups,
        setLinkGroups,
        activeTab,
        (group) => ({
          ...group,
          links: newLinks
        })
      );
      
      const updatePromises = newLinks.map(async (link, index) => {
        const { error } = await supabase
          .from('footer_links')
          .update({ sort_order: index })
          .eq('id', link.id);
          
        if (error) throw error;
      });
      
      await Promise.all(updatePromises);
      
      toast({
        title: "Links Reordered",
        description: "The order of links has been updated"
      });
    } catch (error) {
      console.error('Error reordering links:', error);
      toast({
        title: "Error reordering links",
        description: "There was a problem updating the link order",
        variant: "destructive"
      });
    }
  };

  return { handleReorderLinks };
};
