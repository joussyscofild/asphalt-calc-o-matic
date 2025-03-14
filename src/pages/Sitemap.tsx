
import { useEffect } from 'react';
import { fetchCalculators } from '@/utils/calculatorService';
import { getAllPublishedPosts } from '@/utils/blogPosts';
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  // Base URL for the site - should be updated for production
  const SITE_URL = window.location.origin;
  
  useEffect(() => {
    // Set XML content type
    document.title = ""; // Remove any title
    document.documentElement.innerHTML = ""; // Clear entire document
    document.documentElement.setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
    
    // Create and set XML content type meta tag
    const head = document.createElement("head");
    const meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "Content-Type");
    meta.setAttribute("content", "text/xml; charset=utf-8");
    head.appendChild(meta);
    document.documentElement.appendChild(head);
    
    // Create body element
    const body = document.createElement("body");
    document.documentElement.appendChild(body);
    
    // Display initial loading message
    const initialXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>Generating sitemap...</loc>\n  </url>\n</urlset>';
    const pre = document.createElement("pre");
    pre.textContent = initialXml;
    body.appendChild(pre);
    
    // Generate the actual sitemap
    const generateSitemap = async () => {
      try {
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
        
        // Update the pre element with the final sitemap
        pre.textContent = sitemapXml;
        
        // Instead of trying to set document.contentType directly (which is read-only),
        // we'll ensure the meta tag is correctly set
        if (!document.querySelector('meta[http-equiv="Content-Type"]')) {
          const contentTypeMeta = document.createElement('meta');
          contentTypeMeta.setAttribute('http-equiv', 'Content-Type');
          contentTypeMeta.setAttribute('content', 'text/xml; charset=utf-8');
          document.head.appendChild(contentTypeMeta);
        }
      } catch (error) {
        console.error('Error generating sitemap:', error);
        // Set a basic valid XML in case of error
        pre.textContent = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>'+SITE_URL+'</loc>\n  </url>\n</urlset>';
      }
    };
    
    // Start generating the sitemap
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
  
  // This component doesn't render anything
  return null;
};

export default Sitemap;
