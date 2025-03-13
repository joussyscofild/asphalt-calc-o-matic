
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { FooterLink } from './types';

interface LinkGroupProps {
  links: FooterLink[];
  onEdit: (link: FooterLink) => void;
  onDelete: (id: string) => void;
}

const LinkGroup: React.FC<LinkGroupProps> = ({ links, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {links.map(link => (
        <Card key={link.id}>
          <CardContent className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
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
      ))}
    </div>
  );
};

export default LinkGroup;
