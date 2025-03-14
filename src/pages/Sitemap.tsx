
import { useEffect, useState } from 'react';
import { fetchCalculators } from '@/utils/calculatorService';
import { getAllPublishedPosts } from '@/utils/blogPosts';
import { supabase } from "@/integrations/supabase/client";

// Base URL for the site - should be updated for production
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
    return `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n  </url>\n`;
  };
  
  // Set correct content type and formatting for XML
  useEffect(() => {
    if (!isLoading) {
      // Set content-type for XML
      const contentTypeMetaTag = document.createElement('meta');
      contentTypeMetaTag.httpEquiv = 'Content-Type';
      contentTypeMetaTag.content = 'text/xml; charset=UTF-8';
      document.head.appendChild(contentTypeMetaTag);
      
      // Add style to hide page container and properly display XML
      const style = document.createElement('style');
      style.innerHTML = `
        body > div#root { display: none !important; }
        body::before {
          content: '${xml.replace(/'/g, "\\'")}';
          white-space: pre;
          font-family: monospace;
        }
      `;
      document.head.appendChild(style);
      
      // Set the document content type
      document.contentType = 'text/xml';
    }
    
    // Cleanup function
    return () => {
      const metaTag = document.querySelector('meta[http-equiv="Content-Type"]');
      const styleTag = document.querySelector('style');
      if (metaTag) metaTag.remove();
      if (styleTag) styleTag.remove();
    };
  }, [isLoading, xml]);
  
  return null; // The component doesn't need to render anything as we're using document.body::before
};

export default Sitemap;
