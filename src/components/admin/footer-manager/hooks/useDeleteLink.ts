
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup } from '../types';
import { Dispatch, SetStateAction } from 'react';
import { updateLinkGroups } from '../utils/linkGroupUtils';

export const useDeleteLink = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: Dispatch<SetStateAction<FooterLinkGroup[]>>,
  activeTab: string
) => {
  const { toast } = useToast();
  
  const handleDeleteLink = async (linkId: string) => {
    try {
      const { error } = await supabase
        .from('footer_links')
        .delete()
        .eq('id', linkId);
      
      if (error) throw error;
      
      updateLinkGroups(
        linkGroups,
        setLinkGroups,
        activeTab,
        (group) => ({
          ...group,
          links: group.links.filter(link => link.id !== linkId)
        })
      );
      
      toast({
        title: "Link Deleted",
        description: "The link has been deleted"
      });
    } catch (error) {
      console.error('Error deleting link:', error);
      toast({
        title: "Error deleting link",
        description: "There was a problem deleting the link. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { handleDeleteLink };
};
