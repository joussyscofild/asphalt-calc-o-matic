
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost, addBlogPostToSupabase, deleteBlogPostFromSupabase } from "@/utils/blogPosts";

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/admin');
  };

  // Handle saving blog post
  const handleSaveBlogPost = async (post: BlogPost) => {
    try {
      await addBlogPostToSupabase(post);
      toast({
        title: "Post Saved",
        description: "Your blog post has been saved successfully."
      });
      setRefreshTrigger(prev => prev + 1);
      return true;
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: "There was an error saving the blog post.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  // Handle cancel blog post edit/creation
  const handleCancelBlogPost = () => {
    navigate('/admin/dashboard#blog');
  };
  
  // Handle delete blog post
  const handleDeleteBlogPost = async (postId: string) => {
    try {
      await deleteBlogPostFromSupabase(postId);
      toast({
        title: "Post Deleted",
        description: "The blog post has been deleted successfully."
      });
      setRefreshTrigger(prev => prev + 1);
      return true;
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the blog post.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  return {
    handleLogout,
    refreshTrigger,
    handleSaveBlogPost,
    handleCancelBlogPost,
    handleDeleteBlogPost
  };
};
