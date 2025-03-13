
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Calendar, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { blogCategories } from '@/utils/blogPosts';
import { FormData } from './types';

interface GeneralTabProps {
  formData: FormData;
  isNew: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calculateReadTime: () => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({
  formData,
  isNew,
  handleInputChange,
  handleSelectChange,
  handleSwitchChange,
  handleTagsChange,
  calculateReadTime,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            General information about the blog post
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Post ID (URL Slug) {isNew && <span className="text-red-500">*</span>}</Label>
            <Input 
              id="id" 
              name="id"
              value={formData.id} 
              onChange={handleInputChange}
              placeholder="post-url-slug"
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
              placeholder="Blog Post Title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt <span className="text-red-500">*</span></Label>
            <Input 
              id="excerpt" 
              name="excerpt"
              value={formData.excerpt} 
              onChange={handleInputChange}
              placeholder="Brief summary of the post"
              required
            />
            <p className="text-sm text-muted-foreground">
              A short summary that appears in blog listings (150-160 characters ideal)
            </p>
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
                {blogCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input 
              id="tags" 
              name="tags"
              value={formData.tags?.join(', ')} 
              onChange={handleTagsChange}
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
            />
            <Label htmlFor="featured">Featured Post</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publication Details</CardTitle>
          <CardDescription>
            Information about publication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="author" className="flex items-center gap-1">
              <User size={14} />
              Author
            </Label>
            <Input 
              id="author" 
              name="author"
              value={formData.author} 
              onChange={handleInputChange}
              placeholder="Author Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authorAvatar">Author Avatar URL</Label>
            <Input 
              id="authorAvatar" 
              name="authorAvatar"
              value={formData.authorAvatar} 
              onChange={handleInputChange}
              placeholder="/path/to/avatar.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-1">
              <Calendar size={14} />
              Publication Date
            </Label>
            <Input 
              id="date" 
              name="date"
              value={formData.date} 
              onChange={handleInputChange}
              placeholder="June 15, 2023"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="readTime" className="flex items-center gap-1">
              <Eye size={14} />
              Read Time
            </Label>
            <div className="flex space-x-2">
              <Input 
                id="readTime" 
                name="readTime"
                value={formData.readTime} 
                onChange={handleInputChange}
                placeholder="5 min read"
                className="flex-grow"
              />
              <Button
                type="button"
                variant="outline"
                onClick={calculateReadTime}
                className="whitespace-nowrap"
              >
                Calculate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralTab;
