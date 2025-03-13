
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical } from 'lucide-react';

interface PagesTableProps {
  pages: Page[];
  onEdit: (page: Page) => void;
  onDelete: (id: string) => void;
  onDuplicate: (page: Page) => void;
  onStatusToggle: (id: string) => void;
  onPreview: (page: Page) => void;
  onReorder?: (result: { source: number; destination: number }) => void;
}

const PagesTable: React.FC<PagesTableProps> = ({ 
  pages, 
  onEdit, 
  onDelete, 
  onDuplicate,
  onStatusToggle,
  onPreview,
  onReorder
}) => {
  const handleDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination || !onReorder) {
      return;
    }

    // If position didn't change
    if (result.destination.index === result.source.index) {
      return;
    }

    // Call the reorder callback with source and destination indices
    onReorder({
      source: result.source.index,
      destination: result.destination.index
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table>
        <TableHeader>
          <TableRow>
            {onReorder && <TableHead className="w-[30px]"></TableHead>}
            <TableHead className="w-[300px]">Page Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <Droppable droppableId="pages-table" direction="vertical">
          {(provided) => (
            <TableBody 
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={onReorder ? 5 : 4} className="text-center py-8 text-muted-foreground">
                    No pages found. Create your first page by clicking "Add New Page" above.
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page, index) => (
                  <Draggable 
                    key={page.id} 
                    draggableId={page.id} 
                    index={index}
                    isDragDisabled={!onReorder}
                  >
                    {(provided, snapshot) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={snapshot.isDragging ? "bg-muted" : ""}
                      >
                        {onReorder && (
                          <TableCell className="w-[30px]">
                            <div 
                              {...provided.dragHandleProps} 
                              className="cursor-grab"
                            >
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </TableCell>
                        )}
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
                            onPreview={onPreview}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  );
};

export default PagesTable;
