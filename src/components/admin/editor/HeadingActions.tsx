
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heading1, Heading2, Quote, Code } from 'lucide-react';

interface HeadingActionsProps {
  formatText: (command: string, value?: string) => void;
}

export const HeadingActions: React.FC<HeadingActionsProps> = ({ formatText }) => {
  return (
    <div className="flex items-center space-x-1 mr-2 border-l pl-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('formatBlock', '<h1>')}
        className="h-8 w-8 p-0"
      >
        <Heading1 size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('formatBlock', '<h2>')}
        className="h-8 w-8 p-0"
      >
        <Heading2 size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('formatBlock', '<blockquote>')}
        className="h-8 w-8 p-0"
      >
        <Quote size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('formatBlock', '<pre>')}
        className="h-8 w-8 p-0"
      >
        <Code size={16} />
      </Button>
    </div>
  );
};
