
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImagePlus, Palette, Type, Layout, Save, Image } from 'lucide-react';
import { useSiteCustomizer } from './site-customizer/useSiteCustomizer';
import BrandingTab from './site-customizer/BrandingTab';
import ColorsTab from './site-customizer/ColorsTab';
import TypographyTab from './site-customizer/TypographyTab';
import LayoutTab from './site-customizer/LayoutTab';
import FaviconTab from './site-customizer/FaviconTab';
import { Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const SiteCustomizer: React.FC = () => {
  const {
    settings,
    setSettings,
    previewLogo,
    previewFavicon,
    loading,
    handleChange,
    handleLogoChange,
    handleFaviconChange,
    handleSave
  } = useSiteCustomizer();

  // Update favicon when component mounts
  useEffect(() => {
    if (settings.favicon) {
      console.log("SiteCustomizer: Initial favicon update with:", settings.favicon.substring(0, 50) + "...");
      
      // Force refresh favicon
      const timestamp = new Date().getTime();
      const randomStr = Math.random().toString(36).substring(2, 8);
      
      // Remove any existing favicon links
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(link => {
        console.log("Removing existing favicon link:", link.getAttribute('href'));
        link.parentNode?.removeChild(link);
      });
      
      // Create and add new favicon link
      const link = document.createElement('link');
      link.rel = 'icon';
      link.id = 'favicon';
      link.href = `${settings.favicon}?v=${timestamp}-${randomStr}`;
      document.head.appendChild(link);
      
      console.log("Created new favicon link:", link.href);
    }
  }, [settings.favicon]);
  
  // Handle color change with preview notification
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    
    // Only show toast for color changes
    if (e.target.name.includes('Color')) {
      toast({
        title: "Color Preview Updated",
        description: "Save your changes to apply these colors site-wide.",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <div>Loading site settings...</div>
      </div>
    );
  }
  
  return (
    <div>
      <Tabs defaultValue="branding">
        <TabsList className="mb-6">
          <TabsTrigger value="branding">
            <ImagePlus className="mr-2 h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="colors">
            <Palette className="mr-2 h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography">
            <Type className="mr-2 h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="layout">
            <Layout className="mr-2 h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="favicon">
            <Image className="mr-2 h-4 w-4" />
            Favicon
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="branding">
          <BrandingTab 
            settings={settings}
            previewLogo={previewLogo}
            handleChange={handleChange}
            handleLogoChange={handleLogoChange}
          />
        </TabsContent>
        
        <TabsContent value="colors">
          <ColorsTab 
            settings={settings}
            handleChange={handleColorChange}
          />
        </TabsContent>
        
        <TabsContent value="typography">
          <TypographyTab />
        </TabsContent>
        
        <TabsContent value="layout">
          <LayoutTab 
            settings={settings}
            setSettings={setSettings}
          />
        </TabsContent>
        
        <TabsContent value="favicon">
          <FaviconTab 
            settings={settings}
            previewFavicon={previewFavicon}
            handleFaviconChange={handleFaviconChange}
          />
        </TabsContent>
      </Tabs>
      
      <Separator className="my-8" />
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SiteCustomizer;
