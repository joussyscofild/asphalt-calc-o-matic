
import { useEffect, useRef, useState } from 'react';
import { fetchCalculators } from '@/utils/calculatorService';
import { getAllPublishedPosts } from '@/utils/blogPosts';
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  const hasGeneratedRef = useRef(false);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    if (hasGeneratedRef.current) return;
    hasGeneratedRef.current = true;

    const generateSitemap = async () => {
      try {
        // Set XML MIME type with a meta tag
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('http-equiv', 'Content-Type');
        metaTag.setAttribute('content', 'text/xml; charset=utf-8');
        document.head.appendChild(metaTag);

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
        
        // Clear the entire document
        document.documentElement.innerHTML = '';
        document.open('text/xml');
        document.write(sitemapXml);
        document.close();
        
        setIsGenerated(true);
      } catch (error) {
        console.error('Error generating sitemap:', error);
        // Generate a basic valid XML in case of error
        document.open('text/xml');
        document.write('<?xml version="1.0" encoding="UTF-8"?>\n');
        document.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');
        document.write(`  <url>\n    <loc>${window.location.origin}</loc>\n  </url>\n`);
        document.write('</urlset>');
        document.close();
        setIsGenerated(true);
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
  
  return null;
};

export default Sitemap;
