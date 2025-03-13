
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogPost, blogPosts } from '@/utils/blogPosts';
import { useState } from "react";

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Handler for saving blog posts
  const handleSaveBlogPost = (post: BlogPost) => {
    // Ensure post has a valid status
    if (!post.status) {
      post.status = 'published';
    }
    
    console.log("Admin dashboard saving post:", post.id, "Content length:", post.content.length);
    console.log("Post status:", post.status);
    
    // First, check if the post already exists
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
  };
  
  // Handler for canceling blog post edits
  const handleCancelBlogPost = () => {
    toast({
      title: "Editing Canceled",
      description: "Changes to the blog post have been discarded.",
    });
    navigate('/admin/dashboard#blog');
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
    handleLogout,
    refreshTrigger
  };
};
