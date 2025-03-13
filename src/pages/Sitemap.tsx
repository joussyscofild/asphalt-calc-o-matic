
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
        document.querySelector('html')?.setAttribute('content-type', 'application/xml');
        // Create a style to hide other page elements
        const style = document.createElement('style');
        style.textContent = 'body > *:not(pre) { display: none !important; }';
        document.head.appendChild(style);
      } catch (error) {
        console.error('Error generating sitemap:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    generateSitemap();
    
    // Cleanup function to remove style when component unmounts
    return () => {
      const style = document.querySelector('style');
      if (style) style.remove();
    };
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
  
  // Use useEffect to set the document content type
  useEffect(() => {
    if (!isLoading) {
      // Set response headers for XML
      const contentTypeMetaTag = document.createElement('meta');
      contentTypeMetaTag.httpEquiv = 'Content-Type';
      contentTypeMetaTag.content = 'application/xml; charset=UTF-8';
      document.head.appendChild(contentTypeMetaTag);
    }
  }, [isLoading]);
  
  // Return XML content as plain text
  return (
    <pre style={{ display: 'block', whiteSpace: 'pre', margin: 0, padding: 0 }}>
      {isLoading ? '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>Generating sitemap...</loc>\n  </url>\n</urlset>' : xml}
    </pre>
  );
};

export default Sitemap;
