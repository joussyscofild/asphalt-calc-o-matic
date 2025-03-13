
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogPost, blogPosts, getAllPublishedPosts } from '@/utils/blogPosts';
import { useState, useEffect } from "react";

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  
  // Load posts from localStorage on component mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        // Update the global blogPosts array
        blogPosts.length = 0; // Clear the array
        blogPosts.push(...parsedPosts); // Add all stored posts
        setPosts(parsedPosts);
        console.log("Loaded", parsedPosts.length, "posts from localStorage");
      } catch (error) {
        console.error("Error parsing stored posts:", error);
      }
    }
  }, []);
  
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
    
    // Persist to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    
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

  // Handler for deleting a blog post
  const handleDeleteBlogPost = (postId: string) => {
    const postIndex = blogPosts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      const postTitle = blogPosts[postIndex].title;
      blogPosts.splice(postIndex, 1);
      
      // Persist to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
      
      toast({
        title: "Blog Post Deleted",
        description: `"${postTitle}" has been deleted.`,
      });
      
      // Force a refresh
      setRefreshTrigger(prev => prev + 1);
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
    posts
  };
};
