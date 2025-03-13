
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup, FooterLink, NewLinkData } from '../types';
import { formatUrl } from '../utils/urlFormatter';

export const useFooterLinks = (
  linkGroups: FooterLinkGroup[], 
  setLinkGroups: React.Dispatch<React.SetStateAction<FooterLinkGroup[]>>,
  activeTab: string
) => {
  const { toast } = useToast();
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [newLinkData, setNewLinkData] = useState<NewLinkData>({
    label: '',
    url: '',
    isExternal: false
  });

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

        const updatedGroups = linkGroups.map(group => {
          if (group.id === activeTab) {
            return {
              ...group,
              links: [...group.links, newLink]
            };
          }
          return group;
        });

        setLinkGroups(updatedGroups);
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
    setEditingLink(link);
    setNewLinkData({
      label: link.label,
      url: link.url,
      isExternal: link.isExternal
    });
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

      const updatedGroups = linkGroups.map(group => {
        if (group.id === activeTab) {
          return {
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
          };
        }
        return group;
      });

      setLinkGroups(updatedGroups);
      setEditingLink(null);
      setNewLinkData({
        label: '',
        url: '',
        isExternal: false
      });
      
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
      
      const updatedGroups = linkGroups.map(group => {
        if (group.id === activeTab) {
          return {
            ...group,
            links: group.links.filter(link => link.id !== linkId)
          };
        }
        return group;
      });

      setLinkGroups(updatedGroups);
      
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
    setEditingLink(null);
    setNewLinkData({
      label: '',
      url: '',
      isExternal: false
    });
  };

  return {
    editingLink,
    newLinkData,
    setNewLinkData,
    handleAddLink,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit
  };
};
