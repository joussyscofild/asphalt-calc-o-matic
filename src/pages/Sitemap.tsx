
import { useEffect, useState } from 'react';
import { fetchCalculators } from '@/utils/calculatorService';
import { getAllPublishedPosts } from '@/utils/blogPosts';
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  
  useEffect(() => {
    // Generate sitemap only once
    if (xmlContent) return;
    
    const generateSitemap = async () => {
      try {
        // Base URL for the site
        const SITE_URL = window.location.origin;
        
        // Fetch all content that should be in the sitemap
        const [calculators, blogPosts, customPages] = await Promise.all([
          fetchCalculators(),
          getAllPublishedPosts(),
          fetchCustomPages(),
        ]);
        
        // Start XML sitemap
        let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
        
        // Add static pages
        const staticPages = ['', '/calculators', '/blog', '/about', '/contact'];
        staticPages.forEach(page => {
          sitemapXml += getSitemapEntry(`${SITE_URL}${page}`, 'weekly', '1.0');
        });
        
        // Add calculator pages
        calculators.forEach(calculator => {
          sitemapXml += getSitemapEntry(`${SITE_URL}/calculator/${calculator.id}`, 'weekly', '0.8');
        });
        
        // Add blog posts
        blogPosts.forEach(post => {
          sitemapXml += getSitemapEntry(`${SITE_URL}/blog/${post.id}`, 'weekly', '0.8');
        });
        
        // Add custom pages
        customPages.forEach(page => {
          sitemapXml += getSitemapEntry(`${SITE_URL}/page/${page.slug}`, 'weekly', '0.7');
        });
        
        // Close XML
        sitemapXml += '</urlset>';
        
        setXmlContent(sitemapXml);
        
        // Clear the entire document and set new content
        document.open('text/xml');
        document.write(sitemapXml);
        document.close();
        
        // Set the content type header with a meta tag
        const head = document.head || document.getElementsByTagName('head')[0];
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Type';
        meta.content = 'text/xml; charset=utf-8';
        head.appendChild(meta);
        
        // Hide React's root element to prevent interference
        const rootElement = document.getElementById('root');
        if (rootElement) {
          rootElement.style.display = 'none';
        }
      } catch (error) {
        console.error('Error generating sitemap:', error);
        
        // Generate a basic valid XML in case of error
        const basicXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${window.location.origin}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
        
        setXmlContent(basicXml);
        
        // Set basic XML when error occurs
        document.open('text/xml');
        document.write(basicXml);
        document.close();
        
        // Set the content type header
        const head = document.head || document.getElementsByTagName('head')[0];
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Type';
        meta.content = 'text/xml; charset=utf-8';
        head.appendChild(meta);
      }
    };

    // Execute the sitemap generation immediately
    generateSitemap();
  }, [xmlContent]);

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
  
  // Helper function to create sitemap entries with improved SEO formatting
  const getSitemapEntry = (url: string, changefreq: string, priority: string) => {
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  };
  
  // Return null as we're handling the rendering via document API
  return null;
};

export default Sitemap;
