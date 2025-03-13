
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import SiteCustomizer from "@/components/admin/SiteCustomizer";
import PagesManager from "@/components/admin/PagesManager";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-custom py-8">
      <div className="mb-8 flex items-center">
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
              <BlogPostEditor />
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
