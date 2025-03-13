
import { Dispatch, SetStateAction } from 'react';
import { NewLinkData } from '../types';

/**
 * Resets the link editing state to initial values
 */
export const resetEditingState = (
  setNewLinkData: Dispatch<SetStateAction<NewLinkData>>
) => {
  setNewLinkData({
    label: '',
    url: '',
    isExternal: false
  });
  return null;
};
