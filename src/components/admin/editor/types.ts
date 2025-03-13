
import { BlogPost } from '@/utils/blogPosts';

export interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel?: () => void;
}

export interface FormData {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime?: string;
  category: string;
  tags: string[];
  featured?: boolean;
}
