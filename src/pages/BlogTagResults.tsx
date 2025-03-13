
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag as TagIcon, Folder, Loader2 } from 'lucide-react';
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
    
    const fetchResults = async () => {
      let results: BlogPost[] = [];
      
      try {
        if (isTagPage && tag) {
          results = await getBlogPostsByTag(tag);
          console.log(`Found ${results.length} posts with tag: ${tag}`);
        } else if (category) {
          results = await getBlogPostsByCategory(category);
          console.log(`Found ${results.length} posts in category: ${category}`);
        }
        
        setPosts(results);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
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
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <div className="text-lg">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            {isTagPage ? <TagIcon size={48} className="mx-auto text-gray-400" /> : <Folder size={48} className="mx-auto text-gray-400" />}
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
