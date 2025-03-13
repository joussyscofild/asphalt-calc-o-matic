import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ChevronLeft, Tag, Clock } from 'lucide-react';
import { BlogPost as IBlogPost, getBlogPostById, getRecentBlogPosts } from '@/utils/blogPosts';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BlogPostCard from '@/components/blog/BlogPostCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) {
      navigate('/blog');
      return;
    }
    
    const loadPost = async () => {
      setLoading(true);
      try {
        const foundPost = await getBlogPostById(id);
        
        if (foundPost && foundPost.status === 'published') {
          console.log("BlogPost page loaded post:", foundPost.id, "Content length:", foundPost.content.length);
          setPost(foundPost);
          
          const recent = await getRecentBlogPosts(4);
          setRecentPosts(recent.filter(p => p.id !== id).slice(0, 3));
        } else {
          navigate('/blog');
        }
      } catch (error) {
        console.error("Error loading post:", error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };
    
    loadPost();
  }, [id, navigate]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="py-12 container-custom mt-16">
          <div className="text-center">
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mx-auto mb-4"></div>
            <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded mx-auto mb-8"></div>
            <div className="h-64 bg-gray-200 animate-pulse rounded mb-6"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded mb-3"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded mb-3"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!post) return null;
  
  return (
    <>
      <Navbar />
      <div className="py-8 bg-gray-50 mt-16">
        <div className="container-custom">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-concrete hover:text-concrete-dark mb-6">
            <ChevronLeft size={16} className="mr-1" />
            Back to all posts
          </Link>
          
          <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-12">
            {post.imageUrl && (
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <Link 
                  to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm bg-gray-100 text-concrete-dark px-3 py-1 rounded-full hover:bg-safety/10 hover:text-safety-dark transition-colors"
                >
                  {post.category}
                </Link>
                
                {post.tags.map(tag => (
                  <Link 
                    key={tag}
                    to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-sm bg-gray-100 text-concrete-dark px-3 py-1 rounded-full hover:bg-safety/10 hover:text-safety-dark transition-colors"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </Link>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-asphalt mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center text-concrete-dark mb-8 flex-wrap gap-y-2">
                <div className="flex items-center">
                  {post.authorAvatar ? (
                    <img 
                      src={post.authorAvatar} 
                      alt={post.author} 
                      className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                    />
                  ) : (
                    <User size={24} className="mr-3 p-1 bg-gray-100 rounded-full" />
                  )}
                  <span className="font-medium text-asphalt">{post.author}</span>
                </div>
                
                <span className="mx-3">•</span>
                
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{post.date}</span>
                </div>
                
                {post.readTime && (
                  <>
                    <span className="mx-3">•</span>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
          </article>
          
          {recentPosts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-asphalt">More Articles</h2>
                <Link to="/blog" className="text-sm font-medium text-concrete hover:text-concrete-dark">
                  View all posts
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map(recentPost => (
                  <BlogPostCard key={recentPost.id} post={recentPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
