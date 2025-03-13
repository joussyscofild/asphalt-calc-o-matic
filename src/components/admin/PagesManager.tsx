
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import PagesTable from './pages/PagesTable';
import PageEditorDialog from './pages/PageEditorDialog';
import { Page } from './pages/types';

const defaultPages: Page[] = [
  {
    id: '1',
    title: 'Home',
    slug: 'home',
    status: 'published',
    content: '<h1>Welcome to our site</h1><p>This is the home page content.</p>',
    created: '2023-05-15',
    lastModified: '2023-06-20',
  },
  {
    id: '2',
    title: 'About Us',
    slug: 'about',
    status: 'published',
    content: '<h1>About Our Company</h1><p>Learn more about who we are and what we do.</p>',
    created: '2023-05-16',
    lastModified: '2023-06-18',
  },
  {
    id: '3',
    title: 'Services',
    slug: 'services',
    status: 'draft',
    content: '<h1>Our Services</h1><p>Discover the services we offer.</p>',
    created: '2023-05-20',
    lastModified: '2023-06-10',
  },
  {
    id: '4',
    title: 'Contact',
    slug: 'contact',
    status: 'published',
    content: '<h1>Contact Us</h1><p>Get in touch with our team.</p>',
    created: '2023-05-22',
    lastModified: '2023-06-05',
  },
];

const PagesManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [pageContent, setPageContent] = useState('');
  
  const handleCreatePage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'New Page',
      slug: 'new-page-' + Date.now().toString().slice(-4),
      status: 'draft',
      content: '<h1>New Page</h1><p>Add your content here.</p>',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };
    
    setCurrentPage(newPage);
    setPageContent(newPage.content);
    setIsEditDialogOpen(true);
  };
  
  const handleEditPage = (page: Page) => {
    setCurrentPage(page);
    setPageContent(page.content);
    setIsEditDialogOpen(true);
  };
  
  const handleSavePage = () => {
    if (!currentPage) return;
    
    const now = new Date().toISOString().split('T')[0];
    const updatedPage = {
      ...currentPage,
      content: pageContent,
      lastModified: now
    };
    
    if (pages.some(p => p.id === currentPage.id)) {
      // Update existing page
      setPages(pages.map(p => p.id === currentPage.id ? updatedPage : p));
      toast({
        title: "Page updated",
        description: `"${updatedPage.title}" has been updated successfully.`,
      });
    } else {
      // Add new page
      setPages([...pages, updatedPage]);
      toast({
        title: "Page created",
        description: `"${updatedPage.title}" has been created successfully.`,
      });
    }
    
    setIsEditDialogOpen(false);
  };
  
  const handleDeletePage = (id: string) => {
    setPages(pages.filter(p => p.id !== id));
    toast({
      title: "Page deleted",
      description: "The page has been deleted successfully.",
    });
  };
  
  const handleDuplicatePage = (page: Page) => {
    const duplicatePage: Page = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy-${Date.now().toString().slice(-4)}`,
      status: 'draft',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };
    
    setPages([...pages, duplicatePage]);
    toast({
      title: "Page duplicated",
      description: `"${duplicatePage.title}" has been created.`,
    });
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPage) return;
    setCurrentPage({
      ...currentPage,
      title: e.target.value,
      slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    });
  };
  
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPage) return;
    setCurrentPage({
      ...currentPage,
      slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    });
  };
  
  const handleStatusToggle = (id: string) => {
    setPages(pages.map(page => {
      if (page.id === id) {
        const newStatus = page.status === 'published' ? 'draft' : 'published';
        return {
          ...page,
          status: newStatus,
          lastModified: new Date().toISOString().split('T')[0]
        };
      }
      return page;
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Button onClick={handleCreatePage}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Page
        </Button>
      </div>
      
      <PagesTable 
        pages={pages}
        onEdit={handleEditPage}
        onDelete={handleDeletePage}
        onDuplicate={handleDuplicatePage}
        onStatusToggle={handleStatusToggle}
      />
      
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
