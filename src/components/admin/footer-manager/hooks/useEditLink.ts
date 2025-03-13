
import { Dispatch, SetStateAction } from 'react';
import { FooterLink, NewLinkData } from '../types';

export const useEditLink = (
  setNewLinkData: Dispatch<SetStateAction<NewLinkData>>
) => {
  const handleEditLink = (link: FooterLink) => {
    setNewLinkData({
      label: link.label,
      url: link.url,
      isExternal: link.isExternal
    });
    return link;
  };

  const handleCancelEdit = () => {
    setNewLinkData({
      label: '',
      url: '',
      isExternal: false
    });
    return null;
  };

  return { handleEditLink, handleCancelEdit };
};
