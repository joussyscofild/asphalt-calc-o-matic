
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup, FooterLink, NewLinkData } from '../types';
import { formatUrl } from '../utils/urlFormatter';
import { Dispatch, SetStateAction } from 'react';

export const useLinkActions = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: Dispatch<SetStateAction<FooterLinkGroup[]>>,
  activeTab: string,
  editingLink: FooterLink | null,
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
      // Format URL properly
      const formattedUrl = formatUrl(newLinkData.url, newLinkData.isExternal);
      
      // Determine next sort order
      const nextSortOrder = currentGroup.links.length;
      
      // Insert into Supabase
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

  const handleEditLink = (link: FooterLink) => {
    setNewLinkData({
      label: link.label,
      url: link.url,
      isExternal: link.isExternal
    });
    return link;
  };

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
      
      // Format URL properly
      const formattedUrl = formatUrl(newLinkData.url, newLinkData.isExternal);
      
      // Log the update operation
      console.log('Updating link:', editingLink.id);
      console.log('New URL:', formattedUrl);
      console.log('Is External:', newLinkData.isExternal);
      
      // Update in Supabase
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
      
      // Reset editing state
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

  const handleDeleteLink = async (linkId: string) => {
    try {
      // Delete from Supabase
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

  const handleCancelEdit = () => {
    resetEditingState(setNewLinkData);
  };

  return {
    handleAddLink,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit
  };
};

// Helper functions 
const resetEditingState = (
  setNewLinkData: Dispatch<SetStateAction<NewLinkData>>
) => {
  setNewLinkData({
    label: '',
    url: '',
    isExternal: false
  });
  return null;
};

const updateLinkGroups = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: Dispatch<SetStateAction<FooterLinkGroup[]>>,
  activeTab: string,
  updateFn: (group: FooterLinkGroup) => FooterLinkGroup
) => {
  const updatedGroups = linkGroups.map(group => {
    if (group.id === activeTab) {
      return updateFn(group);
    }
    return group;
  });
  
  setLinkGroups(updatedGroups);
};
