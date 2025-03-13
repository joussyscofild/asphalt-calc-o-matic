
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, Palette, Type, Layout, Save } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface SiteSettings {
  siteLogo: string;
  siteTitle: string;
  siteTagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headerLayout: string;
  footerLayout: string;
}

const defaultSettings: SiteSettings = {
  siteLogo: '/placeholder.svg',
  siteTitle: 'Construction Calculators',
  siteTagline: 'Calculate with Confidence',
  primaryColor: '#2563eb',
  secondaryColor: '#f97316',
  accentColor: '#10b981',
  headerLayout: 'standard',
  footerLayout: 'standard'
};

const SiteCustomizer: React.FC = () => {
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
          <div className="grid gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Site Logo</h3>
                <div className="mb-6">
                  <Label htmlFor="logo-upload">Upload Logo</Label>
                  <Input 
                    id="logo-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoChange}
                    className="mt-2"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input 
                    id="site-title" 
                    name="siteTitle" 
                    value={settings.siteTitle} 
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="site-tagline">Site Tagline</Label>
                  <Input 
                    id="site-tagline" 
                    name="siteTagline" 
                    value={settings.siteTagline} 
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <Card className="p-6 flex items-center justify-center">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <img 
                        src={previewLogo} 
                        alt="Site Logo" 
                        className="max-h-24 max-w-full" 
                      />
                    </div>
                    <h2 className="text-2xl font-bold">{settings.siteTitle}</h2>
                    <p className="text-gray-500">{settings.siteTagline}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: settings.primaryColor }}
                />
                <Input 
                  id="primary-color" 
                  name="primaryColor" 
                  value={settings.primaryColor} 
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: settings.secondaryColor }}
                />
                <Input 
                  id="secondary-color" 
                  name="secondaryColor" 
                  value={settings.secondaryColor} 
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: settings.accentColor }}
                />
                <Input 
                  id="accent-color" 
                  name="accentColor" 
                  value={settings.accentColor} 
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Color Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="h-24 rounded-md flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Primary Color
              </div>
              <div 
                className="h-24 rounded-md flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: settings.secondaryColor }}
              >
                Secondary Color
              </div>
              <div 
                className="h-24 rounded-md flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: settings.accentColor }}
              >
                Accent Color
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="typography">
          <p className="text-muted-foreground mb-8">
            Typography customization coming soon...
          </p>
        </TabsContent>
        
        <TabsContent value="layout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Header Layout</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`p-4 cursor-pointer transition-all ${settings.headerLayout === 'standard' ? 'ring-2 ring-primary' : 'hover:bg-muted'}`}
                  onClick={() => setSettings(prev => ({ ...prev, headerLayout: 'standard' }))}
                >
                  <CardContent className="p-0">
                    <div className="h-16 bg-muted rounded-md mb-2 flex items-center justify-between px-4">
                      <div className="w-8 h-8 bg-gray-400 rounded"></div>
                      <div className="flex space-x-2">
                        <div className="w-12 h-4 bg-gray-400 rounded"></div>
                        <div className="w-12 h-4 bg-gray-400 rounded"></div>
                        <div className="w-12 h-4 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                    <p className="text-center text-sm">Standard</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`p-4 cursor-pointer transition-all ${settings.headerLayout === 'centered' ? 'ring-2 ring-primary' : 'hover:bg-muted'}`}
                  onClick={() => setSettings(prev => ({ ...prev, headerLayout: 'centered' }))}
                >
                  <CardContent className="p-0">
                    <div className="h-16 bg-muted rounded-md mb-2 flex flex-col items-center justify-center px-4">
                      <div className="w-8 h-8 bg-gray-400 rounded mb-1"></div>
                      <div className="flex space-x-2">
                        <div className="w-12 h-4 bg-gray-400 rounded"></div>
                        <div className="w-12 h-4 bg-gray-400 rounded"></div>
                        <div className="w-12 h-4 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                    <p className="text-center text-sm">Centered</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Footer Layout</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`p-4 cursor-pointer transition-all ${settings.footerLayout === 'standard' ? 'ring-2 ring-primary' : 'hover:bg-muted'}`}
                  onClick={() => setSettings(prev => ({ ...prev, footerLayout: 'standard' }))}
                >
                  <CardContent className="p-0">
                    <div className="h-16 bg-muted rounded-md mb-2 flex items-center justify-between px-4">
                      <div className="w-24 h-4 bg-gray-400 rounded"></div>
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                    <p className="text-center text-sm">Standard</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`p-4 cursor-pointer transition-all ${settings.footerLayout === 'complex' ? 'ring-2 ring-primary' : 'hover:bg-muted'}`}
                  onClick={() => setSettings(prev => ({ ...prev, footerLayout: 'complex' }))}
                >
                  <CardContent className="p-0">
                    <div className="h-16 bg-muted rounded-md mb-2 grid grid-cols-3 gap-2 p-2">
                      <div className="col-span-1">
                        <div className="w-full h-3 bg-gray-400 rounded mb-1"></div>
                        <div className="w-full h-3 bg-gray-400 rounded"></div>
                      </div>
                      <div className="col-span-1">
                        <div className="w-full h-3 bg-gray-400 rounded mb-1"></div>
                        <div className="w-full h-3 bg-gray-400 rounded"></div>
                      </div>
                      <div className="col-span-1">
                        <div className="w-full h-3 bg-gray-400 rounded mb-1"></div>
                        <div className="w-full h-3 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                    <p className="text-center text-sm">Complex</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
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
