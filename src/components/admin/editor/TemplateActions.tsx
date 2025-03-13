
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface TemplateActionsProps {
  insertTemplate: (template: string) => void;
  templates: Array<{ name: string; content: string }>;
  clearFormatting: () => void;
}

export const TemplateActions: React.FC<TemplateActionsProps> = ({ 
  insertTemplate, 
  templates,
  clearFormatting 
}) => {
  return (
    <div className="flex items-center space-x-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            <FileText size={14} className="mr-1" />
            Templates
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <Tabs defaultValue="blog">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
            </TabsList>
            <TabsContent value="blog" className="p-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto py-2 mb-1"
                onClick={() => {
                  insertTemplate(templates[0].content);
                  toast({
                    title: "Template applied",
                    description: "Blog post template has been inserted.",
                  });
                }}
              >
                <div>
                  <div className="font-medium">Blog Post Template</div>
                  <div className="text-xs text-muted-foreground">Standard blog structure with headings</div>
                </div>
              </Button>
            </TabsContent>
            <TabsContent value="calculator" className="p-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => {
                  insertTemplate(templates[1].content);
                  toast({
                    title: "Template applied",
                    description: "Calculator guide template has been inserted.",
                  });
                }}
              >
                <div>
                  <div className="font-medium">Calculator Guide</div>
                  <div className="text-xs text-muted-foreground">How-to guide for calculator usage</div>
                </div>
              </Button>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={clearFormatting}
        className="h-8 text-xs"
      >
        <Trash2 size={14} className="mr-1" />
        Clear Format
      </Button>
    </div>
  );
};
