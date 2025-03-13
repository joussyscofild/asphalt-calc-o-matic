
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface AlignmentActionsProps {
  formatText: (command: string, value?: string) => void;
}

export const AlignmentActions: React.FC<AlignmentActionsProps> = ({ formatText }) => {
  return (
    <div className="flex items-center space-x-1 mr-2 border-l pl-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('justifyLeft')}
        className="h-8 w-8 p-0"
      >
        <AlignLeft size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('justifyCenter')}
        className="h-8 w-8 p-0"
      >
        <AlignCenter size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('justifyRight')}
        className="h-8 w-8 p-0"
      >
        <AlignRight size={16} />
      </Button>
    </div>
  );
};
