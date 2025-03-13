
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Tag } from 'lucide-react';
import { BlogPost } from '@/utils/blogPosts';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // Use state to potentially update the post data if it changes in localStorage
  const [currentPost, setCurrentPost] = useState<BlogPost>(post);
  
  // Check localStorage for updated post data
  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem('blogPosts');
      if (storedPosts) {
        const posts = JSON.parse(storedPosts);
        const updatedPost = posts.find((p: BlogPost) => p.id === post.id);
        if (updatedPost && updatedPost.status === 'published') {
          setCurrentPost(updatedPost);
        }
      }
    } catch (error) {
      console.error("Error loading post from localStorage:", error);
    }
  }, [post.id]);
  
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col">
      {currentPost.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={currentPost.imageUrl} 
            alt={currentPost.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="text-xs font-medium text-concrete">
            {currentPost.category}
          </Badge>
          
          {currentPost.featured && (
            <Badge className="bg-safety/10 text-safety-dark hover:bg-safety/20">
              Featured
            </Badge>
          )}
        </div>
        
        <Link to={`/blog/${currentPost.id}`} className="group">
          <h3 className="text-xl font-bold text-asphalt mb-3 group-hover:text-safety-dark transition-colors line-clamp-2">
            {currentPost.title}
          </h3>
        </Link>
        
        <p className="text-concrete-dark mb-4 line-clamp-3 flex-grow">
          {currentPost.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {currentPost.tags.slice(0, 3).map((tag) => (
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
            <span className="truncate max-w-[100px]">{currentPost.author}</span>
            <span className="mx-2">•</span>
            <Calendar size={14} className="mr-1" />
            <span>{currentPost.date}</span>
          </div>
          
          <Link 
            to={`/blog/${currentPost.id}`}
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
