
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import PageActionMenu from './PageActionMenu';
import { Page } from './types';

interface PagesTableProps {
  pages: Page[];
  onEdit: (page: Page) => void;
  onDelete: (id: string) => void;
  onDuplicate: (page: Page) => void;
  onStatusToggle: (id: string) => void;
}

const PagesTable: React.FC<PagesTableProps> = ({ 
  pages, 
  onEdit, 
  onDelete, 
  onDuplicate,
  onStatusToggle
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Page Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Modified</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map((page) => (
          <TableRow key={page.id}>
            <TableCell className="font-medium">
              {page.title}
              <div className="text-sm text-muted-foreground">
                /{page.slug}
              </div>
            </TableCell>
            <TableCell>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                page.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {page.status === 'published' ? 'Published' : 'Draft'}
              </div>
            </TableCell>
            <TableCell>{page.lastModified}</TableCell>
            <TableCell className="text-right">
              <PageActionMenu 
                page={page} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                onDuplicate={onDuplicate}
                onStatusToggle={onStatusToggle}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PagesTable;
