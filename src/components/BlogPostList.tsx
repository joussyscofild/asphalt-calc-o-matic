
import BlogPost, { BlogPostProps } from './BlogPost';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BlogPostListProps {
  posts: BlogPostProps[];
  title: string;
  description?: string;
  showViewAll?: boolean;
}

const BlogPostList = ({ posts, title, description, showViewAll = true }: BlogPostListProps) => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostList;
