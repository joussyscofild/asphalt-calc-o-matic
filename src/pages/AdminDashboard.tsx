
import React from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import DashboardTabs from '@/components/admin/dashboard/DashboardTabs';
import { useAdminDashboard } from '@/hooks/use-admin-dashboard';

const AdminDashboard = () => {
  const { handleSaveBlogPost, handleCancelBlogPost, handleLogout } = useAdminDashboard();
  
  return (
    <div className="container-custom py-8">
      <DashboardHeader handleLogout={handleLogout} />
      <DashboardTabs 
        handleSaveBlogPost={handleSaveBlogPost} 
        handleCancelBlogPost={handleCancelBlogPost} 
      />
    </div>
  );
};

export default AdminDashboard;
