import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Image, Wand2, Plus } from 'lucide-react';
import SEOHelper from './SEOHelper';
import { BlogPostEditorProps } from './editor/types';
import { useBlogPostForm } from './editor/useBlogPostForm';
import GeneralTab from './editor/GeneralTab';
import ContentTab from './editor/ContentTab';
import MediaTab from './editor/MediaTab';
import { BlogPost, blogPosts } from '@/utils/blogPosts';

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ 
  post,
  onSave,
  onCancel
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | undefined>(post);
  const [isCreating, setIsCreating] = useState<boolean>(!post);
  
  const {
    formData,
    activeTab,
    isNew,
    setActiveTab,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleContentChange,
    handleTagsChange,
    handleSEOUpdate,
    calculateReadTime,
    handleSubmit
  } = useBlogPostForm(onSave, selectedPost);

  const handleEditPost = (blogPost: BlogPost) => {
    setSelectedPost(blogPost);
    setIsCreating(true);
  };

  const handleCreateNew = () => {
    setSelectedPost(undefined);
    setIsCreating(true);
  };

  const handleCancelEdit = () => {
    if (onCancel) {
      onCancel();
    }
    setIsCreating(false);
    setSelectedPost(undefined);
  };

  if (!isCreating) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus size={16} />
            Create New Post
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {blogPosts.map((blogPost) => (
            <div
              key={blogPost.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{blogPost.title}</h3>
                  <p className="text-sm text-muted-foreground">{blogPost.date} • {blogPost.category}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => handleEditPost(blogPost)}>
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isNew ? "Create New Blog Post" : `Edit: ${selectedPost?.title}`}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCancelEdit}>
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
          <GeneralTab 
            formData={formData}
            isNew={isNew}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSwitchChange={handleSwitchChange}
            handleTagsChange={handleTagsChange}
            calculateReadTime={calculateReadTime}
          />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentTab 
            content={formData.content || ''}
            handleContentChange={handleContentChange}
          />
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <MediaTab 
            imageUrl={formData.imageUrl || ''}
            handleInputChange={handleInputChange}
          />
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
