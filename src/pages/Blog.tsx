
import React, { useState, useEffect } from 'react';
import BlogPostList from '@/components/BlogPostList';
import { blogPosts, blogCategories, getBlogPostsByCategory } from '@/utils/blogPosts';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [posts, setPosts] = useState(blogPosts.filter(post => post.status !== 'draft'));
  const navigate = useNavigate();
  
  // Refresh the posts array when the component mounts or when navigating to this page
  useEffect(() => {
    console.log("Blog page refreshing posts, count:", blogPosts.length);
    
    const visiblePosts = blogPosts.filter(post => post.status !== 'draft');
    setPosts(visiblePosts);
  }, [navigate]);
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : getBlogPostsByCategory(selectedCategory).filter(post => post.status !== 'draft');

  return (
    <div className="py-8">
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
          
          <Link to="/admin/dashboard">
            <Button className="mt-4 md:mt-0">
              <PenSquare size={16} className="mr-2" />
              Manage Blog
            </Button>
          </Link>
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
        
        <BlogPostList 
          posts={filteredPosts} 
          title="" 
          showViewAll={false} 
        />
      </div>
    </div>
  );
};

export default Blog;
