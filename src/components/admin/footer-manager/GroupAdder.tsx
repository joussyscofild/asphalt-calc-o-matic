
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface GroupAdderProps {
  isAddingGroup: boolean;
  newGroupTitle: string;
  onGroupTitleChange: (title: string) => void;
  onAddGroup: () => void;
  onCancel: () => void;
  onShowForm: () => void;
}

const GroupAdder: React.FC<GroupAdderProps> = ({
  isAddingGroup,
  newGroupTitle,
  onGroupTitleChange,
  onAddGroup,
  onCancel,
  onShowForm
}) => {
  return (
    <div className="flex gap-2">
      {isAddingGroup ? (
        <>
          <Input
            value={newGroupTitle}
            onChange={(e) => onGroupTitleChange(e.target.value)}
            placeholder="New group name"
            className="w-48"
          />
          <Button onClick={onAddGroup}>Add</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </>
      ) : (
        <Button onClick={onShowForm} className="flex items-center gap-2">
          <Plus size={16} />
          Add Link Group
        </Button>
      )}
    </div>
  );
};

export default GroupAdder;
