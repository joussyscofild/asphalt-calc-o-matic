
import { Page } from '@/components/admin/pages/types';

export interface PageManagerProps {
  // No props needed yet, but we'll define the interface for future extensibility
}

export interface UsePageManagerReturn {
  pages: Page[];
  isLoading: boolean;
  isEditDialogOpen: boolean;
  currentPage: Page | null;
  pageContent: string;
  handleCreatePage: () => void;
  handleEditPage: (page: Page) => void;
  handleDeletePage: (id: string) => void;
  handleDuplicatePage: (page: Page) => void;
  handleStatusToggle: (id: string) => void;
  handlePreviewPage: (page: Page) => void;
  handleReorderPages: (result: { source: number; destination: number }) => void;
  handleSavePage: () => Promise<void>;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPageContent: (content: string) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
}
