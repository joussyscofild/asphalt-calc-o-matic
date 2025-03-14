
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Tag } from 'lucide-react';

export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
}

const BlogPost = ({ id, title, excerpt, author, date, category, tags, imageUrl, featured }: BlogPostProps) => {
  return (
    <article className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${featured ? 'border-l-4 border-safety' : ''}`}>
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <Link 
            to={`/blog/category/${category.toLowerCase().replace(' ', '-')}`}
            className="text-xs font-semibold uppercase text-concrete hover:text-asphalt dark:hover:text-white transition-colors"
          >
            {category}
          </Link>
          
          {featured && (
            <span className="bg-safety/10 text-safety-dark text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <Link to={`/blog/${id}`}>
          <h3 className="text-xl font-bold text-asphalt dark:text-white mb-3 hover:text-safety-dark dark:hover:text-safety-light transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-concrete-dark dark:text-gray-300 mb-4">{excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Link 
              key={tag} 
              to={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
              className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-concrete-dark dark:text-gray-300 px-2 py-1 rounded-full hover:bg-safety/10 hover:text-safety-dark dark:hover:bg-safety/20 dark:hover:text-safety-light transition-colors"
            >
              <Tag size={12} className="mr-1" />
              {tag}
            </Link>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-sm text-concrete dark:text-gray-400">
            <User size={14} className="mr-1" />
            <span>{author}</span>
            <span className="mx-2">•</span>
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          
          <Link 
            to={`/blog/${id}`}
            className="inline-flex items-center text-sm font-medium text-asphalt dark:text-white hover:text-safety-dark dark:hover:text-safety-light transition-colors"
          >
            Read More
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
