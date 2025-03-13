
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogPost, blogPosts, getAllPublishedPosts, addBlogPostToSupabase, deleteBlogPostFromSupabase, fetchBlogPosts } from '@/utils/blogPosts';
import { useState, useEffect } from "react";

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load posts from Supabase on component mount
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const loadedPosts = await fetchBlogPosts();
        setPosts(loadedPosts);
        console.log("Loaded", loadedPosts.length, "posts from Supabase");
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, [refreshTrigger]);
  
  // Handler for saving blog posts
  const handleSaveBlogPost = async (post: BlogPost) => {
    // Ensure post has a valid status
    if (!post.status) {
      post.status = 'published';
    }
    
    console.log("Admin dashboard saving post:", post.id, "Content length:", post.content.length);
    console.log("Post status:", post.status);
    
    try {
      // Save post to Supabase
      await addBlogPostToSupabase(post);
      
      // Update local blogPosts array
      const existingPostIndex = blogPosts.findIndex(p => p.id === post.id);
      
      if (existingPostIndex !== -1) {
        // Update existing post
        console.log("Updating existing post in admin dashboard");
        blogPosts[existingPostIndex] = { ...post };
      } else {
        // Add new post
        console.log("Adding new post in admin dashboard");
        blogPosts.push({ ...post });
      }
      
      const statusMessage = post.status === 'published' 
        ? "Published" 
        : "Saved as draft";
        
      toast({
        title: `Blog Post ${statusMessage}`,
        description: `Successfully ${statusMessage.toLowerCase()} "${post.title}"`,
      });
      
      // Force a refresh to show updated posts
      setRefreshTrigger(prev => prev + 1);
      
      // Navigate back to dashboard after a brief delay to allow state updates
      setTimeout(() => {
        navigate('/admin/dashboard#blog');
      }, 500);
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error Saving Post",
        description: "There was an error saving your blog post. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Handler for canceling blog post edits
  const handleCancelBlogPost = () => {
    toast({
      title: "Editing Canceled",
      description: "Changes to the blog post have been discarded.",
    });
    navigate('/admin/dashboard#blog');
  };

  // Handler for deleting a blog post
  const handleDeleteBlogPost = async (postId: string) => {
    try {
      const postIndex = blogPosts.findIndex(p => p.id === postId);
      if (postIndex !== -1) {
        const postTitle = blogPosts[postIndex].title;
        
        // Delete from Supabase
        await deleteBlogPostFromSupabase(postId);
        
        // Remove from local array
        blogPosts.splice(postIndex, 1);
        
        toast({
          title: "Blog Post Deleted",
          description: `"${postTitle}" has been deleted.`,
        });
        
        // Force a refresh
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error Deleting Post",
        description: "There was an error deleting the blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/admin');
  };
  
  return {
    handleSaveBlogPost,
    handleCancelBlogPost,
    handleDeleteBlogPost,
    handleLogout,
    refreshTrigger,
    posts,
    isLoading
  };
};
