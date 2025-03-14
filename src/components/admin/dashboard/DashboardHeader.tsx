
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import PasswordChange from './PasswordChange';
import { ThemeToggle } from "@/components/ThemeToggle";

interface DashboardHeaderProps {
  handleLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ handleLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <PasswordChange />
        <Button variant="outline" onClick={handleLogout} className="flex gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
