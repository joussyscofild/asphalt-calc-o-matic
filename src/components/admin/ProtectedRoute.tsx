
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
      setIsAuthenticated(isAdminAuthenticated);
      
      if (!isAdminAuthenticated) {
        toast({
          title: "Authentication required",
          description: "Please log in to access the admin dashboard.",
          variant: "destructive",
        });
      }
    };
    
    checkAuth();
  }, [toast]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
