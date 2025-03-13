
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Calculator as CalculatorIcon, FileText, Loader2 } from "lucide-react";
import { useDashboardOverview } from '@/hooks/use-dashboard-overview';

const DashboardOverview: React.FC = () => {
  const { calculators, blogPosts, pages, recentActivity, isLoading } = useDashboardOverview();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  const getChangeText = (change: number) => {
    if (change === 0) return "No change from last month";
    return `${change > 0 ? '+' : ''}${change} from last month`;
  };

  const getActivityTimeText = (daysAgo: number) => {
    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "Yesterday";
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 14) return "1 week ago";
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
    return `${Math.floor(daysAgo / 30)} month${Math.floor(daysAgo / 30) > 1 ? 's' : ''} ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <BookOpen className="h-4 w-4" />;
      case 'calculator':
        return <CalculatorIcon className="h-4 w-4" />;
      case 'page':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

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
            <div className="text-2xl font-bold">{calculators.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {getChangeText(calculators.change)}
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
            <div className="text-2xl font-bold">{blogPosts.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {getChangeText(blogPosts.change)}
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
            <div className="text-2xl font-bold">{pages.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {getChangeText(pages.change)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        {recentActivity.length > 0 ? (
          <div className="space-y-2">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                <div className="flex items-center gap-2">
                  {getActivityIcon(item.type)}
                  <span>
                    {item.type === 'blog' && 'Blog post '}
                    {item.type === 'calculator' && 'Calculator '}
                    {item.type === 'page' && 'Page '}
                    "{item.title}" {item.action}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{getActivityTimeText(item.daysAgo)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-secondary/50 rounded-md text-center">
            <p className="text-muted-foreground">No recent activity found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardOverview;
