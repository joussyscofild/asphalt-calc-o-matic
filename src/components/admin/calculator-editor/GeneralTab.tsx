
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categories } from '@/utils/calculators';
import RichTextEditor from '../RichTextEditor';
import { FormData } from './types';

interface GeneralTabProps {
  formData: FormData;
  isNew: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  handleRichTextChange: (content: string) => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({
  formData,
  isNew,
  handleInputChange,
  handleSelectChange,
  handleSwitchChange,
  handleRichTextChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            General information about the calculator
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">ID (URL Slug) {isNew && <span className="text-red-500">*</span>}</Label>
            <Input 
              id="id" 
              name="id"
              value={formData.id} 
              onChange={handleInputChange}
              placeholder="calculator-id-slug"
              disabled={!isNew}
            />
            <p className="text-sm text-muted-foreground">
              Unique identifier, used in URLs. Auto-generated from title if left blank.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
            <Input 
              id="title" 
              name="title"
              value={formData.title} 
              onChange={handleInputChange}
              placeholder="Calculator Title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description <span className="text-red-500">*</span></Label>
            <Textarea 
              id="description" 
              name="description"
              value={formData.description} 
              onChange={handleInputChange}
              placeholder="Brief description of what the calculator does"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              defaultValue={formData.category} 
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.label}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeEstimate">Time Estimate</Label>
            <Select 
              defaultValue={formData.timeEstimate} 
              onValueChange={(value) => handleSelectChange('timeEstimate', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Time to complete" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30 sec">30 seconds</SelectItem>
                <SelectItem value="1 min">1 minute</SelectItem>
                <SelectItem value="2 min">2 minutes</SelectItem>
                <SelectItem value="3 min">3 minutes</SelectItem>
                <SelectItem value="5 min">5 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
            />
            <Label htmlFor="featured">Featured Calculator</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Long Description</CardTitle>
          <CardDescription>
            Detailed description that will be shown on the calculator page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor 
            initialValue={formData.longDescription || ''} 
            onChange={handleRichTextChange}
            minHeight="200px"
            placeholder="Enter detailed description of how to use the calculator..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralTab;
