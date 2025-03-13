
import { useFooterData } from './hooks/useFooterData';
import { useFooterGroups } from './hooks/useFooterGroups';
import { useFooterLinks } from './hooks/useFooterLinks';

export const useFooterManager = () => {
  // Fetch and manage footer data
  const { 
    linkGroups, 
    setLinkGroups, 
    activeTab, 
    setActiveTab, 
    isLoading,
    fetchFooterLinks,
    handleSaveAllChanges
  } = useFooterData();
  
  // Manage footer groups
  const {
    newGroupTitle,
    setNewGroupTitle,
    isAddingGroup,
    setIsAddingGroup,
    handleAddGroup,
    handleDeleteGroup
  } = useFooterGroups(linkGroups, setLinkGroups, activeTab, setActiveTab);
  
  // Manage footer links
  const {
    editingLink,
    newLinkData,
    setNewLinkData,
    handleAddLink,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit,
    handleReorderLinks
  } = useFooterLinks(linkGroups, setLinkGroups, activeTab);

  return {
    // Data state
    linkGroups,
    activeTab,
    setActiveTab,
    isLoading,
    
    // Link state and handlers
    editingLink,
    newLinkData,
    setNewLinkData,
    handleAddLink,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit,
    handleReorderLinks,
    
    // Group state and handlers
    newGroupTitle,
    setNewGroupTitle,
    isAddingGroup,
    setIsAddingGroup,
    handleAddGroup, 
    handleDeleteGroup,
    
    // General handlers
    handleSaveAllChanges
  };
};
