import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Image, Wand2 } from 'lucide-react';
import SEOHelper from './SEOHelper';
import { BlogPostEditorProps } from './editor/types';
import { useBlogPostForm } from './editor/useBlogPostForm';
import GeneralTab from './editor/GeneralTab';
import ContentTab from './editor/ContentTab';
import MediaTab from './editor/MediaTab';

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ 
  post,
  onSave,
  onCancel
}) => {
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
  } = useBlogPostForm(onSave, post);

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
