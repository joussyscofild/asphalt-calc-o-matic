
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Image, Wand2, Plus, Save, Send, Eye } from 'lucide-react';
import SEOHelper from './SEOHelper';
import { BlogPostEditorProps } from './editor/types';
import { useBlogPostForm } from './editor/useBlogPostForm';
import GeneralTab from './editor/GeneralTab';
import ContentTab from './editor/ContentTab';
import MediaTab from './editor/MediaTab';
import { BlogPost, blogPosts } from '@/utils/blogPosts';
import { useToast } from "@/hooks/use-toast";

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ 
  post,
  onSave,
  onCancel
}) => {
  const { toast } = useToast();
  const [selectedPost, setSelectedPost] = useState<BlogPost | undefined>(post);
  const [isCreating, setIsCreating] = useState<boolean>(!post);
  const [editorKey, setEditorKey] = useState<number>(0);
  
  const handleSaveComplete = (post: BlogPost, isPublished: boolean) => {
    // Add the status to the post object
    const updatedPost = {
      ...post,
      status: isPublished ? 'published' : 'draft'
    };
    
    // Call the parent component's onSave function
    onSave(updatedPost);
    
    // If we were creating a new post, reset the form for another new post
    if (!selectedPost) {
      resetFormData();
      setEditorKey(prev => prev + 1);
    }
  };
  
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
    handleSaveDraft,
    handlePublish,
    resetFormData
  } = useBlogPostForm(handleSaveComplete, selectedPost);

  // When editing a post, update the editorKey to force a re-render
  useEffect(() => {
    if (selectedPost) {
      console.log("Blog post selected for editing:", selectedPost);
      setEditorKey(prev => prev + 1);
    }
  }, [selectedPost]);

  const handleEditPost = (blogPost: BlogPost) => {
    console.log("Editing blog post:", blogPost);
    toast({
      title: "Loading post for editing",
      description: `Loading "${blogPost.title}" for editing`,
    });
    setSelectedPost(blogPost);
    setIsCreating(true);
    // Force re-render of the editor
    setEditorKey(prev => prev + 1);
  };

  const handleCreateNew = () => {
    toast({
      title: "Create New Post",
      description: "Starting with a blank post",
    });
    resetFormData();
    setSelectedPost(undefined);
    setIsCreating(true);
    setEditorKey(prev => prev + 1);
  };

  const handleCancelEdit = () => {
    if (onCancel) {
      onCancel();
    }
    setIsCreating(false);
    setSelectedPost(undefined);
  };

  const handlePreview = () => {
    // Open a new window with the blog post preview
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Preview: ${formData.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-100 p-8">
          <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 class="text-3xl font-bold mb-4">${formData.title}</h1>
            <p class="text-gray-600 mb-6">
              By ${formData.author} • ${formData.date} • ${formData.readTime}
            </p>
            <div class="prose max-w-none">
              ${formData.content}
            </div>
          </div>
        </body>
        </html>
      `);
      previewWindow.document.close();
    }
    
    toast({
      title: "Preview Opened",
      description: "A preview of your blog post has been opened in a new tab",
    });
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
                <div className={`p-2 rounded-full ${blogPost.status === 'draft' ? 'bg-orange-100' : 'bg-primary/10'}`}>
                  <FileText className={`h-5 w-5 ${blogPost.status === 'draft' ? 'text-orange-500' : 'text-primary'}`} />
                </div>
                <div>
                  <h3 className="font-medium">
                    {blogPost.title}
                    {blogPost.status === 'draft' && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">Draft</span>
                    )}
                  </h3>
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
    <form className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isNew ? "Create New Blog Post" : `Edit: ${selectedPost?.title}`}
        </h2>
        <div className="flex space-x-2">
          <Button 
            type="button"
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handlePreview}
          >
            <Eye size={14} />
            Preview
          </Button>
          <Button 
            type="button"
            variant="outline" 
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
          <Button 
            type="button"
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleSaveDraft}
          >
            <Save size={14} />
            Save Draft
          </Button>
          <Button 
            type="button"
            className="flex items-center gap-1"
            onClick={handlePublish}
          >
            <Send size={14} />
            {isNew ? "Publish" : "Update"}
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
            key={`content-tab-${editorKey}`}
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
