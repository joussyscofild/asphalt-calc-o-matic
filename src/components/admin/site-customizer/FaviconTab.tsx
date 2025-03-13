
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SiteSettings } from './types';
import { Image, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
  // Force a re-render of the favicon preview
  const refreshPreview = () => {
    const previewImg = document.getElementById('favicon-preview') as HTMLImageElement;
    if (previewImg && settings.favicon) {
      const timestamp = new Date().getTime();
      previewImg.src = `${settings.favicon}?v=${timestamp}`;
      
      toast({
        title: "Preview refreshed",
        description: "The favicon preview has been refreshed.",
      });
    }
  };
  
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
            <p className="text-sm text-muted-foreground mt-2">
              After uploading, click "Save Changes" at the bottom of the page to make your changes permanent.
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <Card className="p-6">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center mb-4">
                <div className="bg-gray-100 p-4 rounded-lg mb-4 relative">
                  {previewFavicon ? (
                    <img 
                      id="favicon-preview"
                      src={`${previewFavicon}?v=${new Date().getTime()}`}
                      alt="Favicon" 
                      className="w-10 h-10 object-contain" 
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center text-gray-400">
                      <Image size={24} />
                    </div>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-0 right-0"
                    onClick={refreshPreview}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center border border-gray-200 rounded p-2 w-full max-w-xs">
                  <div className="w-4 h-4 mr-2">
                    {previewFavicon ? (
                      <img 
                        src={`${previewFavicon}?v=${new Date().getTime()}`}
                        alt="Tab icon" 
                        className="w-full h-full object-contain" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Image size={12} />
                      </div>
                    )}
                  </div>
                  <div className="text-sm truncate">{settings.siteTitle}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This is how your favicon will appear in browser tabs. If you don't see your uploaded favicon, try refreshing the preview.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FaviconTab;
