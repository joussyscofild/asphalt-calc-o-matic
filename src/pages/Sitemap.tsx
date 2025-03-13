
import { useEffect, useState } from 'react';
import { fetchCalculators } from '@/utils/calculatorService';
import { getAllPublishedPosts } from '@/utils/blogPosts';
import { supabase } from "@/integrations/supabase/client";

// Base URL for the site - replace with actual domain in production
const SITE_URL = window.location.origin;

const Sitemap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [xml, setXml] = useState('');
  
  useEffect(() => {
    const generateSitemap = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all content that should be in the sitemap
        const [calculators, blogPosts, customPages] = await Promise.all([
          fetchCalculators(),
          getAllPublishedPosts(),
          fetchCustomPages(),
        ]);
        
        // Start XML sitemap
        let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        // Add static pages
        const staticPages = ['', '/calculators', '/blog'];
        staticPages.forEach(page => {
          sitemapXml += getSitemapEntry(`${SITE_URL}${page}`);
        });
        
        // Add calculator pages
        calculators.forEach(calculator => {
          sitemapXml += getSitemapEntry(`${SITE_URL}/calculator/${calculator.id}`);
        });
        
        // Add blog posts
        blogPosts.forEach(post => {
          sitemapXml += getSitemapEntry(`${SITE_URL}/blog/${post.id}`);
        });
        
        // Add custom pages
        customPages.forEach(page => {
          sitemapXml += getSitemapEntry(`${SITE_URL}/page/${page.slug}`);
        });
        
        // Close XML
        sitemapXml += '</urlset>';
        
        setXml(sitemapXml);
        
        // Set content type to XML
        document.querySelector('html')?.setAttribute('content-type', 'text/xml');
      } catch (error) {
        console.error('Error generating sitemap:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    generateSitemap();
  }, []);
  
  // Helper function to fetch custom pages
  const fetchCustomPages = async () => {
    const { data, error } = await supabase
      .from('custom_pages')
      .select('slug')
      .eq('status', 'published');
      
    if (error) {
      console.error('Error fetching custom pages:', error);
      return [];
    }
    
    return data || [];
  };
  
  // Helper function to create sitemap entries
  const getSitemapEntry = (url: string) => {
    return `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n  </url>\n`;
  };
  
  // Return XML content
  return (
    <pre style={{ display: 'none' }}>
      {isLoading ? 'Generating sitemap...' : xml}
    </pre>
  );
};

export default Sitemap;
