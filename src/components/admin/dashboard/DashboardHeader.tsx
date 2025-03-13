
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  handleLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ handleLogout }) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default DashboardHeader;
