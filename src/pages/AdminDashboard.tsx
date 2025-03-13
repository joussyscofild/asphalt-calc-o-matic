
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import SiteCustomizer from "@/components/admin/SiteCustomizer";
import PagesManager from "@/components/admin/PagesManager";
import CalculatorManager from "@/components/admin/CalculatorManager";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, FileText, Calculator as CalculatorIcon, LayoutDashboard, BookOpen } from "lucide-react";
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
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <LayoutDashboard size={14} />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-1">
            <BookOpen size={14} />
            Blog Posts
          </TabsTrigger>
          <TabsTrigger value="calculators" className="flex items-center gap-1">
            <CalculatorIcon size={14} />
            Calculators
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-1">
            <FileText size={14} />
            Pages
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <LayoutDashboard size={14} />
            Appearance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
                Overview of your website statistics and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Calculators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +2 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Blog Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +1 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Pages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      No change from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Blog post "Understanding Asphalt Density" edited</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <CalculatorIcon className="h-4 w-4" />
                      <span>New calculator "Retaining Wall" added</span>
                    </div>
                    <span className="text-sm text-muted-foreground">5 days ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Page "About Us" updated</span>
                    </div>
                    <span className="text-sm text-muted-foreground">1 week ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
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
        
        <TabsContent value="calculators">
          <Card>
            <CardHeader>
              <CardTitle>Calculator Management</CardTitle>
              <CardDescription>
                Create, edit and manage your construction calculators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalculatorManager />
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
