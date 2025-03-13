
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Calculator as CalculatorIcon, FileText } from "lucide-react";

const DashboardOverview: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default DashboardOverview;
