
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogPost, blogPosts, getAllPublishedPosts, addBlogPostToSupabase, deleteBlogPostFromSupabase, fetchBlogPosts } from '@/utils/blogPosts';
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  
  // Helper function to generate a UUID
  const generateUUID = () => {
    return crypto.randomUUID ? crypto.randomUUID() : 
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  };
  
  // Check if a string is a valid UUID
  const isValidUUID = (id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };
  
  // Handler for saving blog posts
  const handleSaveBlogPost = async (post: BlogPost) => {
    // Ensure post has a valid status
    if (!post.status) {
      post.status = 'published';
    }
    
    console.log("Admin dashboard saving post:", post.id, "Content length:", post.content.length);
    console.log("Post status:", post.status);
    
    try {
      // Ensure we have a valid UUID for the post ID
      const postId = isValidUUID(post.id) ? post.id : generateUUID();
      
      // Save post to Supabase
      const { data, error } = await supabase
        .from('blog_posts')
        .upsert({
          id: postId,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image_url: post.imageUrl,
          author: post.author,
          author_avatar: post.authorAvatar,
          date: post.date,
          read_time: post.readTime,
          category: post.category,
          tags: post.tags,
          featured: post.featured,
          status: post.status,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });
      
      if (error) {
        console.error("Error saving blog post to Supabase:", error);
        toast({
          title: "Error Saving Post",
          description: "There was an error saving your blog post. Please try again.",
          variant: "destructive"
        });
        throw error;
      }
      
      // Update post ID if it was generated
      if (post.id !== postId) {
        post.id = postId;
      }
      
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
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error Saving Post",
        description: "There was an error saving your blog post. Please try again.",
        variant: "destructive"
      });
      throw error;
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
