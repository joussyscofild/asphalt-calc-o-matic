
import { BlogPost } from './blogPosts';

interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy?: string;
    }>>;
  };
}

const API_BASE_URL = 'https://blog.asphaltcalculator.co/wp-json/wp/v2';

/**
 * Fetches recent blog posts from the WordPress blog
 * @param count - Number of posts to fetch
 * @returns Array of blog posts
 */
export const fetchWordPressPosts = async (count: number = 3): Promise<BlogPost[]> => {
  try {
    console.log(`Fetching ${count} WordPress posts from ${API_BASE_URL}/posts`);
    
    const response = await fetch(`${API_BASE_URL}/posts?_embed=true&per_page=${count}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch WordPress posts: ${response.status}`);
    }
    
    const wpPosts: WordPressPost[] = await response.json();
    
    console.log(`Successfully fetched ${wpPosts.length} WordPress posts`);
    
    return wpPosts.map(post => {
      // Extract tags and categories from _embedded['wp:term'] if available
      const tags: string[] = [];
      let category = 'General'; // Default category
      
      if (post._embedded && post._embedded['wp:term']) {
        const terms = post._embedded['wp:term'];
        if (terms && terms.length > 0) {
          // Categories are usually in the first position of the wp:term array
          const categoryTerms = terms[0];
          if (categoryTerms && categoryTerms.length > 0) {
            category = categoryTerms[0].name;
          }
          
          // Tags are usually in the second position of the wp:term array
          const tagTerms = terms[1];
          if (tagTerms) {
            tags.push(...tagTerms.map(term => term.name));
          }
        }
      }
      
      // Get featured image URL if available
      let imageUrl = '';
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Create date object from WordPress date string
      const date = new Date(post.date);
      
      // Clean excerpt by removing HTML tags
      const cleanExcerpt = post.excerpt.rendered
        .replace(/<[^>]*>/g, '')
        .replace(/\[\&hellip;\]/g, '...')
        .trim();
      
      return {
        id: post.id.toString(),
        title: post.title.rendered,
        excerpt: cleanExcerpt,
        content: post.content.rendered,
        slug: post.slug,
        date: date,
        tags: tags,
        imageUrl: imageUrl,
        author: 'Asphalt Calculator Team', // Default author when not available
        readTime: '5 min read', // Default read time
        category: category, // Add the category
        status: 'published' as const // Add the status with correct type
      };
    });
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
};

/**
 * Opens the blog URL in a new tab
 */
export const navigateToBlog = () => {
  window.open('https://blog.asphaltcalculator.co', '_blank');
};
