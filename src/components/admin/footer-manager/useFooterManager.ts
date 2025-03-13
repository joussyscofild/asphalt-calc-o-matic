
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FooterLinkGroup, FooterLink, NewLinkData } from './types';

export const useFooterManager = () => {
  const { toast } = useToast();
  const [linkGroups, setLinkGroups] = useState<FooterLinkGroup[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [newLinkData, setNewLinkData] = useState<NewLinkData>({
    label: '',
    url: '',
    isExternal: false
  });
  
  // For adding new group
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [isAddingGroup, setIsAddingGroup] = useState(false);
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
      
      // Refresh to get proper IDs
      setTimeout(() => fetchFooterLinks(), 500);
      
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
      // Determine next sort order
      const nextSortOrder = currentGroup.links.length;
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('footer_links')
        .insert({
          group_id: activeTab,
          group_title: currentGroup.title,
          label: newLinkData.label,
          url: newLinkData.url,
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
      
      // Update in Supabase
      const { error } = await supabase
        .from('footer_links')
        .update({
          label: newLinkData.label,
          url: newLinkData.url,
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
                  url: newLinkData.url,
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

  const handleSaveAllChanges = () => {
    toast({
      title: "Changes Saved",
      description: "All footer link changes have been saved to the database"
    });
  };

  return {
    linkGroups,
    activeTab,
    setActiveTab,
    editingLink,
    newLinkData,
    setNewLinkData,
    newGroupTitle,
    setNewGroupTitle,
    isAddingGroup,
    setIsAddingGroup,
    isLoading,
    handleAddGroup,
    handleDeleteGroup,
    handleAddLink,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit,
    handleSaveAllChanges
  };
};
