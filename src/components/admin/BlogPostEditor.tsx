
import React, { useState } from 'react';
import { BlogPost, blogCategories } from '../../utils/blogPosts';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FileText, Image, Edit, Settings, Wand2, Eye, Calendar, User } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import SEOHelper from './SEOHelper';
import RichTextEditor from './RichTextEditor';

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ 
  post,
  onSave,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();
  const isNew = !post?.id;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    id: post?.id || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    imageUrl: post?.imageUrl || '',
    author: post?.author || 'Admin User',
    authorAvatar: post?.authorAvatar || '/placeholder.svg',
    date: post?.date || today,
    readTime: post?.readTime || '3 min read',
    category: post?.category || 'Construction',
    tags: post?.tags || [],
    featured: post?.featured || false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSEOUpdate = (data: {title: string, description: string, keywords: string}) => {
    const keywordArray = data.keywords.split(',').map(k => k.trim());
    
    setFormData(prev => ({ 
      ...prev, 
      title: data.title,
      excerpt: data.description,
      tags: keywordArray
    }));
  };

  const calculateReadTime = () => {
    // Remove HTML tags to get plain text
    const plainText = formData.content?.replace(/<[^>]*>?/gm, '') || '';
    
    // Average reading speed: 200 words per minute
    const words = plainText.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    
    // Update read time
    setFormData(prev => ({ 
      ...prev, 
      readTime: `${minutes} min read`
    }));
    
    toast({
      title: "Read Time Updated",
      description: `Estimated reading time: ${minutes} minutes.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.id || !formData.title || !formData.excerpt || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (ID, Title, Excerpt, Content).",
        variant: "destructive",
      });
      return;
    }

    // Generate ID from title if not provided
    const postId = formData.id || formData.title.toLowerCase().replace(/\s+/g, '-');
    
    // Generate a complete post object
    const completedPost: BlogPost = {
      id: postId,
      title: formData.title || '',
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      imageUrl: formData.imageUrl || '',
      author: formData.author || 'Admin User',
      authorAvatar: formData.authorAvatar || '/placeholder.svg',
      date: formData.date || today,
      readTime: formData.readTime || '3 min read',
      category: formData.category || 'Construction',
      tags: formData.tags || [],
      featured: formData.featured || false,
    };
    
    onSave(completedPost);
    toast({
      title: isNew ? "Blog Post Created" : "Blog Post Updated",
      description: `Blog post "${completedPost.title}" has been ${isNew ? 'created' : 'updated'} successfully.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isNew ? "Create New Blog Post" : `Edit: ${post?.title}`}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isNew ? "Create Post" : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Edit size={14} />
            General
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-1">
            <FileText size={14} />
            Content
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-1">
            <Image size={14} />
            Media
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-1">
            <Wand2 size={14} />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>
                Write your blog post content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor 
                initialValue={formData.content || ''} 
                onChange={handleContentChange}
                minHeight="500px"
                placeholder="Start writing your blog post content here..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
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
                  value={formData.imageUrl} 
                  onChange={handleInputChange}
                  placeholder="/path/to/image.jpg"
                />
              </div>
              
              {formData.imageUrl && (
                <div className="mt-4">
                  <Label>Preview</Label>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <img 
                      src={formData.imageUrl} 
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
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <SEOHelper 
            title={formData.title || ''}
            description={formData.excerpt || ''}
            keywords={formData.tags?.join(', ') || ''}
            onUpdate={handleSEOUpdate}
          />
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default BlogPostEditor;
