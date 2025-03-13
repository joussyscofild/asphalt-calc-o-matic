
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, parseISO } from "date-fns";

export type ActivityItem = {
  type: 'blog' | 'calculator' | 'page';
  title: string;
  action: string;
  timestamp: string;
  daysAgo: number;
};

export type DashboardStats = {
  calculators: {
    total: number;
    change: number;
  };
  blogPosts: {
    total: number;
    change: number;
  };
  pages: {
    total: number;
    change: number;
  };
  recentActivity: ActivityItem[];
  isLoading: boolean;
};

export const useDashboardOverview = (): DashboardStats => {
  const [stats, setStats] = useState<DashboardStats>({
    calculators: { total: 0, change: 0 },
    blogPosts: { total: 0, change: 0 },
    pages: { total: 0, change: 0 },
    recentActivity: [],
    isLoading: true
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Calculate date for "last month" comparison
        const oneMonthAgo = subDays(new Date(), 30);
        const oneMonthAgoStr = oneMonthAgo.toISOString();

        // 1. Fetch calculator data
        const { data: calculatorsData, error: calculatorsError } = await supabase
          .from('calculators')
          .select('id, created_at')
          .order('created_at', { ascending: false });

        if (calculatorsError) {
          console.error('Error fetching calculators:', calculatorsError);
          throw calculatorsError;
        }

        // Calculate new calculators from last month
        const newCalculators = calculatorsData?.filter(
          calc => calc.created_at && new Date(calc.created_at) > oneMonthAgo
        ).length || 0;

        // 2. Fetch blog posts data
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts')
          .select('id, title, created_at, updated_at')
          .order('updated_at', { ascending: false });

        if (postsError) {
          console.error('Error fetching blog posts:', postsError);
          throw postsError;
        }

        // Calculate new blog posts from last month
        const newPosts = postsData?.filter(
          post => post.created_at && new Date(post.created_at) > oneMonthAgo
        ).length || 0;

        // 3. Fetch custom pages data
        const { data: pagesData, error: pagesError } = await supabase
          .from('custom_pages')
          .select('id, title, created_at, last_modified')
          .order('last_modified', { ascending: false });

        if (pagesError) {
          console.error('Error fetching pages:', pagesError);
          throw pagesError;
        }

        // Calculate new pages from last month
        const newPages = pagesData?.filter(
          page => page.created_at && new Date(page.created_at) > oneMonthAgo
        ).length || 0;

        // 4. Generate recent activity from the most recent updates across all content types
        const activity: ActivityItem[] = [];

        // Add blog post activity
        if (postsData) {
          for (const post of postsData.slice(0, 3)) {
            const date = post.updated_at || post.created_at;
            if (date) {
              const timestamp = parseISO(date);
              const daysAgo = Math.floor((new Date().getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24));

              activity.push({
                type: 'blog',
                title: post.title,
                action: 'edited',
                timestamp: date,
                daysAgo
              });
            }
          }
        }

        // Add calculator activity
        if (calculatorsData) {
          for (const calc of calculatorsData.slice(0, 3)) {
            try {
              const { data: calcInfo, error } = await supabase
                .from('calculators')
                .select('title')
                .eq('id', calc.id)
                .single();

              if (error) {
                console.error(`Error fetching calculator info for id ${calc.id}:`, error);
                continue;
              }

              if (calc.created_at && calcInfo?.title) {
                const timestamp = parseISO(calc.created_at);
                const daysAgo = Math.floor((new Date().getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24));

                activity.push({
                  type: 'calculator',
                  title: calcInfo.title,
                  action: 'added',
                  timestamp: calc.created_at,
                  daysAgo
                });
              }
            } catch (error) {
              console.error(`Error processing calculator activity for id ${calc.id}:`, error);
            }
          }
        }

        // Add page activity
        if (pagesData) {
          for (const page of pagesData.slice(0, 3)) {
            const date = page.last_modified || page.created_at;
            if (date) {
              const timestamp = parseISO(date);
              const daysAgo = Math.floor((new Date().getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24));

              activity.push({
                type: 'page',
                title: page.title,
                action: 'updated',
                timestamp: date,
                daysAgo
              });
            }
          }
        }

        // Sort activity by timestamp (most recent first)
        activity.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        // Limit to 5 most recent activities
        const recentActivity = activity.slice(0, 5);

        // Update state with all the collected data
        setStats({
          calculators: {
            total: calculatorsData?.length || 0,
            change: newCalculators
          },
          blogPosts: {
            total: postsData?.length || 0,
            change: newPosts
          },
          pages: {
            total: pagesData?.length || 0,
            change: newPages
          },
          recentActivity,
          isLoading: false
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  return stats;
};
