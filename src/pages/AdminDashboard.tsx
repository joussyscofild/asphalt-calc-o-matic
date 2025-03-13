
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import SiteCustomizer from "@/components/admin/SiteCustomizer";
import PagesManager from "@/components/admin/PagesManager";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from '@/utils/blogPosts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handler for saving blog posts
  const handleSaveBlogPost = (post: BlogPost) => {
    // In a real application, you would save the post to your backend
    toast({
      title: "Blog Post Saved",
      description: `Successfully saved "${post.title}"`,
    });
  };
  
  // Handler for canceling blog post edits
  const handleCancelBlogPost = () => {
    toast({
      title: "Editing Canceled",
      description: "Changes to the blog post have been discarded.",
    });
  };

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/admin');
  };
  
  return (
    <div className="container-custom py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Site
          </Button>
          <h1 className="text-3xl font-bold">Site Administration</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="blog" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Management</CardTitle>
              <CardDescription>
                Create, edit and manage your blog posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BlogPostEditor 
                onSave={handleSaveBlogPost}
                onCancel={handleCancelBlogPost}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Pages Management</CardTitle>
              <CardDescription>
                Create, edit and manage your website pages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PagesManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Site Customization</CardTitle>
              <CardDescription>
                Customize your site's logo, colors, and appearance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SiteCustomizer />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Configure general settings for your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Settings controls coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
