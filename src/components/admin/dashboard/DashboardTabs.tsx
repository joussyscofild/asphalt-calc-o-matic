
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import SiteCustomizer from "@/components/admin/SiteCustomizer";
import PagesManager from "@/components/admin/PagesManager";
import CalculatorManager from "@/components/admin/CalculatorManager";
import FooterManager from "@/components/admin/FooterManager";
import { FileText, Calculator as CalculatorIcon, LayoutDashboard, BookOpen, Link as LinkIcon } from "lucide-react";
import { BlogPost } from '@/utils/blogPosts';
import DashboardOverview from './DashboardOverview';

interface DashboardTabsProps {
  handleSaveBlogPost: (post: BlogPost) => void;
  handleCancelBlogPost: () => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  handleSaveBlogPost,
  handleCancelBlogPost
}) => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-6 mb-8">
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
        <TabsTrigger value="footer" className="flex items-center gap-1">
          <LinkIcon size={14} />
          Footer Links
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
            <DashboardOverview />
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
      
      <TabsContent value="footer">
        <Card>
          <CardHeader>
            <CardTitle>Footer Links Management</CardTitle>
            <CardDescription>
              Create, edit and manage your website footer links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FooterManager />
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
  );
};

export default DashboardTabs;
