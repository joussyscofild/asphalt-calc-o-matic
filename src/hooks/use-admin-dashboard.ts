
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogPost, blogPosts } from '@/utils/blogPosts';

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handler for saving blog posts
  const handleSaveBlogPost = (post: BlogPost) => {
    // In a real application, you would save the post to your backend
    // For now, we'll update our local data
    
    // First, check if the post already exists
    const existingPostIndex = blogPosts.findIndex(p => p.id === post.id);
    
    if (existingPostIndex !== -1) {
      // Update existing post
      blogPosts[existingPostIndex] = { ...post };
    } else {
      // Add new post
      blogPosts.push({ ...post });
    }
    
    const statusMessage = post.status === 'published' 
      ? "Published" 
      : "Saved as draft";
      
    toast({
      title: `Blog Post ${statusMessage}`,
      description: `Successfully ${statusMessage.toLowerCase()} "${post.title}"`,
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
