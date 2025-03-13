
import { BlogPost } from '@/utils/blogPosts';

export interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

export interface FormData extends Partial<BlogPost> {}
