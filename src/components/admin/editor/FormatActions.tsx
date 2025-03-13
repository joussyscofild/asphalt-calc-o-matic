
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline } from 'lucide-react';

interface FormatActionsProps {
  formatText: (command: string, value?: string) => void;
}

export const FormatActions: React.FC<FormatActionsProps> = ({ formatText }) => {
  return (
    <div className="flex items-center space-x-1 mr-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('bold')}
        className="h-8 w-8 p-0"
      >
        <Bold size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('italic')}
        className="h-8 w-8 p-0"
      >
        <Italic size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('underline')}
        className="h-8 w-8 p-0"
      >
        <Underline size={16} />
      </Button>
    </div>
  );
};
