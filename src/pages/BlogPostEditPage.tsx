
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost, getBlogPostById } from '@/utils/blogPosts';
import BlogPostEditor from '@/components/admin/BlogPostEditor';
import { useAdminDashboard } from '@/hooks/use-admin-dashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const BlogPostEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { handleSaveBlogPost, handleCancelBlogPost, handleDeleteBlogPost } = useAdminDashboard();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      
      if (id) {
        console.log("Attempting to load post with ID:", id);
        try {
          const foundPost = await getBlogPostById(id);
          
          if (foundPost) {
            console.log("Found post:", foundPost.title);
            console.log("Post content length:", foundPost.content?.length || 0);
            
            // Ensure we're working with a complete post object
            setPost({
              ...foundPost,
              content: foundPost.content || '',
              status: foundPost.status || 'draft'
            });
            
            toast({
              title: "Post Loaded",
              description: `Now editing: ${foundPost.title}`,
            });
          } else {
            console.log("Post not found with ID:", id);
            toast({
              title: "Post Not Found",
              description: "The requested post could not be found.",
              variant: "destructive"
            });
            navigate('/admin/dashboard#blog');
          }
        } catch (error) {
          console.error("Error loading post:", error);
          toast({
            title: "Error Loading Post",
            description: "There was an error loading the post. Please try again.",
            variant: "destructive"
          });
          navigate('/admin/dashboard#blog');
        }
      }
      
      setIsLoading(false);
    };
    
    loadPost();
  }, [id, navigate, toast]);
  
  const handleSave = async (updatedPost: BlogPost) => {
    try {
      console.log("Saving post with content length:", updatedPost.content.length);
      await handleSaveBlogPost(updatedPost);
      navigate('/admin/dashboard#blog');
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error Saving Post",
        description: "There was a problem saving your post. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="container-custom py-8">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <div className="text-lg">Loading post content...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/admin/dashboard#blog')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <BlogPostEditor
          post={post}
          onSave={handleSave}
          onCancel={handleCancelBlogPost}
          onDelete={handleDeleteBlogPost}
        />
      </div>
    </div>
  );
};

export default BlogPostEditPage;
