
export interface FormData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft';
}

export interface BlogPostEditorProps {
  post?: any;
  onSave: (post: any, status?: string) => void;
  onCancel: () => void;
  onDelete?: (postId: string) => void;
}

export interface GeneralTabProps {
  formData: FormData;
  isNew: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calculateReadTime: () => void;
}

export interface ContentTabProps {
  content: string;
  handleContentChange: (content: string) => void;
}

export interface MediaTabProps {
  imageUrl: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SEOHelperProps {
  title: string;
  description: string;
  keywords: string;
  onUpdate: (data: { title: string; description: string; keywords: string }) => void;
}
