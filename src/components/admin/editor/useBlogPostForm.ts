
import { useState, useEffect } from 'react';
import { BlogPost, blogPosts } from '@/utils/blogPosts';
import { useToast } from "@/hooks/use-toast";
import { FormData } from './types';

export const useBlogPostForm = (onSave: (post: BlogPost, isPublished: boolean) => void, post?: BlogPost) => {
  const { toast } = useToast();
  const isNew = !post?.id;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Generate a UUID
  const generateUUID = () => {
    return crypto.randomUUID ? crypto.randomUUID() : 
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  };

  const initialFormState: FormData = {
    id: '',
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    author: 'Admin User',
    authorAvatar: '/placeholder.svg',
    date: today,
    readTime: '3 min read',
    category: 'Construction',
    tags: [],
    featured: false,
    status: 'draft'
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Update form data when post changes
  useEffect(() => {
    if (post) {
      console.log("Loading post for editing:", post.id, "Content length:", post.content?.length || 0);
      console.log("Post status:", post.status);
      
      // Create a deep copy to avoid reference issues
      setFormData({
        id: post.id || '',
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        imageUrl: post.imageUrl || '',
        author: post.author || 'Admin User',
        authorAvatar: post.authorAvatar || '/placeholder.svg',
        date: post.date || today,
        readTime: post.readTime || '3 min read',
        category: post.category || 'Construction',
        tags: post.tags || [],
        featured: post.featured || false,
        status: post.status || 'draft'
      });
      setHasInitialized(true);
    } else {
      // If no post is provided, reset to initial state
      setFormData(initialFormState);
      setHasInitialized(true);
    }
  }, [post, today]);

  // Reset form data to initial state
  const resetFormData = () => {
    setFormData(initialFormState);
    setHasInitialized(false);
  };

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
    console.log("Content changed in form, new length:", content.length);
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
    const plainText = formData.content?.replace(/<[^>]*>?/gm, '') || '';
    
    const words = plainText.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    
    setFormData(prev => ({ 
      ...prev, 
      readTime: `${minutes} min read`
    }));
    
    toast({
      title: "Read Time Updated",
      description: `Estimated reading time: ${minutes} minutes.`,
    });
  };

  // Handle saving as draft
  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    savePost(false);
  };

  // Handle publishing
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    savePost(true);
  };

  // Common save logic
  const savePost = (isPublished: boolean) => {
    if (!formData.title || !formData.excerpt) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Title, Excerpt).",
        variant: "destructive",
      });
      return;
    }

    // Generate a valid UUID if not provided or not valid
    const postId = formData.id || generateUUID();
    
    const completedPost: BlogPost = {
      id: postId,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content || '', // Ensure content is never undefined
      imageUrl: formData.imageUrl || '',
      author: formData.author,
      authorAvatar: formData.authorAvatar,
      date: formData.date,
      readTime: formData.readTime,
      category: formData.category,
      tags: formData.tags,
      featured: formData.featured,
      status: isPublished ? 'published' : 'draft'
    };
    
    console.log("Saving post with ID:", completedPost.id, "Content length:", completedPost.content.length);
    console.log("Post status being set to:", completedPost.status);
    
    onSave(completedPost, isPublished);
    
    const actionText = isPublished ? "Published" : "Saved as draft";
    toast({
      title: isNew ? `Blog Post ${actionText}` : `Blog Post Updated`,
      description: `Blog post "${completedPost.title}" has been ${isNew ? actionText.toLowerCase() : 'updated'} successfully.`,
    });
  };

  return {
    formData,
    activeTab,
    isNew,
    hasInitialized,
    setActiveTab,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleContentChange,
    handleTagsChange,
    handleSEOUpdate,
    calculateReadTime,
    handleSaveDraft,
    handlePublish,
    resetFormData
  };
};
