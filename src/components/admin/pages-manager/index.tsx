
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import PagesTable from '../pages/PagesTable';
import PageEditorDialog from '../pages/PageEditorDialog';
import { usePageManager } from './usePageManager';
import LoadingState from './LoadingState';
import { PageManagerProps } from './types';

const PagesManager: React.FC<PageManagerProps> = () => {
  const {
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
  } = usePageManager();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Button onClick={handleCreatePage}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Page
        </Button>
      </div>
      
      {isLoading ? (
        <LoadingState />
      ) : (
        <PagesTable 
          pages={pages}
          onEdit={handleEditPage}
          onDelete={handleDeletePage}
          onDuplicate={handleDuplicatePage}
          onStatusToggle={handleStatusToggle}
          onPreview={handlePreviewPage}
          onReorder={handleReorderPages}
        />
      )}
      
      <PageEditorDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentPage={currentPage}
        pageContent={pageContent}
        setPageContent={setPageContent}
        onSave={handleSavePage}
        onTitleChange={handleTitleChange}
        onSlugChange={handleSlugChange}
      />
    </div>
  );
};

export default PagesManager;
