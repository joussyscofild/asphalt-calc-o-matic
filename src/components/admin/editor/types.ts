
export interface FormData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  status?: 'published' | 'draft';
}

export interface BlogPostEditorProps {
  post?: any;
  onSave: (post: any) => void;
  onCancel?: () => void;
}
