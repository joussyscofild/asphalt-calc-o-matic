
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Image, Wand2, Plus, Save, Send, Eye, Trash, Loader2 } from 'lucide-react';
import SEOHelper from './SEOHelper';
import { BlogPostEditorProps } from './editor/types';
import { useBlogPostForm } from './editor/useBlogPostForm';
import GeneralTab from './editor/GeneralTab';
import ContentTab from './editor/ContentTab';
import MediaTab from './editor/MediaTab';
import { BlogPost, blogPosts, fetchBlogPosts } from '@/utils/blogPosts';
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ 
  post,
  onSave,
  onCancel,
  onDelete,
  posts = [],
  isLoading = false
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<BlogPost | undefined>(post);
  const [isCreating, setIsCreating] = useState<boolean>(false); // Changed to false by default
  const [editorKey, setEditorKey] = useState<number>(0);
  const [postsList, setPostsList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (posts && posts.length > 0) {
      console.log("Using posts from props:", posts.length);
      setPostsList(posts);
      setLoading(false);
    } else {
      const loadPosts = async () => {
        setLoading(true);
        try {
          const loadedPosts = await fetchBlogPosts();
          console.log("Fetched posts in editor:", loadedPosts.length);
          setPostsList(loadedPosts);
        } catch (error) {
          console.error("Error loading posts:", error);
          setPostsList(blogPosts);
        } finally {
          setLoading(false);
        }
      };
      
      loadPosts();
    }
  }, [posts]);
  
  useEffect(() => {
    if (isLoading !== undefined) {
      setLoading(isLoading);
    }
  }, [isLoading]);
  
  useEffect(() => {
    console.log("BlogPostEditor initialized with post:", post?.id || "new post");
    if (post) {
      console.log("Initial post status:", post.status);
      console.log("Initial post content length:", post.content?.length || 0);
      setSelectedPost(post);
      setIsCreating(true);
    }
  }, [post]);
  
  const handleSaveComplete = (post: BlogPost, isPublished: boolean) => {
    const updatedPost = {
      ...post,
      status: isPublished ? 'published' : 'draft'
    };
    
    console.log("Saving post from editor, ID:", updatedPost.id, "Content length:", updatedPost.content.length);
    console.log("Post status being set to:", updatedPost.status);
    
    onSave(updatedPost);
    
    if (!selectedPost) {
      resetFormData();
      setEditorKey(prev => prev + 1);
    }
  };
  
  const {
    formData,
    activeTab,
    isNew,
    hasInitialized,
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

  useEffect(() => {
    if (selectedPost) {
      console.log("Blog post selected for editing, ID:", selectedPost.id);
      if (selectedPost.content) {
        console.log("Content length:", selectedPost.content.length);
      } else {
        console.log("Content is empty or undefined");
      }
      console.log("Post status:", selectedPost.status);
      setEditorKey(Date.now());
    }
  }, [selectedPost]);

  const handleEditPost = (blogPost: BlogPost) => {
    console.log("Editing blog post:", blogPost.id);
    if (blogPost.content) {
      console.log("Content length:", blogPost.content.length);
    } else {
      console.log("Content is empty or undefined");
    }
    console.log("Post status:", blogPost.status);
    
    toast({
      title: "Loading post for editing",
      description: `Loading "${blogPost.title}" for editing`,
    });
    setSelectedPost(blogPost);
    setIsCreating(true);
  };

  const handleCreateNew = () => {
    toast({
      title: "Create New Post",
      description: "Starting with a blank post",
    });
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

  const handleDeletePost = (postId: string) => {
    if (onDelete) {
      onDelete(postId);
      // Update local list after delete
      setPostsList(prevPosts => prevPosts.filter(post => post.id !== postId));
    }
  };

  const handlePreview = () => {
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
        
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {postsList.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No blog posts found. Click "Create New Post" to get started.
              </div>
            ) : (
              postsList.map((blogPost) => (
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
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleEditPost(blogPost)}>
                      Edit
                    </Button>
                    {onDelete && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{blogPost.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeletePost(blogPost.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  if (!hasInitialized) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading editor...</span>
      </div>
    );
  }

  return (
    <form className="space-y-6" key={`blog-post-form-${editorKey}`}>
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
