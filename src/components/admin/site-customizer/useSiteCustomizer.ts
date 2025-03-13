
import { useState, useEffect } from 'react';
import { SiteSettings, defaultSettings } from './types';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useSiteCustomizer = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [previewLogo, setPreviewLogo] = useState<string>(defaultSettings.siteLogo);
  const [previewFavicon, setPreviewFavicon] = useState<string>(defaultSettings.favicon || '/favicon.ico');
  const [loading, setLoading] = useState(true);
  
  // Fetch settings from the database on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        // Try to load from localStorage first (for backward compatibility)
        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings);
          setPreviewLogo(parsedSettings.siteLogo);
          setPreviewFavicon(parsedSettings.favicon || '/favicon.ico');
        }
        
        // Then try to get settings from the database
        const { data: faviconData, error: faviconError } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'favicon')
          .single();
          
        if (faviconError) {
          console.error('Error fetching favicon:', faviconError);
        } else if (faviconData) {
          setSettings(prev => ({
            ...prev,
            favicon: faviconData.value
          }));
          setPreviewFavicon(faviconData.value);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
        setSettings(prev => ({
          ...prev,
          siteLogo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const faviconUrl = reader.result as string;
        setPreviewFavicon(faviconUrl);
        setSettings(prev => ({
          ...prev,
          favicon: faviconUrl
        }));
        
        // Immediately apply the favicon for preview
        updateDocumentFavicon(faviconUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Save to localStorage for backward compatibility
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      
      // Update favicon in the database
      if (settings.favicon) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            { 
              key: 'favicon', 
              value: settings.favicon,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'key' }
          );
          
        if (error) {
          throw error;
        }
      }
      
      // Update the actual favicon in the document
      updateDocumentFavicon(settings.favicon || '/favicon.ico');
      
      toast({
        title: "Settings saved",
        description: "Your customization settings have been saved.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings.",
        variant: "destructive"
      });
    }
  };
  
  // Helper function to update the actual favicon in the document
  const updateDocumentFavicon = (faviconUrl: string) => {
    console.log("Updating favicon to:", faviconUrl);
    
    // Remove any existing favicon
    const existingLinks = document.querySelectorAll("link[rel*='icon']");
    existingLinks.forEach(link => link.remove());
    
    // Create and append the new favicon link
    const link = document.createElement('link');
    link.id = 'favicon';
    link.rel = 'icon';
    link.href = faviconUrl;
    document.head.appendChild(link);
    
    // Force browser to refresh favicon by setting a random query parameter
    setTimeout(() => {
      const randomParam = `?v=${new Date().getTime()}`;
      link.href = faviconUrl + randomParam;
    }, 100);
  };

  return {
    settings,
    setSettings,
    previewLogo,
    previewFavicon,
    loading,
    handleChange,
    handleLogoChange,
    handleFaviconChange,
    handleSave
  };
};
