
import { useState } from 'react';
import { FooterLink, NewLinkData } from '../types';

export const useLinkState = () => {
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [newLinkData, setNewLinkData] = useState<NewLinkData>({
    label: '',
    url: '',
    isExternal: false
  });

  return {
    editingLink,
    setEditingLink,
    newLinkData,
    setNewLinkData
  };
};
