
import { useState, useEffect } from 'react';
import { Page } from '@/components/admin/pages/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const usePageFetching = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('custom_pages')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedPages: Page[] = data.map(page => ({
          id: page.id,
          title: page.title,
          slug: page.slug,
          status: page.status as 'published' | 'draft',
          content: page.content,
          created: new Date(page.created_at).toISOString().split('T')[0],
          lastModified: new Date(page.last_modified).toISOString().split('T')[0],
        }));
        
        setPages(formattedPages);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: "Error fetching pages",
        description: "There was a problem loading pages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPages();
  }, []);
  
  return { pages, isLoading, setPages, fetchPages };
};
