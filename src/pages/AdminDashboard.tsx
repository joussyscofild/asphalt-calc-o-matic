
import React from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import DashboardTabs from '@/components/admin/dashboard/DashboardTabs';
import { useAdminDashboard } from '@/hooks/use-admin-dashboard';

const AdminDashboard = () => {
  const { 
    handleSaveBlogPost, 
    handleCancelBlogPost, 
    handleDeleteBlogPost,
    handleLogout,
    refreshTrigger,
    posts,
    isLoading
  } = useAdminDashboard();
  
  return (
    <div className="container-custom py-8">
      <DashboardHeader handleLogout={handleLogout} />
      <DashboardTabs 
        handleSaveBlogPost={handleSaveBlogPost} 
        handleCancelBlogPost={handleCancelBlogPost}
        handleDeleteBlogPost={handleDeleteBlogPost}
        refreshTrigger={refreshTrigger}
        posts={posts}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminDashboard;
