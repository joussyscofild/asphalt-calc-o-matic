
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag as TagIcon, Folder } from 'lucide-react';
import { BlogPost, getBlogPostsByTag, getBlogPostsByCategory } from '@/utils/blogPosts';
import BlogPostCard from '@/components/blog/BlogPostCard';

const BlogTagResults = () => {
  const { tag, category } = useParams<{ tag?: string; category?: string }>();
  const location = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const isTagPage = location.pathname.includes('/blog/tag/');
  const displayLabel = isTagPage ? tag : category;
  const normalizedLabel = displayLabel?.replace(/-/g, ' ');
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate a database fetch with small delay
    setTimeout(() => {
      let results: BlogPost[] = [];
      
      if (isTagPage && tag) {
        results = getBlogPostsByTag(tag);
        console.log(`Found ${results.length} posts with tag: ${tag}`);
      } else if (category) {
        results = getBlogPostsByCategory(category);
        console.log(`Found ${results.length} posts in category: ${category}`);
      }
      
      setPosts(results);
      setIsLoading(false);
    }, 300);
  }, [tag, category, isTagPage]);
  
  return (
    <div className="py-8 bg-gray-50">
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
            <BreadcrumbLink>
              {isTagPage ? 'Tag' : 'Category'}: {normalizedLabel}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-6" 
          asChild
        >
          <Link to="/blog">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
        </Button>
        
        <div className="flex items-center mb-8">
          {isTagPage ? (
            <div className="inline-flex items-center bg-gray-100 text-asphalt px-4 py-2 rounded-full">
              <TagIcon size={18} className="mr-2 text-safety" />
              <span className="font-medium">{normalizedLabel}</span>
            </div>
          ) : (
            <div className="inline-flex items-center bg-gray-100 text-asphalt px-4 py-2 rounded-full">
              <Folder size={18} className="mr-2 text-safety" />
              <span className="font-medium">{normalizedLabel}</span>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-asphalt mb-2">
            {isTagPage ? `Posts tagged "${normalizedLabel}"` : `Posts in "${normalizedLabel}"`}
          </h1>
          <p className="text-concrete-dark">
            {isLoading ? 'Loading articles...' : `Showing ${posts.length} article${posts.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl h-96 shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            {isTagPage ? <TagIcon size={48} /> : <Folder size={48} />}
            <h2 className="text-2xl font-bold text-asphalt mt-4 mb-2">No posts found</h2>
            <p className="text-concrete-dark mb-8">
              {isTagPage 
                ? `We couldn't find any posts with the tag "${normalizedLabel}".`
                : `We couldn't find any posts in the category "${normalizedLabel}".`
              }
            </p>
            <Button asChild>
              <Link to="/blog">Browse All Articles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTagResults;
