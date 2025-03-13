
import { useState } from 'react';
import { BlogPost } from '@/utils/blogPosts';
import { useToast } from "@/components/ui/use-toast";
import { FormData } from './types';

export const useBlogPostForm = (post?: BlogPost, onSave: (post: BlogPost) => void) => {
  const { toast } = useToast();
  const isNew = !post?.id;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const [formData, setFormData] = useState<FormData>({
    id: post?.id || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    imageUrl: post?.imageUrl || '',
    author: post?.author || 'Admin User',
    authorAvatar: post?.authorAvatar || '/placeholder.svg',
    date: post?.date || today,
    readTime: post?.readTime || '3 min read',
    category: post?.category || 'Construction',
    tags: post?.tags || [],
    featured: post?.featured || false,
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSEOUpdate = (data: {title: string, description: string, keywords: string}) => {
    const keywordArray = data.keywords.split(',').map(k => k.trim());
    
    setFormData(prev => ({ 
      ...prev, 
      title: data.title,
      excerpt: data.description,
      tags: keywordArray
    }));
  };

  const calculateReadTime = () => {
    // Remove HTML tags to get plain text
    const plainText = formData.content?.replace(/<[^>]*>?/gm, '') || '';
    
    // Average reading speed: 200 words per minute
    const words = plainText.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    
    // Update read time
    setFormData(prev => ({ 
      ...prev, 
      readTime: `${minutes} min read`
    }));
    
    toast({
      title: "Read Time Updated",
      description: `Estimated reading time: ${minutes} minutes.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.id || !formData.title || !formData.excerpt || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (ID, Title, Excerpt, Content).",
        variant: "destructive",
      });
      return;
    }

    // Generate ID from title if not provided
    const postId = formData.id || formData.title.toLowerCase().replace(/\s+/g, '-');
    
    // Generate a complete post object
    const completedPost: BlogPost = {
      id: postId,
      title: formData.title || '',
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      imageUrl: formData.imageUrl || '',
      author: formData.author || 'Admin User',
      authorAvatar: formData.authorAvatar || '/placeholder.svg',
      date: formData.date || today,
      readTime: formData.readTime || '3 min read',
      category: formData.category || 'Construction',
      tags: formData.tags || [],
      featured: formData.featured || false,
    };
    
    onSave(completedPost);
    toast({
      title: isNew ? "Blog Post Created" : "Blog Post Updated",
      description: `Blog post "${completedPost.title}" has been ${isNew ? 'created' : 'updated'} successfully.`,
    });
  };

  return {
    formData,
    activeTab,
    isNew,
    setActiveTab,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleContentChange,
    handleTagsChange,
    handleSEOUpdate,
    calculateReadTime,
    handleSubmit
  };
};
