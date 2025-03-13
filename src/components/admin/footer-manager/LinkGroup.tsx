
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ExternalLink, Link as LinkIcon, GripVertical } from 'lucide-react';
import { FooterLink } from './types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface LinkGroupProps {
  links: FooterLink[];
  onEdit: (link: FooterLink) => void;
  onDelete: (id: string) => void;
  onReorder?: (sourceIndex: number, destinationIndex: number) => void;
}

const LinkGroup: React.FC<LinkGroupProps> = ({ links, onEdit, onDelete, onReorder }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination || !onReorder) return;
    
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="footer-links">
        {(provided) => (
          <div 
            className="grid grid-cols-1 gap-4" 
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {links.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <Card>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div 
                            className="cursor-move p-1 hover:bg-gray-100 rounded" 
                            {...provided.dragHandleProps}
                          >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </div>
                          {link.isExternal ? (
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <div className="font-medium">{link.label}</div>
                            <div className="text-sm text-muted-foreground">{link.url}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onEdit(link)}
                            className="flex items-center gap-1"
                          >
                            <Edit size={14} />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => onDelete(link.id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LinkGroup;
