
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare, BookOpen, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPost, blogCategories, getAllPublishedPosts } from '@/utils/blogPosts';
import BlogPostCard from '@/components/blog/BlogPostCard';
import FeaturedPost from '@/components/blog/FeaturedPost';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Load posts when the component mounts
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const publishedPosts = await getAllPublishedPosts();
        console.log("Blog page loaded, published posts:", publishedPosts.length);
        setPosts(publishedPosts);
        setFilteredPosts(publishedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);
  
  // Filter posts when search query or category changes
  useEffect(() => {
    let result = [...posts];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(post => {
        const normCat = post.category.toLowerCase().replace(/\s+/g, '-');
        return normCat === selectedCategory.toLowerCase();
      });
    }
    
    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query) || 
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(result);
  }, [selectedCategory, searchQuery, posts]);
  
  // Split posts for layout
  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => post !== featuredPost);
  
  return (
    <div className="py-8 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-asphalt mb-2">
              Construction Blog
            </h1>
            <p className="text-concrete-dark max-w-2xl">
              The latest industry insights, tips, and expert knowledge for construction professionals.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            
            <Link to="/admin/dashboard#blog">
              <Button className="w-full sm:w-auto">
                <PenSquare size={16} className="mr-2" />
                Manage Blog
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mb-8"
        >
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            {blogCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="spinner">Loading...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-asphalt mb-2">No Posts Found</h2>
            <p className="text-concrete-dark max-w-md mx-auto mb-8">
              {searchQuery 
                ? `No posts matching "${searchQuery}" in ${selectedCategory === 'all' ? 'any category' : 'this category'}.` 
                : 'There are no posts in this category yet.'}
            </p>
            {searchQuery && (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
                className="mx-auto"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {featuredPost && <FeaturedPost post={featuredPost} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
