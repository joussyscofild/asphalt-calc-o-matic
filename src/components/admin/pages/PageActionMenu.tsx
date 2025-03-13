
import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2, Copy, Eye } from 'lucide-react';
import { Page } from './types';

interface PageActionMenuProps {
  page: Page;
  onEdit: (page: Page) => void;
  onDelete: (id: string) => void;
  onDuplicate: (page: Page) => void;
  onStatusToggle: (id: string) => void;
}

const PageActionMenu: React.FC<PageActionMenuProps> = ({ 
  page, 
  onEdit, 
  onDelete, 
  onDuplicate,
  onStatusToggle
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(page)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDuplicate(page)}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => onStatusToggle(page.id)}
          className="text-amber-600"
        >
          {page.status === 'published' ? 'Set as Draft' : 'Publish'}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDelete(page.id)}
          className="text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PageActionMenu;
