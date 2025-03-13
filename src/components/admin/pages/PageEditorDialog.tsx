
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import RichTextEditor from '../RichTextEditor';
import { Page } from './types';

interface PageEditorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentPage: Page | null;
  pageContent: string;
  setPageContent: (content: string) => void;
  onSave: () => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PageEditorDialog: React.FC<PageEditorDialogProps> = ({
  isOpen,
  onOpenChange,
  currentPage,
  pageContent,
  setPageContent,
  onSave,
  onTitleChange,
  onSlugChange
}) => {
  if (!currentPage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{currentPage.id ? 'Edit Page' : 'Create New Page'}</DialogTitle>
          <DialogDescription>
            Make changes to your page here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input 
              id="title" 
              value={currentPage.title} 
              onChange={onTitleChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input 
              id="slug" 
              value={currentPage.slug} 
              onChange={onSlugChange} 
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PageEditorDialog;
