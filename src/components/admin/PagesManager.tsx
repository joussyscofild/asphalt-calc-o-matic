
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Copy, 
  Eye 
} from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  content: string;
  created: string;
  lastModified: string;
}

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
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Page Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell className="font-medium">
                {page.title}
                <div className="text-sm text-muted-foreground">
                  /{page.slug}
                </div>
              </TableCell>
              <TableCell>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  page.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {page.status === 'published' ? 'Published' : 'Draft'}
                </div>
              </TableCell>
              <TableCell>{page.lastModified}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditPage(page)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicatePage(page)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleStatusToggle(page.id)}
                      className="text-amber-600"
                    >
                      {page.status === 'published' ? 'Set as Draft' : 'Publish'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeletePage(page.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{currentPage?.id ? 'Edit Page' : 'Create New Page'}</DialogTitle>
            <DialogDescription>
              Make changes to your page here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          {currentPage && (
            <>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input 
                    id="title" 
                    value={currentPage.title} 
                    onChange={handleTitleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    value={currentPage.slug} 
                    onChange={handleSlugChange} 
                  />
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex-1 overflow-auto">
                <Label htmlFor="content" className="mb-2 block">Content</Label>
                <div className="border rounded-md h-full">
                  <RichTextEditor 
                    initialValue={currentPage.content}
                    onChange={setPageContent}
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSavePage}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PagesManager;
