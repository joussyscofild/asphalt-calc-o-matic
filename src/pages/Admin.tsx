
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculators, Calculator } from '../utils/calculators';
import { blogPosts, BlogPost } from '../utils/blogPosts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Calculator as CalcIcon, FileText, Settings, Search } from 'lucide-react';
import CalculatorEditor from '../components/admin/CalculatorEditor';
import BlogPostEditor from '../components/admin/BlogPostEditor';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('calculators');
  const { toast } = useToast();
  const [calculatorsList, setCalculatorsList] = useState([...calculators]);
  const [blogPostsList, setBlogPostsList] = useState([...blogPosts]);
  
  // Editor states
  const [showCalculatorEditor, setShowCalculatorEditor] = useState(false);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingCalculator, setEditingCalculator] = useState<Calculator | undefined>(undefined);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | undefined>(undefined);
  
  // Search states
  const [calculatorSearch, setCalculatorSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');

  // Filter calculators based on search
  const filteredCalculators = calculatorsList.filter(calc => 
    calc.title.toLowerCase().includes(calculatorSearch.toLowerCase()) ||
    calc.description.toLowerCase().includes(calculatorSearch.toLowerCase()) ||
    calc.category.toLowerCase().includes(calculatorSearch.toLowerCase())
  );

  // Filter blog posts based on search
  const filteredBlogPosts = blogPostsList.filter(post => 
    post.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
    post.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(blogSearch.toLowerCase()))
  );

  const handleEditCalculator = (calculator: Calculator) => {
    setEditingCalculator(calculator);
    setShowCalculatorEditor(true);
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setEditingBlogPost(post);
    setShowBlogEditor(true);
  };

  const handleNewCalculator = () => {
    setEditingCalculator(undefined);
    setShowCalculatorEditor(true);
  };

  const handleNewBlogPost = () => {
    setEditingBlogPost(undefined);
    setShowBlogEditor(true);
  };

  const handleSaveCalculator = (calculator: Calculator) => {
    if (editingCalculator) {
      // Update existing calculator
      setCalculatorsList(prev => 
        prev.map(calc => calc.id === calculator.id ? calculator : calc)
      );
    } else {
      // Add new calculator
      setCalculatorsList(prev => [...prev, calculator]);
    }
    setShowCalculatorEditor(false);
    setEditingCalculator(undefined);
  };

  const handleSaveBlogPost = (post: BlogPost) => {
    if (editingBlogPost) {
      // Update existing post
      setBlogPostsList(prev => 
        prev.map(p => p.id === post.id ? post : p)
      );
    } else {
      // Add new post
      setBlogPostsList(prev => [...prev, post]);
    }
    setShowBlogEditor(false);
    setEditingBlogPost(undefined);
  };

  const handleDeleteCalculator = (id: string) => {
    setCalculatorsList(prev => prev.filter(calc => calc.id !== id));
    toast({
      title: "Calculator Deleted",
      description: "The calculator has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleDeleteBlogPost = (id: string) => {
    setBlogPostsList(prev => prev.filter(post => post.id !== id));
    toast({
      title: "Blog Post Deleted",
      description: "The blog post has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully saved.",
    });
  };

  // Render the main admin panel
  if (showCalculatorEditor) {
    return (
      <div className="container-custom py-12">
        <CalculatorEditor 
          calculator={editingCalculator}
          onSave={handleSaveCalculator}
          onCancel={() => {
            setShowCalculatorEditor(false);
            setEditingCalculator(undefined);
          }}
        />
      </div>
    );
  }

  if (showBlogEditor) {
    return (
      <div className="container-custom py-12">
        <BlogPostEditor 
          post={editingBlogPost}
          onSave={handleSaveBlogPost}
          onCancel={() => {
            setShowBlogEditor(false);
            setEditingBlogPost(undefined);
          }}
        />
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
          <BreadcrumbLink>Admin Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-asphalt mb-2">Admin Dashboard</h1>
        <p className="text-concrete-dark">Manage your calculators, blog posts, and site settings.</p>
      </div>

      <Tabs defaultValue="calculators" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="calculators" className="flex items-center gap-2">
            <CalcIcon size={16} />
            <span>Calculators</span>
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText size={16} />
            <span>Blog Posts</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculators" className="mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-asphalt">Manage Calculators</h2>
            <Button className="flex items-center gap-2" onClick={handleNewCalculator}>
              <PlusCircle size={16} />
              <span>Add Calculator</span>
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-concrete" size={18} />
            <Input
              type="text"
              placeholder="Search calculators..."
              value={calculatorSearch}
              onChange={(e) => setCalculatorSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Fields</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCalculators.map((calculator) => (
                  <tr key={calculator.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-asphalt">{calculator.title}</div>
                      <div className="text-xs text-concrete-dark truncate max-w-xs">{calculator.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-concrete-dark">{calculator.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-concrete-dark">
                        {calculator.featured ? 
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Yes
                          </span> : 
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            No
                          </span>
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-concrete-dark">
                        {calculator.fields ? calculator.fields.length : 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditCalculator(calculator)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => handleDeleteCalculator(calculator.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCalculators.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-concrete-dark">
                      No calculators found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="blog" className="mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-asphalt">Manage Blog Posts</h2>
            <Button className="flex items-center gap-2" onClick={handleNewBlogPost}>
              <PlusCircle size={16} />
              <span>Add Blog Post</span>
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-concrete" size={18} />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {post.imageUrl && (
                          <img className="h-10 w-10 rounded-full object-cover mr-3" src={post.imageUrl} alt="" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-asphalt">{post.title}</div>
                          <div className="text-xs text-concrete-dark truncate max-w-xs">{post.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-concrete-dark">{post.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-concrete-dark">{post.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-concrete-dark">{post.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditBlogPost(post)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => handleDeleteBlogPost(post.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBlogPosts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-concrete-dark">
                      No blog posts found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-asphalt mb-6">Site Settings</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="asphaltcalculator.co" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea id="site-description" defaultValue="Professional calculators for asphalt, concrete, and construction projects." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="info@asphaltcalculator.co" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input id="google-analytics" placeholder="UA-XXXXXXXXX-X" />
              </div>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
