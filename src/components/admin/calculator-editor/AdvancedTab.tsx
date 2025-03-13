
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from './types';

interface AdvancedTabProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRelatedContentChange: (type: 'calculators' | 'articles', value: string) => void;
}

const AdvancedTab: React.FC<AdvancedTabProps> = ({
  formData,
  handleInputChange,
  handleRelatedContentChange
}) => {
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedTab;
