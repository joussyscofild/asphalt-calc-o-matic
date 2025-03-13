
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
    <section className="py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">{title}</h2>
            {description && (
              <p className="text-concrete-dark max-w-2xl">{description}</p>
            )}
          </div>
          
          {showViewAll && (
            <Link to="/blog" className="mt-4 md:mt-0 inline-flex items-center font-medium text-asphalt hover:text-safety-dark">
              View All Articles
              <ChevronRight size={18} className="ml-1" />
            </Link>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Loading posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-concrete-dark">No posts available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPost key={post.id} {...post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostList;
