
import { UsePageManagerReturn } from './types';
import { usePageFetching } from './hooks/usePageFetching';
import { usePageEditing } from './hooks/usePageEditing';
import { usePageActions } from './hooks/usePageActions';

export const usePageManager = (): UsePageManagerReturn => {
  const { pages, isLoading, setPages, fetchPages } = usePageFetching();
  
  const {
    isEditDialogOpen,
    currentPage,
    pageContent,
    handleCreatePage,
    handleEditPage,
    handleSavePage,
    handleTitleChange,
    handleSlugChange,
    setPageContent,
    setIsEditDialogOpen
  } = usePageEditing({ pages, setPages });
  
  const {
    handleDeletePage,
    handleDuplicatePage,
    handleStatusToggle,
    handlePreviewPage,
    handleReorderPages,
  } = usePageActions({ pages, setPages, fetchPages });

  return {
    pages,
    isLoading,
    isEditDialogOpen,
    currentPage,
    pageContent,
    handleCreatePage,
    handleEditPage,
    handleDeletePage,
    handleDuplicatePage,
    handleStatusToggle,
    handlePreviewPage,
    handleReorderPages,
    handleSavePage,
    handleTitleChange,
    handleSlugChange,
    setPageContent,
    setIsEditDialogOpen
  };
};
