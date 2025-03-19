
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { FormData } from './types';
import { ExternalArticle } from '@/utils/calculatorTypes';

interface AdvancedTabProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRelatedContentChange: (type: 'calculators' | 'articles', value: string) => void;
  handleExternalArticlesChange: (articles: ExternalArticle[]) => void;
}

const AdvancedTab: React.FC<AdvancedTabProps> = ({
  formData,
  handleInputChange,
  handleRelatedContentChange,
  handleExternalArticlesChange
}) => {
  const addExternalArticle = () => {
    const currentArticles = [...(formData.externalArticles || [])];
    currentArticles.push({ title: '', url: '' });
    handleExternalArticlesChange(currentArticles);
  };

  const updateExternalArticle = (index: number, field: 'title' | 'url', value: string) => {
    const currentArticles = [...(formData.externalArticles || [])];
    currentArticles[index] = { ...currentArticles[index], [field]: value };
    handleExternalArticlesChange(currentArticles);
  };

  const removeExternalArticle = (index: number) => {
    const currentArticles = [...(formData.externalArticles || [])];
    currentArticles.splice(index, 1);
    handleExternalArticlesChange(currentArticles);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Formula</CardTitle>
          <CardDescription>
            The mathematical formula used by this calculator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Textarea 
              id="formula" 
              name="formula"
              value={formData.formula || ''} 
              onChange={handleInputChange}
              placeholder="e.g., Area = Length × Width"
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">
              This will be displayed to users for reference
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Content</CardTitle>
          <CardDescription>
            Link to other calculators and blog posts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Related Calculators (comma separated IDs)</Label>
            <Input 
              value={formData.relatedCalculators?.join(', ') || ''} 
              onChange={(e) => handleRelatedContentChange('calculators', e.target.value)}
              placeholder="calculator-id-1, calculator-id-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Related Articles (comma separated IDs)</Label>
            <Input 
              value={formData.relatedArticles?.join(', ') || ''}
              onChange={(e) => handleRelatedContentChange('articles', e.target.value)}
              placeholder="article-id-1, article-id-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>External Article Links</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addExternalArticle}
                className="text-xs flex items-center gap-1"
              >
                <Plus size={14} /> Add
              </Button>
            </div>
            
            <div className="space-y-3 mt-2">
              {formData.externalArticles?.map((article, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <Input
                      placeholder="Article Title"
                      value={article.title}
                      onChange={(e) => updateExternalArticle(index, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="https://example.com/article"
                      value={article.url}
                      onChange={(e) => updateExternalArticle(index, 'url', e.target.value)}
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeExternalArticle(index)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <X size={18} />
                  </Button>
                </div>
              ))}
              
              {!formData.externalArticles?.length && (
                <p className="text-sm text-muted-foreground">
                  No external articles added. Click "Add" to include links to relevant external resources.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedTab;
