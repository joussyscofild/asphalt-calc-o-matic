
export interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  content: string;
  created: string;
  lastModified: string;
}
