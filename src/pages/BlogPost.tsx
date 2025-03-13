
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogPostById, getRecentBlogPosts, BlogPost as BlogPostType } from '@/utils/blogPosts';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calendar, Clock, Tag, User, Share2, Heart, Bookmark, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  
  // Load post data
  useEffect(() => {
    setIsLoading(true);
    // Simulate a database fetch with a small delay
    const timer = setTimeout(() => {
      const currentPost = getBlogPostById(id);
      
      if (currentPost) {
        console.log("BlogPost page loaded post:", id, "Content length:", currentPost.content.length);
        
        // Make sure the post is either published or draft
        if (currentPost.status !== 'published' && currentPost.status !== 'draft') {
          currentPost.status = 'published';
        }
        
        setPost(currentPost);
        
        // Get related posts (recent posts excluding current one)
        const recent = getRecentBlogPosts(4).filter(p => p.id !== id);
        setRelatedPosts(recent);
      }
      
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Post link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <BookOpen size={48} className="text-gray-300 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-48 mb-2.5"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-custom py-20 text-center">
        <BookOpen size={48} className="mx-auto text-concrete mb-4" />
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-6">The article you're looking for doesn't exist or may have been moved.</p>
        <Link to="/blog">
          <Button>
            Browse All Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/blog">Blog</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{post.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Button 
          variant="outline" 
          size="sm" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {post.imageUrl && (
                <div className="w-full h-72 sm:h-96 overflow-hidden relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                  {post.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-safety text-white">
                        <Award size={14} className="mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  {post.status === 'draft' && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                        Draft
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-concrete-dark ml-auto">
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

                <h1 className="text-3xl sm:text-4xl font-bold text-asphalt mb-6">{post.title}</h1>
                
                <div className="flex items-center mb-6">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={post.authorAvatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{post.author}</span>
                </div>

                <div className="flex gap-2 mb-8">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 size={14} className="mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart size={14} className="mr-1" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark size={14} className="mr-1" />
                    Save
                  </Button>
                </div>

                <Separator className="mb-8" />

                <div 
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="my-8" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link 
                        key={tag} 
                        to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-concrete-dark transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <User size={18} className="mr-2 text-safety" />
                  About the Author
                </h2>
                <div className="flex items-center mb-4">
                  {post.authorAvatar ? (
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                      <User size={24} className="text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{post.author}</h3>
                    <p className="text-sm text-concrete-dark">Construction Specialist</p>
                  </div>
                </div>
                <p className="text-sm text-concrete-dark">
                  Expert in construction materials and techniques with over 10 years of industry experience.
                </p>
              </div>

              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <BookOpen size={18} className="mr-2 text-safety" />
                    Related Articles
                  </h2>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <RelatedArticleLink 
                        key={relatedPost.id}
                        post={relatedPost} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RelatedArticleLinkProps {
  post: {
    id: string;
    title: string;
    imageUrl?: string;
    readTime?: string;
  };
}

const RelatedArticleLink = ({ post }: RelatedArticleLinkProps) => (
  <Link to={`/blog/${post.id}`} className="flex items-center gap-3 group">
    {post.imageUrl ? (
      <img src={post.imageUrl} alt="" className="w-16 h-12 object-cover rounded-md" />
    ) : (
      <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center">
        <BookOpen size={16} className="text-gray-400" />
      </div>
    )}
    <div>
      <h3 className="text-sm font-medium text-asphalt group-hover:text-safety-dark transition-colors line-clamp-2">
        {post.title}
      </h3>
      {post.readTime && <span className="text-xs text-concrete-dark">{post.readTime}</span>}
    </div>
  </Link>
);

export default BlogPost;
