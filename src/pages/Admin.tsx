
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculators } from '../utils/calculators';
import { blogPosts } from '../utils/blogPosts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Calculator, FileText, Settings } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('calculators');
  const { toast } = useToast();

  const handleSaveItem = () => {
    toast({
      title: "Success",
      description: "Item saved successfully. This is a demo - no actual data was saved.",
      variant: "default",
    });
  };

  const handleDeleteItem = () => {
    toast({
      title: "Item deleted",
      description: "This is a demo - no actual data was deleted.",
      variant: "destructive",
    });
  };

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
            <Calculator size={16} />
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle size={16} />
                  <span>Add Calculator</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Calculator</DialogTitle>
                  <DialogDescription>
                    Create a new calculator for your users.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="calc-title">Title</Label>
                    <Input id="calc-title" placeholder="Enter calculator title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="calc-description">Description</Label>
                    <Textarea id="calc-description" placeholder="Enter calculator description" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="calc-category">Category</Label>
                    <Input id="calc-category" placeholder="Enter calculator category" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveItem}>Save Calculator</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-concrete-dark uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calculators.map((calculator) => (
                  <tr key={calculator.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-asphalt">{calculator.title}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleDeleteItem}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="blog" className="mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-asphalt">Manage Blog Posts</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle size={16} />
                  <span>Add Blog Post</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Blog Post</DialogTitle>
                  <DialogDescription>
                    Create a new blog post for your website.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input id="post-title" placeholder="Enter post title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="post-excerpt">Excerpt</Label>
                    <Textarea id="post-excerpt" placeholder="Enter post excerpt" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="post-content">Content</Label>
                    <Textarea id="post-content" placeholder="Enter post content" className="min-h-[200px]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="post-category">Category</Label>
                      <Input id="post-category" placeholder="Enter category" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="post-tags">Tags (comma separated)</Label>
                      <Input id="post-tags" placeholder="tag1, tag2, tag3" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveItem}>Save Post</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                {blogPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {post.imageUrl && (
                          <img className="h-10 w-10 rounded-full object-cover mr-3" src={post.imageUrl} alt="" />
                        )}
                        <div className="text-sm font-medium text-asphalt">{post.title}</div>
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
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleDeleteItem}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
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
              <Button onClick={handleSaveItem}>Save Settings</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
