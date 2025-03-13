
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
          if (parsedSettings.favicon) {
            setPreviewFavicon(parsedSettings.favicon);
          }
        }
        
        // Then try to get settings from the database
        const { data: faviconData, error: faviconError } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'favicon')
          .single();
          
        if (faviconError) {
          console.error('Error fetching favicon:', faviconError);
        } else if (faviconData && faviconData.value) {
          setSettings(prev => ({
            ...prev,
            favicon: faviconData.value
          }));
          setPreviewFavicon(faviconData.value);
          
          // Update the favicon immediately when loaded
          updateDocumentFavicon(faviconData.value);
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
        if (!faviconUrl) {
          console.error("Failed to read favicon file");
          toast({
            title: "Error",
            description: "Failed to read favicon file",
            variant: "destructive"
          });
          return;
        }
        
        console.log("Favicon loaded from file:", faviconUrl.substring(0, 50) + "...");
        
        setPreviewFavicon(faviconUrl);
        setSettings(prev => ({
          ...prev,
          favicon: faviconUrl
        }));
        
        // Immediately apply the favicon for preview
        updateDocumentFavicon(faviconUrl);
        
        // Show success toast
        toast({
          title: "Favicon updated",
          description: "Favicon preview updated. Save changes to make it permanent.",
        });
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
        console.log("Saving favicon to database, length:", settings.favicon.length);
        
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
          console.error("Supabase error saving favicon:", error);
          throw error;
        }
        
        // Force update the favicon with cache busting
        updateDocumentFavicon(settings.favicon);
      }
      
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
  
  // Helper function to update the favicon in the document with improved cache busting
  const updateDocumentFavicon = (faviconUrl: string) => {
    console.log("Updating favicon with aggressive cache busting:", faviconUrl.substring(0, 50) + "...");
    
    if (!faviconUrl) {
      console.error("Invalid favicon URL provided");
      return;
    }
    
    try {
      // Remove any existing favicon links
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(link => link.parentNode?.removeChild(link));
      
      // Create and append the new favicon link with improved cache busting
      const timestamp = new Date().getTime();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const link = document.createElement('link');
      link.id = 'favicon';
      link.rel = 'icon';
      link.href = `${faviconUrl}?v=${timestamp}-${randomStr}`;
      document.head.appendChild(link);
      
      // Also update the index.html favicon link for persistence
      const defaultFavicon = document.getElementById('favicon');
      if (defaultFavicon) {
        defaultFavicon.setAttribute('href', faviconUrl);
      }
      
      console.log("Favicon element created with href:", link.href);
    } catch (error) {
      console.error("Error in updateDocumentFavicon:", error);
    }
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
