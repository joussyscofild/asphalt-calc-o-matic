
import BlogPost from './BlogPost';
import { Link } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/utils/blogPosts';

interface BlogPostListProps {
  posts: BlogPostType[];
  title: string;
  description?: string;
  showViewAll?: boolean;
  isLoading?: boolean;
}

const BlogPostList = ({ posts, title, description, showViewAll = true, isLoading = false }: BlogPostListProps) => {
  return (
    <section className="py-16 dark:bg-gray-900">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="section-heading text-asphalt dark:text-white">{title}</h2>
            {description && (
              <p className="text-concrete-dark dark:text-gray-300 max-w-2xl">{description}</p>
            )}
          </div>
          
          {showViewAll && (
            <Link to="/blog" className="mt-4 md:mt-0 inline-flex items-center font-medium text-asphalt dark:text-white hover:text-safety-dark dark:hover:text-safety-light">
              View All Articles
              <ChevronRight size={18} className="ml-1" />
            </Link>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span className="dark:text-white">Loading posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-concrete-dark dark:text-gray-300">No posts available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPost 
                key={post.id} 
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                category={post.category}
                tags={post.tags}
                imageUrl={post.imageUrl}
                featured={post.featured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostList;
