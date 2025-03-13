
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup } from '../types';

export const useFooterGroups = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: React.Dispatch<React.SetStateAction<FooterLinkGroup[]>>,
  activeTab: string,
  setActiveTab: (tab: string) => void
) => {
  const { toast } = useToast();
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [isAddingGroup, setIsAddingGroup] = useState(false);

  const handleAddGroup = async () => {
    if (!newGroupTitle.trim()) {
      toast({
        title: "Validation Error",
        description: "Group title cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newId = newGroupTitle.toLowerCase().replace(/\s+/g, '-');
    
    // Check if ID already exists
    if (linkGroups.some(group => group.id === newId)) {
      toast({
        title: "Validation Error",
        description: "A group with a similar name already exists",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create a placeholder link for this group (needed to establish the group)
      const { error } = await supabase
        .from('footer_links')
        .insert({
          group_id: newId,
          group_title: newGroupTitle,
          label: "Example Link",
          url: "#",
          is_external: false,
          sort_order: 0
        });
      
      if (error) throw error;
      
      const newGroup: FooterLinkGroup = {
        id: newId,
        title: newGroupTitle,
        links: [{
          id: Date.now().toString(), // Temporary ID until we refresh
          label: "Example Link",
          url: "#",
          isExternal: false
        }]
      };

      setLinkGroups([...linkGroups, newGroup]);
      setActiveTab(newId);
      setNewGroupTitle('');
      setIsAddingGroup(false);
      
      toast({
        title: "Group Added",
        description: `"${newGroupTitle}" group has been added`
      });
      
      // Refresh to get proper IDs - this should be replaced with a proper refresh function
      setTimeout(() => window.location.reload(), 500);
      
    } catch (error) {
      console.error('Error adding group:', error);
      toast({
        title: "Error adding group",
        description: "There was a problem adding the group. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      // Delete all links in the group
      const { error } = await supabase
        .from('footer_links')
        .delete()
        .eq('group_id', groupId);
      
      if (error) throw error;
      
      const updatedGroups = linkGroups.filter(group => group.id !== groupId);
      setLinkGroups(updatedGroups);
      
      // Set active tab to first group or empty if no groups
      if (updatedGroups.length > 0) {
        setActiveTab(updatedGroups[0].id);
      } else {
        setActiveTab('');
      }
      
      toast({
        title: "Group Deleted",
        description: "The link group has been deleted"
      });
    } catch (error) {
      console.error('Error deleting group:', error);
      toast({
        title: "Error deleting group",
        description: "There was a problem deleting the group. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    newGroupTitle,
    setNewGroupTitle,
    isAddingGroup,
    setIsAddingGroup,
    handleAddGroup,
    handleDeleteGroup
  };
};
