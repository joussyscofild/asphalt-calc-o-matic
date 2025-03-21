
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
        // Production URL must be hardcoded to ensure correct absolute URLs
        const SITE_URL = "https://asphaltcalculator.co";
        const BLOG_URL = "https://blog.asphaltcalculator.co";
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
        
        // Add static pages (note: /blog is removed as it should redirect to the subdomain)
        const staticPages = ['', '/calculators', '/about', '/contact'];
        staticPages.forEach(page => {
          sitemapXml += getSitemapEntry(`${SITE_URL}${page}`, 'weekly', '1.0');
        });
        
        // Add blog homepage as a separate entity
        sitemapXml += getSitemapEntry(BLOG_URL, 'weekly', '0.9');
        
        // Add calculator pages
        calculators.forEach(calculator => {
          sitemapXml += getSitemapEntry(`${SITE_URL}/calculator/${calculator.id}`, 'weekly', '0.8');
        });
        
        // Add blog posts - only add if ID is a valid UUID and use the blog subdomain
        blogPosts.forEach(post => {
          // Validate the post ID is a valid UUID before adding to sitemap
          if (isValidUUID(post.id)) {
            sitemapXml += getSitemapEntry(`${BLOG_URL}/${post.id}`, 'weekly', '0.8');
          } else {
            console.warn(`Skipping blog post with invalid UUID: ${post.id}`);
          }
        });
        
        // Add custom pages
        customPages.forEach(page => {
          sitemapXml += getSitemapEntry(`${SITE_URL}/page/${page.slug}`, 'weekly', '0.7');
        });
        
        // Close XML
        sitemapXml += '</urlset>';
        
        console.log("Sitemap XML generated successfully");
        
        // For client-side rendering, serve as XML file
        if (typeof document !== 'undefined') {
          // Set the content type and write the XML content
          document.open('text/xml');
          document.write(sitemapXml);
          document.close();
        }
        
        hasGeneratedRef.current = true;
      } catch (error) {
        console.error('Critical error generating sitemap:', error);
        
        // Generate a minimal valid XML for fallback
        const basicXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://asphaltcalculator.co</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
        
        // Serve the fallback content
        if (typeof document !== 'undefined') {
          document.open('text/xml');
          document.write(basicXml);
          document.close();
        }
      } finally {
        setIsGenerating(false);
      }
    };
    
    // Execute the sitemap generation
    generateSitemap();
  }, [isGenerating]);
  
  // Helper function to check if a string is a valid UUID
  const isValidUUID = (id: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };
  
  // Helper function to fetch custom pages
  const fetchCustomPages = async (): Promise<any[]> => {
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
  const getSitemapEntry = (url: string, changefreq: string, priority: string): string => {
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  };
  
  // Return null as we're handling the rendering directly
  return null;
};

export default Sitemap;
