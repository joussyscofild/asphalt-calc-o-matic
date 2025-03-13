
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogCategories, blogPosts, BlogPost } from '../utils/blogPosts';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                          post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="container-custom py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Blog</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-asphalt mb-4">Construction & Paving Insights</h1>
        <p className="text-concrete-dark max-w-3xl">
          Expert guides, tips, and industry knowledge to help you plan and execute your paving and construction projects with confidence.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-concrete" size={18} />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              {blogCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {/* No specific content needed here as we're filtering the main list */}
            </TabsContent>
            {blogCategories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                {/* No specific content needed here as we're filtering the main list */}
              </TabsContent>
            ))}
          </Tabs>

          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-asphalt mb-4">Featured Articles</h2>
              <div className="grid grid-cols-1 gap-6">
                {featuredPosts.map(post => (
                  <FeaturedArticleCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {regularPosts.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold text-asphalt mb-4">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularPosts.map(post => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-concrete-dark">No articles found matching your criteria.</p>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map(tag => (
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
      </div>
    </div>
  );
};

interface ArticleCardProps {
  post: BlogPost;
}

const ArticleCard = ({ post }: ArticleCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {post.imageUrl && (
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <div className="text-xs text-concrete-dark mb-2 flex items-center justify-between">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-lg font-semibold text-asphalt mb-2">{post.title}</h3>
        <p className="text-concrete-dark text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {post.authorAvatar && (
              <img 
                src={post.authorAvatar} 
                alt={post.author} 
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <span className="text-xs text-concrete-dark">{post.author}</span>
          </div>
          <Link 
            to={`/blog/${post.id}`}
            className="text-sm font-medium text-asphalt hover:text-safety-dark"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedArticleCard = ({ post }: ArticleCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {post.imageUrl && (
          <div className="md:col-span-1">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={`p-6 ${post.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="px-3 py-1 bg-safety-light/20 text-safety-dark text-xs rounded-full">Featured</span>
            <span className="text-xs text-concrete-dark">{post.readTime}</span>
          </div>
          <h3 className="text-xl font-semibold text-asphalt mb-3">{post.title}</h3>
          <p className="text-concrete-dark mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {post.authorAvatar && (
                <img 
                  src={post.authorAvatar} 
                  alt={post.author} 
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div>
                <span className="text-sm font-medium block">{post.author}</span>
                <span className="text-xs text-concrete-dark">{post.date}</span>
              </div>
            </div>
            <Link 
              to={`/blog/${post.id}`}
              className="text-sm font-medium text-asphalt hover:text-safety-dark"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
