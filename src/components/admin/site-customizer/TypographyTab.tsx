
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const TypographyTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Typography Settings</CardTitle>
          <CardDescription>
            Customize the typography for your site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heading-font">Heading Font</Label>
            <Select defaultValue="inter">
              <SelectTrigger id="heading-font">
                <SelectValue placeholder="Select heading font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="opensans">Open Sans</SelectItem>
                <SelectItem value="montserrat">Montserrat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="body-font">Body Font</Label>
            <Select defaultValue="roboto">
              <SelectTrigger id="body-font">
                <SelectValue placeholder="Select body font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="opensans">Open Sans</SelectItem>
                <SelectItem value="montserrat">Montserrat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="base-size">Base Font Size</Label>
              <span className="text-sm text-muted-foreground">16px</span>
            </div>
            <Slider
              id="base-size"
              defaultValue={[16]}
              min={12}
              max={24}
              step={1}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="line-height">Line Height</Label>
              <span className="text-sm text-muted-foreground">1.5</span>
            </div>
            <Slider
              id="line-height"
              defaultValue={[1.5]}
              min={1}
              max={2}
              step={0.1}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how your typography looks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Heading 1</h1>
            <h2 className="text-2xl font-bold">Heading 2</h2>
            <h3 className="text-xl font-bold">Heading 3</h3>
            <p className="text-base">This is a paragraph of text that demonstrates how body text will appear on your site. The font, size, and spacing can all be customized to create the perfect reading experience for your visitors.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypographyTab;
