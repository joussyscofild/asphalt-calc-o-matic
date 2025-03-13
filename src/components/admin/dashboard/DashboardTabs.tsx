
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import SiteCustomizer from "@/components/admin/SiteCustomizer";
import PagesManager from "@/components/admin/pages-manager";
import CalculatorManager from "@/components/admin/CalculatorManager";
import FooterManager from "@/components/admin/footer-manager";
import { FileText, Calculator as CalculatorIcon, LayoutDashboard, BookOpen, Link as LinkIcon } from "lucide-react";
import { BlogPost } from '@/utils/blogPosts';
import DashboardOverview from './DashboardOverview';
import { useLocation, useNavigate } from 'react-router-dom';

interface DashboardTabsProps {
  handleSaveBlogPost: (post: BlogPost) => void;
  handleCancelBlogPost: () => void;
  handleDeleteBlogPost?: (postId: string) => void;
  refreshTrigger?: number;
  posts?: BlogPost[];
  isLoading?: boolean;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  handleSaveBlogPost,
  handleCancelBlogPost,
  handleDeleteBlogPost,
  refreshTrigger,
  posts = [],
  isLoading = false
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tabKey, setTabKey] = useState(Date.now());
  
  // Parse tab from URL hash if present
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['dashboard', 'blog', 'calculators', 'pages', 'footer', 'appearance'].includes(hash)) {
      setActiveTab(hash);
      // Force refresh when tab changes from URL
      setTabKey(Date.now());
    }
  }, [location]);
  
  // Force refresh when refreshTrigger changes
  useEffect(() => {
    console.log("Dashboard refreshing due to refresh trigger");
    setTabKey(Date.now());
  }, [refreshTrigger]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Force refresh when tab changes
    setTabKey(Date.now());
    // Update URL hash for bookmarking/sharing
    navigate(`/admin/dashboard#${value}`, { replace: true });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
      
      <TabsContent value="dashboard" key={`dashboard-content-${tabKey}`}>
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>
              Overview of your website statistics and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardOverview key={`dashboard-overview-${tabKey}`} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="blog" key={`blog-content-${tabKey}`}>
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
              onDelete={handleDeleteBlogPost}
              key={`blog-editor-${tabKey}`}
              posts={posts}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="calculators" key={`calculators-content-${tabKey}`}>
        <Card>
          <CardHeader>
            <CardTitle>Calculator Management</CardTitle>
            <CardDescription>
              Create, edit and manage your construction calculators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalculatorManager key={`calculator-manager-${tabKey}`} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="pages" key={`pages-content-${tabKey}`}>
        <Card>
          <CardHeader>
            <CardTitle>Pages Management</CardTitle>
            <CardDescription>
              Create, edit and manage your website pages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PagesManager key={`pages-manager-${tabKey}`} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="footer" key={`footer-content-${tabKey}`}>
        <Card>
          <CardHeader>
            <CardTitle>Footer Links Management</CardTitle>
            <CardDescription>
              Create, edit and manage your website footer links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FooterManager key={`footer-manager-${tabKey}`} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="appearance" key={`appearance-content-${tabKey}`}>
        <Card>
          <CardHeader>
            <CardTitle>Site Customization</CardTitle>
            <CardDescription>
              Customize your site's logo, colors, and appearance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SiteCustomizer key={`site-customizer-${tabKey}`} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
