
import React, { useEffect } from 'react';

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
  // Ensure the editor content is up-to-date with the content prop
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content || '';
    }
  }, [content]);

  return (
    <div className="relative">
      <div
        ref={editorRef}
        className="p-4 outline-none min-h-[200px]"
        style={{ minHeight }}
        contentEditable={true}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        onFocus={restoreSelection}
        onBlur={saveSelection}
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
