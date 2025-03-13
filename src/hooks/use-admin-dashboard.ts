
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from '@/utils/blogPosts';

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handler for saving blog posts
  const handleSaveBlogPost = (post: BlogPost) => {
    // In a real application, you would save the post to your backend
    toast({
      title: "Blog Post Saved",
      description: `Successfully saved "${post.title}"`,
    });
  };
  
  // Handler for canceling blog post edits
  const handleCancelBlogPost = () => {
    toast({
      title: "Editing Canceled",
      description: "Changes to the blog post have been discarded.",
    });
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
    handleLogout
  };
};
