
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MediaTabProps {
  imageUrl: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MediaTab: React.FC<MediaTabProps> = ({ imageUrl, handleInputChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Image</CardTitle>
        <CardDescription>
          The main image for your blog post
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input 
            id="imageUrl" 
            name="imageUrl"
            value={imageUrl} 
            onChange={handleInputChange}
            placeholder="/path/to/image.jpg"
          />
        </div>
        
        {imageUrl && (
          <div className="mt-4">
            <Label>Preview</Label>
            <div className="mt-2 border rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="w-full h-auto max-h-64 object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">
            For best results, use images with a 16:9 aspect ratio (e.g., 1200×675 pixels) 
            and keep file sizes under 300KB.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaTab;
