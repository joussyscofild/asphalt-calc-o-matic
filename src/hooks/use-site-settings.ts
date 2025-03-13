
import { useState, useEffect } from 'react';
import { SiteSettings, defaultSettings } from '@/components/admin/site-customizer/types';
import { supabase } from "@/integrations/supabase/client";

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
          setSettings(prev => ({
            ...prev,
            favicon: faviconData.value
          }));
          
          // Update favicon in the document
          updateDocumentFavicon(faviconData.value);
        }
      } catch (error) {
        console.error('Error loading site settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  // Helper function to update the favicon in the document
  const updateDocumentFavicon = (faviconUrl: string) => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  };

  return { settings, loading };
};
