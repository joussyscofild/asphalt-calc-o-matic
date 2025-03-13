
import React from 'react';
import { Button } from "@/components/ui/button";
import { Undo, Redo } from 'lucide-react';

interface HistoryActionsProps {
  formatText: (command: string, value?: string) => void;
}

export const HistoryActions: React.FC<HistoryActionsProps> = ({ formatText }) => {
  return (
    <div className="flex items-center space-x-1 mr-2 border-l pl-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('undo')}
        className="h-8 w-8 p-0"
      >
        <Undo size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('redo')}
        className="h-8 w-8 p-0"
      >
        <Redo size={16} />
      </Button>
    </div>
  );
};
