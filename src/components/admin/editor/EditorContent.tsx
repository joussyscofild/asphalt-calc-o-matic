
import React from 'react';

interface EditorContentProps {
  content: string;
  minHeight: string;
  placeholder: string;
  isContentEmpty: boolean;
  handleChange: (e: React.FormEvent<HTMLDivElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  saveSelection: () => void;
  restoreSelection: () => void;
  editorRef: React.RefObject<HTMLDivElement>;
}

const EditorContent: React.FC<EditorContentProps> = ({
  content,
  minHeight,
  placeholder,
  isContentEmpty,
  handleChange,
  handleKeyDown,
  saveSelection,
  restoreSelection,
  editorRef
}) => {
  return (
    <div className="relative">
      <div
        ref={editorRef}
        className="p-4 outline-none"
        style={{ minHeight }}
        contentEditable
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        onClick={saveSelection}
        onKeyUp={saveSelection}
        onFocus={restoreSelection}
        dangerouslySetInnerHTML={{ __html: content }}
        data-placeholder={placeholder}
      />
      {isContentEmpty && (
        <div className="absolute pointer-events-none text-gray-400 p-4" style={{top: 0, left: 0, right: 0}}>
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default EditorContent;
