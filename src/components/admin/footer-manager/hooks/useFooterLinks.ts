
import { FooterLinkGroup } from '../../footer-manager/types';
import { useLinkActions } from './useLinkActions';
import { useLinkState } from './useLinkState';

export const useFooterLinks = (
  linkGroups: FooterLinkGroup[], 
  setLinkGroups: React.Dispatch<React.SetStateAction<FooterLinkGroup[]>>,
  activeTab: string
) => {
  const { editingLink, newLinkData, setNewLinkData, setEditingLink } = useLinkState();
  
  const { 
    handleAddLink, 
    handleEditLink, 
    handleUpdateLink, 
    handleDeleteLink, 
    handleCancelEdit,
    handleReorderLinks
  } = useLinkActions(
    linkGroups, 
    setLinkGroups, 
    activeTab, 
    editingLink, 
    newLinkData, 
    setNewLinkData
  );

  // Wrap handleEditLink to also set the editingLink state
  const handleEdit = (link: any) => {
    setEditingLink(link);
    handleEditLink(link);
  };

  // Wrap handleCancelEdit to also clear the editingLink state
  const handleCancel = () => {
    setEditingLink(null);
    handleCancelEdit();
  };

  return {
    editingLink,
    newLinkData,
    setNewLinkData,
    handleAddLink,
    handleEditLink: handleEdit,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit: handleCancel,
    handleReorderLinks
  };
};
