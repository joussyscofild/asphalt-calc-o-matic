
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SiteSettings } from './types';
import { Image } from 'lucide-react';

interface FaviconTabProps {
  settings: SiteSettings;
  previewFavicon: string;
  handleFaviconChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FaviconTab: React.FC<FaviconTabProps> = ({ 
  settings,
  previewFavicon,
  handleFaviconChange
}) => {
  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Site Favicon</h3>
          <p className="text-muted-foreground mb-4">
            The favicon is the small icon displayed in browser tabs and bookmarks.
            Recommended size is 32x32 pixels. Supported formats are ICO, PNG, and SVG.
          </p>
          <div className="mb-6">
            <Label htmlFor="favicon-upload">Upload Favicon</Label>
            <Input 
              id="favicon-upload" 
              type="file" 
              accept="image/x-icon,image/png,image/svg+xml"
              onChange={handleFaviconChange}
              className="mt-2"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <Card className="p-6">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center mb-4">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <img 
                    src={previewFavicon} 
                    alt="Favicon" 
                    className="w-10 h-10 object-contain" 
                  />
                </div>
                <div className="flex items-center border border-gray-200 rounded p-2 w-full max-w-xs">
                  <div className="w-4 h-4 mr-2">
                    <img 
                      src={previewFavicon} 
                      alt="Tab icon" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="text-sm truncate">{settings.siteTitle}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This is how your favicon will appear in browser tabs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FaviconTab;
