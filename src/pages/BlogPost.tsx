
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogPostById } from '../utils/blogPosts';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calendar, Clock, Tag, User } from 'lucide-react';

const BlogPost = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState(getBlogPostById(id));
  
  // Refresh post data when component mounts or id changes
  useEffect(() => {
    // Ensure we're getting the latest version of the post
    const currentPost = getBlogPostById(id);
    console.log("BlogPost page loading post:", id, "Content length:", currentPost?.content?.length || 0);
    setPost(currentPost);
  }, [id]);

  if (!post) {
    return (
      <div className="container-custom py-20 text-center">
        <BookOpen size={48} className="mx-auto text-concrete mb-4" />
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-6">The article you're looking for doesn't exist or may have been moved.</p>
        <Link to="/blog" className="btn-primary">
          Browse All Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Breadcrumb className="mb-8">
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
          <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {post.imageUrl && (
              <div className="w-full h-72 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-asphalt mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-concrete-dark mb-6 gap-4">
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span className="text-sm">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Tag size={16} className="mr-1" />
                  <span className="text-sm">{post.category}</span>
                </div>
                {post.status === 'draft' && (
                  <div className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                    Draft
                  </div>
                )}
              </div>

              <div 
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-8 pt-6 border-t border-gray-100">
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
          <div className="sticky top-20">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">About the Author</h2>
              <div className="flex items-center mb-4">
                {post.authorAvatar ? (
                  <img 
                    src={post.authorAvatar} 
                    alt={post.author} 
                    className="w-16 h-16 rounded-full mr-4"
                  />
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

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
              <div className="space-y-4">
                {getBlogPostById(post.id !== 'understanding-asphalt-density' ? 'understanding-asphalt-density' : 'choosing-right-concrete-mix') && (
                  <RelatedArticleLink 
                    post={getBlogPostById(post.id !== 'understanding-asphalt-density' ? 'understanding-asphalt-density' : 'choosing-right-concrete-mix')!} 
                  />
                )}
                {getBlogPostById(post.id !== 'asphalt-vs-concrete-driveways' ? 'asphalt-vs-concrete-driveways' : 'minimizing-material-waste') && (
                  <RelatedArticleLink 
                    post={getBlogPostById(post.id !== 'asphalt-vs-concrete-driveways' ? 'asphalt-vs-concrete-driveways' : 'minimizing-material-waste')!} 
                  />
                )}
              </div>
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
      <img src={post.imageUrl} alt="" className="w-16 h-12 object-cover rounded" />
    ) : (
      <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
        <BookOpen size={18} className="text-gray-400" />
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
