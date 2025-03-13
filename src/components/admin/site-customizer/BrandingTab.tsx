
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SiteSettings } from './types';

interface BrandingTabProps {
  settings: SiteSettings;
  previewLogo: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BrandingTab: React.FC<BrandingTabProps> = ({ 
  settings, 
  previewLogo, 
  handleChange, 
  handleLogoChange 
}) => {
  return (
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
  );
};

export default BrandingTab;
