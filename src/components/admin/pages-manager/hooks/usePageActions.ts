
import { Page } from '@/components/admin/pages/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface UsePageActionsProps {
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  fetchPages: () => Promise<void>;
}

export const usePageActions = ({ pages, setPages, fetchPages }: UsePageActionsProps) => {
  const handleDeletePage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('custom_pages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setPages(pages.filter(p => p.id !== id));
      
      toast({
        title: "Page deleted",
        description: "The page has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: "Error deleting page",
        description: "There was a problem deleting the page. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDuplicatePage = async (page: Page) => {
    try {
      const duplicateTitle = `${page.title} (Copy)`;
      const duplicateSlug = `${page.slug}-copy-${Date.now().toString().slice(-4)}`;
      
      const { data, error } = await supabase
        .from('custom_pages')
        .insert({
          title: duplicateTitle,
          slug: duplicateSlug,
          content: page.content,
          status: 'draft',
        })
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        const newPage: Page = {
          id: data[0].id,
          title: data[0].title,
          slug: data[0].slug,
          status: data[0].status as 'published' | 'draft',
          content: data[0].content,
          created: new Date(data[0].created_at).toISOString().split('T')[0],
          lastModified: new Date(data[0].last_modified).toISOString().split('T')[0],
        };
        
        setPages([newPage, ...pages]);
        
        toast({
          title: "Page duplicated",
          description: `"${duplicateTitle}" has been created.`,
        });
      }
    } catch (error) {
      console.error('Error duplicating page:', error);
      toast({
        title: "Error duplicating page",
        description: "There was a problem duplicating the page. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleStatusToggle = async (id: string) => {
    try {
      const page = pages.find(p => p.id === id);
      if (!page) return;
      
      const newStatus = page.status === 'published' ? 'draft' : 'published';
      
      const { error } = await supabase
        .from('custom_pages')
        .update({
          status: newStatus,
          last_modified: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      setPages(pages.map(page => {
        if (page.id === id) {
          return {
            ...page,
            status: newStatus,
            lastModified: new Date().toISOString().split('T')[0]
          };
        }
        return page;
      }));
      
      toast({
        title: `Page ${newStatus === 'published' ? 'published' : 'unpublished'}`,
        description: `The page has been ${newStatus === 'published' ? 'published' : 'set to draft'}.`
      });
    } catch (error) {
      console.error('Error toggling page status:', error);
      toast({
        title: "Error updating page status",
        description: "There was a problem updating the page status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreviewPage = (page: Page) => {
    window.open(`/page/${page.slug}`, '_blank');
  };

  const handleReorderPages = async (result: { source: number; destination: number }) => {
    try {
      const reorderedPages = [...pages];
      const [movedPage] = reorderedPages.splice(result.source, 1);
      reorderedPages.splice(result.destination, 0, movedPage);
      
      setPages(reorderedPages);
      
      const pageIds = reorderedPages.map(page => page.id);
      
      for (let i = 0; i < pageIds.length; i++) {
        const { error } = await supabase
          .from('custom_pages')
          .update({ 
            last_modified: new Date().toISOString(),
            sort_order: i 
          })
          .eq('id', pageIds[i]);
        
        if (error) throw error;
      }
      
      toast({
        title: "Pages reordered",
        description: "The page order has been updated successfully."
      });
    } catch (error) {
      console.error('Error reordering pages:', error);
      await fetchPages();
      
      toast({
        title: "Error reordering pages",
        description: "There was a problem updating the page order. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return {
    handleDeletePage,
    handleDuplicatePage,
    handleStatusToggle,
    handlePreviewPage,
    handleReorderPages,
  };
};
