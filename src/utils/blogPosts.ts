
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  authorAvatar?: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
  readTime?: string;
}

export const blogCategories = [
  { id: 'asphalt-guides', name: 'Asphalt Paving Guides' },
  { id: 'construction-materials', name: 'Construction Materials 101' },
  { id: 'project-planning', name: 'Project Planning' },
  { id: 'industry-trends', name: 'Industry Trends' },
  { id: 'diy-tips', name: 'DIY Tips & Tricks' }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'understanding-asphalt-density',
    title: 'Understanding Asphalt Density: The Key to Durable Pavements',
    excerpt: 'Learn how proper asphalt density affects the longevity and performance of your paving project, and why it matters for your calculations.',
    author: 'John Anderson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'June 15, 2023',
    category: 'Asphalt Paving Guides',
    tags: ['Asphalt Density', 'Material Properties', 'Paving Durability'],
    imageUrl: 'https://images.unsplash.com/photo-1518962634205-830d3ccb1b92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    readTime: '5 min read'
  },
  {
    id: 'choosing-right-concrete-mix',
    title: 'How to Choose the Right Concrete Mix for Your Project',
    excerpt: 'A comprehensive guide to selecting the appropriate concrete mix based on project requirements, strength needs, and environmental conditions.',
    author: 'Michael Torres',
    authorAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    date: 'May 28, 2023',
    category: 'Construction Materials 101',
    tags: ['Concrete Mix', 'Material Selection', 'Construction Basics'],
    imageUrl: 'https://images.unsplash.com/photo-1578053373574-177685692edf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    readTime: '6 min read'
  },
  {
    id: 'asphalt-vs-concrete-driveways',
    title: 'Asphalt vs. Concrete Driveways: A Cost and Durability Comparison',
    excerpt: 'Compare the pros and cons of asphalt and concrete driveways, including initial costs, maintenance requirements, and long-term value.',
    author: 'Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'April 12, 2023',
    category: 'Project Planning',
    tags: ['Driveways', 'Cost Comparison', 'Asphalt', 'Concrete'],
    imageUrl: 'https://images.unsplash.com/photo-1617108029561-d5e7825f2851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    readTime: '7 min read'
  },
  {
    id: 'minimizing-material-waste',
    title: '5 Strategies to Minimize Material Waste on Construction Sites',
    excerpt: 'Practical tips for reducing waste, improving efficiency, and saving money on your construction projects through better material management.',
    author: 'David Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: 'March 5, 2023',
    category: 'Project Planning',
    tags: ['Waste Reduction', 'Cost Saving', 'Sustainability'],
    imageUrl: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    readTime: '4 min read'
  },
  {
    id: 'parking-lot-design-tips',
    title: 'Essential Parking Lot Design Tips for Maximum Efficiency',
    excerpt: 'Learn how to design efficient, compliant parking lots that maximize space utilization while ensuring proper drainage and traffic flow.',
    author: 'Robert Williams',
    authorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    date: 'February 18, 2023',
    category: 'Project Planning',
    tags: ['Parking Lot', 'Design', 'Space Utilization'],
    imageUrl: 'https://images.unsplash.com/photo-1545364477-c76935cd61f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    readTime: '5 min read'
  },
  {
    id: 'sustainable-paving-practices',
    title: 'Sustainable Paving Practices for Environmental Compliance',
    excerpt: 'Discover eco-friendly paving methods and materials that meet regulatory requirements while reducing environmental impact.',
    author: 'Emma Rodriguez',
    authorAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    date: 'January 9, 2023',
    category: 'Industry Trends',
    tags: ['Sustainability', 'Environmental Compliance', 'Green Building'],
    imageUrl: 'https://images.unsplash.com/photo-1553708881-112abc53fe54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    readTime: '6 min read'
  }
];

export const getRecentBlogPosts = (count: number = 3): BlogPost[] => {
  return [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, count);
};

export const getFeaturedBlogPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostsByCategory = (categoryId: string): BlogPost[] => {
  return blogPosts.filter(post => {
    const normCat = post.category.toLowerCase().replace(/\s+/g, '-');
    return normCat === categoryId.toLowerCase();
  });
};

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => {
    return post.tags.some(t => t.toLowerCase().replace(/\s+/g, '-') === tag.toLowerCase());
  });
};
