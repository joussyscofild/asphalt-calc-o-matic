
import { FooterLinkGroup, FooterLink, NewLinkData } from '../types';
import { Dispatch, SetStateAction } from 'react';
import { useAddLink } from './useAddLink';
import { useUpdateLink } from './useUpdateLink';
import { useDeleteLink } from './useDeleteLink';
import { useReorderLinks } from './useReorderLinks';
import { useEditLink } from './useEditLink';

export const useLinkActions = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: Dispatch<SetStateAction<FooterLinkGroup[]>>,
  activeTab: string,
  editingLink: FooterLink | null,
  newLinkData: NewLinkData,
  setNewLinkData: Dispatch<SetStateAction<NewLinkData>>
) => {
  // Import the individual action hooks
  const { handleAddLink } = useAddLink(linkGroups, setLinkGroups, activeTab, newLinkData, setNewLinkData);
  const { handleUpdateLink } = useUpdateLink(linkGroups, setLinkGroups, activeTab, editingLink, newLinkData, setNewLinkData);
  const { handleDeleteLink } = useDeleteLink(linkGroups, setLinkGroups, activeTab);
  const { handleReorderLinks } = useReorderLinks(linkGroups, setLinkGroups, activeTab);
  const { handleEditLink, handleCancelEdit } = useEditLink(setNewLinkData);

  return {
    handleAddLink,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit,
    handleReorderLinks
  };
};
