
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ExternalArticle, FormData } from './types';
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';

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
  const [articleTitle, setArticleTitle] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [articleImageUrl, setArticleImageUrl] = useState('');

  const handleAddExternalArticle = () => {
    if (!articleTitle || !articleUrl) return;

    const newArticle: ExternalArticle = {
      title: articleTitle,
      url: articleUrl,
      imageUrl: articleImageUrl || undefined
    };

    const updatedArticles = [...(formData.externalArticles || []), newArticle];
    handleExternalArticlesChange(updatedArticles);

    // Reset form
    setArticleTitle('');
    setArticleUrl('');
    setArticleImageUrl('');
  };

  const handleRemoveExternalArticle = (index: number) => {
    const updatedArticles = [...(formData.externalArticles || [])];
    updatedArticles.splice(index, 1);
    handleExternalArticlesChange(updatedArticles);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculator Formula</CardTitle>
          <CardDescription>
            The mathematical formula used in this calculator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="formula">Formula</Label>
            <Textarea 
              id="formula" 
              name="formula"
              value={formData.formula || ''} 
              onChange={handleInputChange}
              placeholder="e.g. Area = Length × Width"
              className="font-mono"
              rows={3}
            />
            <p className="text-sm text-muted-foreground">
              This formula will be displayed to users. Use plain text or basic math notation.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Content</CardTitle>
          <CardDescription>
            Connect this calculator to related calculators and articles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="relatedCalculators">Related Calculators (comma-separated IDs)</Label>
            <Input 
              id="relatedCalculators" 
              value={formData.relatedCalculators?.join(', ') || ''} 
              onChange={(e) => handleRelatedContentChange('calculators', e.target.value)}
              placeholder="calculator-1, calculator-2"
            />
            <p className="text-sm text-muted-foreground">
              Enter the IDs of related calculators, separated by commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedArticles">Related Articles (comma-separated IDs)</Label>
            <Input 
              id="relatedArticles" 
              value={formData.relatedArticles?.join(', ') || ''} 
              onChange={(e) => handleRelatedContentChange('articles', e.target.value)}
              placeholder="uuid-1, uuid-2"
            />
            <p className="text-sm text-muted-foreground">
              Enter the IDs of related blog articles, separated by commas
            </p>
          </div>

          <div className="border-t pt-4 mt-4">
            <Label className="mb-2 block">External Articles</Label>
            
            <div className="space-y-4 mb-4">
              {formData.externalArticles?.map((article, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-secondary/20 rounded-md">
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <p className="font-medium text-sm truncate">{article.title}</p>
                    <p className="text-xs text-muted-foreground truncate flex items-center">
                      <LinkIcon size={10} className="mr-1" />
                      {article.url}
                    </p>
                    {article.imageUrl && (
                      <p className="text-xs text-muted-foreground truncate">
                        Image: {article.imageUrl}
                      </p>
                    )}
                  </div>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveExternalArticle(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 border p-3 rounded-md">
              <div className="space-y-2">
                <Label htmlFor="articleTitle">Article Title</Label>
                <Input 
                  id="articleTitle" 
                  value={articleTitle} 
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="Article Title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="articleUrl">Article URL</Label>
                <Input 
                  id="articleUrl" 
                  value={articleUrl} 
                  onChange={(e) => setArticleUrl(e.target.value)}
                  placeholder="https://example.com/article"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="articleImageUrl">Article Image URL (optional)</Label>
                <Input 
                  id="articleImageUrl" 
                  value={articleImageUrl} 
                  onChange={(e) => setArticleImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <Button 
                type="button"
                onClick={handleAddExternalArticle}
                disabled={!articleTitle || !articleUrl}
                className="w-full"
              >
                <Plus size={16} className="mr-1" />
                Add External Article
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedTab;
