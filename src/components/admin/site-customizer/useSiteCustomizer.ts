
import { useState } from 'react';
import { SiteSettings, defaultSettings } from './types';
import { toast } from "@/hooks/use-toast";

export const useSiteCustomizer = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [previewLogo, setPreviewLogo] = useState<string>(defaultSettings.siteLogo);
  
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

  const handleSave = () => {
    // In a real app, this would save to a database or API
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your customization settings have been saved.",
    });
  };

  return {
    settings,
    setSettings,
    previewLogo,
    handleChange,
    handleLogoChange,
    handleSave
  };
};
