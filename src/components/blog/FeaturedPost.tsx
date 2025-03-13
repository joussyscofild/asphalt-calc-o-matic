
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Tag, Clock, Award } from 'lucide-react';
import { BlogPost } from '@/utils/blogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="order-2 lg:order-1 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-safety text-white hover:bg-safety-dark">
                <Award size={14} className="mr-1" />
                Featured Article
              </Badge>
              <Badge variant="outline">
                {post.category}
              </Badge>
            </div>
            
            <Link to={`/blog/${post.id}`} className="group">
              <h2 className="text-2xl lg:text-3xl font-bold text-asphalt mb-4 group-hover:text-safety-dark transition-colors">
                {post.title}
              </h2>
            </Link>
            
            <p className="text-concrete-dark mb-6 text-lg">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link 
                  key={tag} 
                  to={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center text-sm bg-gray-100 text-concrete-dark px-3 py-1 rounded-full hover:bg-safety/10 hover:text-safety-dark transition-colors"
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center text-concrete-dark">
              {post.authorAvatar ? (
                <img 
                  src={post.authorAvatar} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                />
              ) : (
                <User size={24} className="mr-3 p-1 bg-gray-100 rounded-full" />
              )}
              <div>
                <div className="font-medium text-asphalt">{post.author}</div>
                <div className="flex items-center text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                  {post.readTime && (
                    <>
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <Button asChild>
              <Link to={`/blog/${post.id}`} className="flex items-center">
                Read Article
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 aspect-video lg:aspect-auto">
          {post.imageUrl ? (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <Award size={48} className="text-gray-300" />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;
