
import { FooterLinkGroup } from '../types';
import { Dispatch, SetStateAction } from 'react';

/**
 * Updates a specific link group in the linkGroups array
 */
export const updateLinkGroups = (
  linkGroups: FooterLinkGroup[],
  setLinkGroups: Dispatch<SetStateAction<FooterLinkGroup[]>>,
  activeTab: string,
  updateFn: (group: FooterLinkGroup) => FooterLinkGroup
) => {
  const updatedGroups = linkGroups.map(group => {
    if (group.id === activeTab) {
      return updateFn(group);
    }
    return group;
  });
  
  setLinkGroups(updatedGroups);
};
