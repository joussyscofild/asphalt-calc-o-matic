
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, Check, Search, Globe, Tag } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface SEOHelperProps {
  title: string;
  description: string;
  keywords: string;
  onUpdate: (data: {title: string, description: string, keywords: string}) => void;
}

const SEOHelper: React.FC<SEOHelperProps> = ({ 
  title: initialTitle = '', 
  description: initialDescription = '', 
  keywords: initialKeywords = '',
  onUpdate 
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [keywords, setKeywords] = useState(initialKeywords);
  
  // SEO score calculation
  const calculateTitleScore = () => {
    if (!title) return 0;
    // Title should be 50-60 characters
    const length = title.length;
    if (length < 20) return 30;
    if (length > 70) return 60;
    if (length >= 50 && length <= 60) return 100;
    return 80;
  };

  const calculateDescriptionScore = () => {
    if (!description) return 0;
    // Description should be 150-160 characters
    const length = description.length;
    if (length < 50) return 30;
    if (length > 170) return 60;
    if (length >= 150 && length <= 160) return 100;
    return 80;
  };

  const calculateKeywordsScore = () => {
    if (!keywords) return 0;
    const keywordArray = keywords.split(',').map(k => k.trim());
    // Good to have 3-5 keywords
    if (keywordArray.length < 2) return 40;
    if (keywordArray.length > 8) return 60;
    if (keywordArray.length >= 3 && keywordArray.length <= 5) return 100;
    return 80;
  };

  const overallScore = Math.round(
    (calculateTitleScore() + calculateDescriptionScore() + calculateKeywordsScore()) / 3
  );

  const getScoreColor = (score: number) => {
    if (score < 50) return "bg-red-500";
    if (score < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleApplySEO = () => {
    onUpdate({ title, description, keywords });
    toast({
      title: "SEO data applied",
      description: "Your SEO metadata has been updated successfully.",
    });
  };

  const getSEOTips = () => {
    const tips = [];
    
    if (calculateTitleScore() < 80)
      tips.push("Title should be 50-60 characters long for optimal display in search results.");
    
    if (calculateDescriptionScore() < 80)
      tips.push("Description should be 150-160 characters long to avoid truncation in search results.");
    
    if (calculateKeywordsScore() < 80)
      tips.push("Include 3-5 relevant keywords separated by commas.");
    
    if (title && !title.toLowerCase().includes(keywords.split(',')[0]?.toLowerCase()))
      tips.push("Consider including your primary keyword in the title.");
    
    if (description && !description.toLowerCase().includes(keywords.split(',')[0]?.toLowerCase()))
      tips.push("Consider including your primary keyword in the description.");
    
    return tips;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search size={18} />
          SEO Helper
        </CardTitle>
        <CardDescription>
          Optimize your content for search engines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">SEO Score</span>
            <Badge 
              variant={overallScore > 79 ? "default" : overallScore > 49 ? "outline" : "destructive"}
              className="flex items-center gap-1"
            >
              {overallScore > 79 ? <Check size={12} /> : <AlertCircle size={12} />}
              {overallScore}/100
            </Badge>
          </div>
          <Progress value={overallScore} className={getScoreColor(overallScore)} />
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="seo-title" className="text-sm font-medium flex items-center gap-2">
              <Globe size={14} /> Title 
              <Badge variant="outline" className="ml-2">
                {title.length}/60
              </Badge>
            </label>
            <Input 
              id="seo-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title"
              className={title.length > 60 ? "border-yellow-500" : ""}
            />
          </div>
          
          <div>
            <label htmlFor="seo-description" className="text-sm font-medium flex items-center gap-2">
              <TrendingUp size={14} /> Meta Description
              <Badge variant="outline" className="ml-2">
                {description.length}/160
              </Badge>
            </label>
            <Textarea 
              id="seo-description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter meta description"
              className={description.length > 160 ? "border-yellow-500" : ""}
            />
          </div>
          
          <div>
            <label htmlFor="seo-keywords" className="text-sm font-medium flex items-center gap-2">
              <Tag size={14} /> Keywords (comma separated)
            </label>
            <Input 
              id="seo-keywords" 
              value={keywords} 
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>

        {getSEOTips().length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 space-y-2">
            <h4 className="text-sm font-medium text-amber-800 flex items-center gap-2">
              <AlertCircle size={14} />
              SEO Improvement Tips
            </h4>
            <ul className="text-xs text-amber-800 space-y-1 list-disc pl-5">
              {getSEOTips().map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <Button 
          onClick={handleApplySEO} 
          variant="default" 
          className="w-full mt-2"
        >
          Apply SEO Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default SEOHelper;
