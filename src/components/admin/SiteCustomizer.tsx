
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImagePlus, Palette, Type, Layout, Save } from 'lucide-react';
import { useSiteCustomizer } from './site-customizer/useSiteCustomizer';
import BrandingTab from './site-customizer/BrandingTab';
import ColorsTab from './site-customizer/ColorsTab';
import TypographyTab from './site-customizer/TypographyTab';
import LayoutTab from './site-customizer/LayoutTab';

const SiteCustomizer: React.FC = () => {
  const {
    settings,
    setSettings,
    previewLogo,
    handleChange,
    handleLogoChange,
    handleSave
  } = useSiteCustomizer();
  
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
            handleChange={handleChange}
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
