
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, 
  Image, Heading1, Heading2, Quote, Code, Undo, Redo,
  Trash2, FileText
} from 'lucide-react';
import { FormatActions } from './FormatActions';
import { HeadingActions } from './HeadingActions';
import { ListActions } from './ListActions';
import { AlignmentActions } from './AlignmentActions';
import { InsertActions } from './InsertActions';
import { HistoryActions } from './HistoryActions';
import { TemplateActions } from './TemplateActions';

interface EditorToolbarProps {
  formatText: (command: string, value?: string) => void;
  insertLink: (url: string, text: string) => void;
  insertImage: (url: string, alt: string) => void;
  clearFormatting: () => void;
  insertTemplate: (template: string) => void;
  templates: Array<{ name: string; content: string }>;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  formatText,
  insertLink,
  insertImage,
  clearFormatting,
  insertTemplate,
  templates
}) => {
  return (
    <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
      <FormatActions formatText={formatText} />
      <HeadingActions formatText={formatText} />
      <ListActions formatText={formatText} />
      <AlignmentActions formatText={formatText} />
      <InsertActions insertLink={insertLink} insertImage={insertImage} />
      <HistoryActions formatText={formatText} />

      <div className="flex-grow"></div>

      <TemplateActions 
        insertTemplate={insertTemplate} 
        templates={templates}
        clearFormatting={clearFormatting}
      />
    </div>
  );
};

export default EditorToolbar;
