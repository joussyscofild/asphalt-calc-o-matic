
import React from 'react';
import { Button } from "@/components/ui/button";
import { List, ListOrdered } from 'lucide-react';

interface ListActionsProps {
  formatText: (command: string, value?: string) => void;
}

export const ListActions: React.FC<ListActionsProps> = ({ formatText }) => {
  return (
    <div className="flex items-center space-x-1 mr-2 border-l pl-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('insertUnorderedList')}
        className="h-8 w-8 p-0"
      >
        <List size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => formatText('insertOrderedList')}
        className="h-8 w-8 p-0"
      >
        <ListOrdered size={16} />
      </Button>
    </div>
  );
};
