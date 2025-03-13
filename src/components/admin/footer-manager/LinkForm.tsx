
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { FooterLink, NewLinkData } from './types';

interface LinkFormProps {
  editingLink: FooterLink | null;
  newLinkData: NewLinkData;
  onLinkDataChange: (data: NewLinkData) => void;
  onUpdate: () => void;
  onAdd: () => void;
  onCancel: () => void;
}

const LinkForm: React.FC<LinkFormProps> = ({
  editingLink,
  newLinkData,
  onLinkDataChange,
  onUpdate,
  onAdd,
  onCancel
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">
          {editingLink ? "Edit Link" : "Add New Link"}
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="link-label">Link Label</Label>
              <Input
                id="link-label"
                value={newLinkData.label}
                onChange={(e) => onLinkDataChange({...newLinkData, label: e.target.value})}
                placeholder="About Us"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={newLinkData.url}
                onChange={(e) => onLinkDataChange({...newLinkData, url: e.target.value})}
                placeholder={newLinkData.isExternal ? "https://example.com" : "/about-us"}
                className="mt-1"
              />
              {!newLinkData.isExternal && (
                <p className="text-xs text-muted-foreground mt-1">
                  Enter URLs exactly as they should appear (e.g., /page/contact-us or page/contact-us)
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="external-link"
              checked={newLinkData.isExternal}
              onChange={(e) => onLinkDataChange({...newLinkData, isExternal: e.target.checked})}
              className="rounded border-gray-300"
            />
            <Label htmlFor="external-link">External Link</Label>
          </div>
          
          <div className="flex justify-end gap-2">
            {editingLink && (
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
            )}
            <Button onClick={editingLink ? onUpdate : onAdd}>
              {editingLink ? "Update Link" : "Add Link"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkForm;
