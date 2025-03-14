
import { useEffect, useState, useRef } from 'react';
import { fetchCalculators } from '@/utils/calculatorService';
import { getAllPublishedPosts } from '@/utils/blogPosts';
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const hasGeneratedRef = useRef(false);
  
  useEffect(() => {
    // Prevent multiple executions
    if (hasGeneratedRef.current || isGenerating) return;
    
    const generateSitemap = async () => {
      setIsGenerating(true);
      
      try {
        console.log("Starting sitemap generation");
        // Base URL - use window.location.origin or fallback to a hardcoded URL
        const SITE_URL = window.location.origin;
        console.log("Using site URL:", SITE_URL);
        
        let calculators = [];
        let blogPosts = [];
        let customPages = [];
        
        try {
          // Fetch calculators with error handling
          calculators = await fetchCalculators();
          console.log(`Retrieved ${calculators.length} calculators for sitemap`);
        } catch (error) {
          console.error("Error fetching calculators for sitemap:", error);
        }
        
        try {
          // Fetch blog posts with error handling
          blogPosts = await getAllPublishedPosts();
          console.log(`Retrieved ${blogPosts.length} blog posts for sitemap`);
        } catch (error) {
          console.error("Error fetching blog posts for sitemap:", error);
        }
        
        try {
          // Fetch custom pages with error handling
          customPages = await fetchCustomPages();
          console.log(`Retrieved ${customPages.length} custom pages for sitemap`);
        } catch (error) {
          console.error("Error fetching custom pages for sitemap:", error);
        }
        
        // Start XML sitemap with proper XML declaration and schema references
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
        
        console.log("Sitemap XML generated successfully");
        
        // Clear existing document content completely
        document.open();
        
        // Set content-type meta tag
        document.write('<!DOCTYPE html>');
        document.write('<html>');
        document.write('<head>');
        document.write('<meta http-equiv="Content-Type" content="text/xml; charset=utf-8">');
        document.write('</head>');
        document.write('<body>');
        document.write('<pre>');
        document.write(sitemapXml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        document.write('</pre>');
        document.write('</body>');
        document.write('</html>');
        document.close();
        
        // Hide React's root element to prevent any React rendering
        const rootElement = document.getElementById('root');
        if (rootElement) {
          rootElement.style.display = 'none';
        }
        
        console.log("Sitemap successfully rendered as XML");
        hasGeneratedRef.current = true;
      } catch (error) {
        console.error('Critical error generating sitemap:', error);
        
        // Generate a minimal valid XML for fallback
        const basicXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${window.location.origin}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
        
        // Write fallback sitemap
        document.open();
        document.write('<!DOCTYPE html>');
        document.write('<html>');
        document.write('<head>');
        document.write('<meta http-equiv="Content-Type" content="text/xml; charset=utf-8">');
        document.write('</head>');
        document.write('<body>');
        document.write('<pre>');
        document.write(basicXml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        document.write('</pre>');
        document.write('</body>');
        document.write('</html>');
        document.close();
        
        // Hide React's root element
        const rootElement = document.getElementById('root');
        if (rootElement) {
          rootElement.style.display = 'none';
        }
      } finally {
        setIsGenerating(false);
      }
    };
    
    // Execute the sitemap generation
    generateSitemap();
  }, [isGenerating]);
  
  // Helper function to fetch custom pages
  const fetchCustomPages = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_pages')
        .select('slug')
        .eq('status', 'published');
        
      if (error) {
        console.error('Error fetching custom pages for sitemap:', error);
        return [];
      }
      
      return data || [];
    } catch (e) {
      console.error('Unexpected error when fetching custom pages:', e);
      return [];
    }
  };
  
  // Helper function to create properly formatted sitemap entries
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
