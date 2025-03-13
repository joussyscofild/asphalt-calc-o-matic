
import React, { useState, useEffect } from 'react';
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
import { Loader2 } from 'lucide-react';

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
  const [isSaving, setIsSaving] = useState(false);
  const [localContent, setLocalContent] = useState('');
  
  useEffect(() => {
    if (currentPage?.content) {
      setLocalContent(currentPage.content);
    }
  }, [currentPage]);
  
  if (!currentPage) return null;

  const handleContentChange = (content: string) => {
    setLocalContent(content);
    setPageContent(content);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      // Let the saving indicator show for a moment so user sees feedback
      setTimeout(() => setIsSaving(false), 500);
    } catch (error) {
      console.error('Error saving page:', error);
      setIsSaving(false);
    }
  };

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
              initialValue={localContent}
              onChange={handleContentChange}
            />
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PageEditorDialog;
