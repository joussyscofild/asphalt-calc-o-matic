
import { useState, useEffect } from 'react';
import { SiteSettings, defaultSettings } from '@/components/admin/site-customizer/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        
        // Try local storage first (legacy support)
        const storedSettings = localStorage.getItem('siteSettings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
        
        // Then try to load from database
        const { data: faviconData, error: faviconError } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'favicon')
          .single();
          
        if (!faviconError && faviconData) {
          const faviconUrl = faviconData.value;
          setSettings(prev => ({
            ...prev,
            favicon: faviconUrl
          }));
          
          // Force update the favicon in the document
          if (faviconUrl) {
            updateDocumentFavicon(faviconUrl);
          }
        }
      } catch (error) {
        console.error('Error loading site settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  // Helper function to update the favicon in the document with improved cache-busting
  const updateDocumentFavicon = (faviconUrl: string) => {
    console.log("Updating favicon to:", faviconUrl);
    
    if (!faviconUrl) {
      console.error("Invalid favicon URL:", faviconUrl);
      return;
    }
    
    try {
      // Remove any existing favicon links
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(link => link.parentNode?.removeChild(link));
      
      // Create and append the new favicon link with cache busting
      const timestamp = new Date().getTime();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const link = document.createElement('link');
      link.id = 'favicon';
      link.rel = 'icon';
      link.href = `${faviconUrl}?v=${timestamp}-${randomStr}`;
      document.head.appendChild(link);
      
      // Update the default favicon in index.html
      const defaultFavicon = document.getElementById('favicon');
      if (defaultFavicon) {
        defaultFavicon.setAttribute('href', faviconUrl);
      }
      
      // Store the current favicon URL in localStorage for persistence
      localStorage.setItem('currentFavicon', faviconUrl);
      
      console.log("Favicon updated successfully with URL:", link.href);
    } catch (error) {
      console.error("Error updating favicon:", error);
    }
  };

  return { settings, loading };
};
