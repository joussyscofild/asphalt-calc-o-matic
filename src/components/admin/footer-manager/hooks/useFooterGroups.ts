
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup } from '../types';

export const useFooterGroups = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: React.Dispatch<React.SetStateAction<FooterLinkGroup[]>>,
  activeTab: string,
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
) => {
  const { toast } = useToast();
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  
  const handleAddGroup = async (predefinedId?: string, predefinedTitle?: string) => {
    try {
      // Use either predefined values or from state
      const groupId = predefinedId || uuidv4();
      const title = predefinedTitle || newGroupTitle;
      
      if (!title.trim()) {
        toast({
          title: "Error adding group",
          description: "Group title cannot be empty",
          variant: "destructive"
        });
        return;
      }
      
      // Add the new group to state
      const newGroup = {
        id: groupId,
        title: title,
        links: []
      };
      
      setLinkGroups(prev => [...prev, newGroup]);
      
      // Set active tab to the new group
      setActiveTab(groupId);
      
      // Reset form
      setNewGroupTitle('');
      setIsAddingGroup(false);
      
      toast({
        title: "Group Added",
        description: `"${title}" group has been added`
      });
    } catch (error) {
      console.error('Error adding group:', error);
      toast({
        title: "Error adding group",
        description: "There was a problem adding the group",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteGroup = async (groupId: string) => {
    // Prevent deletion of special groups
    if (groupId === 'bottom-links') {
      toast({
        title: "Cannot Delete",
        description: "Bottom links are required for the footer",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Delete all links in the group from Supabase
      const { error } = await supabase
        .from('footer_links')
        .delete()
        .eq('group_id', groupId);
      
      if (error) throw error;
      
      // Remove the group from state
      setLinkGroups(prev => prev.filter(group => group.id !== groupId));
      
      // Set active tab to the first available group, if any
      setActiveTab(prev => {
        const remainingGroups = linkGroups.filter(group => group.id !== groupId);
        return remainingGroups.length > 0 ? remainingGroups[0].id : '';
      });
      
      toast({
        title: "Group Deleted",
        description: "The group and all its links have been deleted"
      });
    } catch (error) {
      console.error('Error deleting group:', error);
      toast({
        title: "Error deleting group",
        description: "There was a problem deleting the group",
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
