
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Tag } from 'lucide-react';
import { BlogPost } from '@/utils/blogPosts';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col">
      {post.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="text-xs font-medium text-concrete">
            {post.category}
          </Badge>
          
          {post.featured && (
            <Badge className="bg-safety/10 text-safety-dark hover:bg-safety/20">
              Featured
            </Badge>
          )}
        </div>
        
        <Link to={`/blog/${post.id}`} className="group">
          <h3 className="text-xl font-bold text-asphalt mb-3 group-hover:text-safety-dark transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-concrete-dark mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link 
              key={tag} 
              to={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
              className="inline-flex items-center text-xs bg-gray-100 text-concrete-dark px-2 py-1 rounded-full hover:bg-safety/10 hover:text-safety-dark transition-colors"
            >
              <Tag size={12} className="mr-1" />
              {tag}
            </Link>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center text-sm text-concrete">
            <User size={14} className="mr-1" />
            <span className="truncate max-w-[100px]">{post.author}</span>
            <span className="mx-2">•</span>
            <Calendar size={14} className="mr-1" />
            <span>{post.date}</span>
          </div>
          
          <Link 
            to={`/blog/${post.id}`}
            className="inline-flex items-center text-sm font-medium text-asphalt hover:text-safety-dark transition-colors"
          >
            Read
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
