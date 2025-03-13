
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [pageContent, setPageContent] = useState<{
    title: string;
    content: string;
    status: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('custom_pages')
          .select('title, content, status')
          .eq('slug', slug)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setPageContent(data);
        } else {
          // Page not found
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error fetching page:', error);
        navigate('/not-found');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPage();
  }, [slug, navigate]);
  
  // If the page is a draft and we're not in the admin area, redirect to not found
  useEffect(() => {
    if (pageContent && pageContent.status === 'draft' && !window.location.pathname.includes('/admin')) {
      navigate('/not-found');
    }
  }, [pageContent, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container-custom my-24 flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
            <p className="text-muted-foreground">Loading page...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!pageContent) {
    return null; // This will redirect to not-found
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container-custom my-24 flex-grow">
        <article className="prose lg:prose-xl max-w-6xl mx-auto">
          <div 
            className="custom-page-content" 
            dangerouslySetInnerHTML={{ __html: pageContent.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
