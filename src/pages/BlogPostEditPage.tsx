
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost, getBlogPostById } from '@/utils/blogPosts';
import BlogPostEditor from '@/components/admin/BlogPostEditor';
import { useAdminDashboard } from '@/hooks/use-admin-dashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BlogPostEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const { handleSaveBlogPost, handleCancelBlogPost } = useAdminDashboard();
  
  useEffect(() => {
    if (id) {
      const foundPost = getBlogPostById(id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        // Post not found, redirect to dashboard
        navigate('/admin/dashboard#blog');
      }
    }
  }, [id, navigate]);
  
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
          onSave={handleSaveBlogPost}
          onCancel={handleCancelBlogPost}
        />
      </div>
    </div>
  );
};

export default BlogPostEditPage;
