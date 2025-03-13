
import { FooterLinkGroup } from '../../footer-manager/types';
import { useLinkActions } from './useLinkActions';
import { useLinkState } from './useLinkState';

export const useFooterLinks = (
  linkGroups: FooterLinkGroup[], 
  setLinkGroups: React.Dispatch<React.SetStateAction<FooterLinkGroup[]>>,
  activeTab: string
) => {
  const { editingLink, newLinkData, setNewLinkData } = useLinkState();
  
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

  return {
    editingLink,
    newLinkData,
    setNewLinkData,
    handleAddLink,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit,
    handleReorderLinks
  };
};
