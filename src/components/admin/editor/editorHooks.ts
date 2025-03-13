
import { useState, useRef, useEffect } from 'react';

export const useEditorState = (initialValue: string, onChange: (value: string) => void) => {
  const [content, setContent] = useState(initialValue || '');
  const [selection, setSelection] = useState<{start: number, end: number} | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Synchronize the editor content with the div when it changes
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Handle content changes
  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange(newContent);
  };

  // Get current selection
  const saveSelection = () => {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel && sel.getRangeAt && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        const preSelectionRange = range.cloneRange();
        if (editorRef.current) {
          preSelectionRange.selectNodeContents(editorRef.current);
          preSelectionRange.setEnd(range.startContainer, range.startOffset);
          const start = preSelectionRange.toString().length;
          
          setSelection({
            start,
            end: start + range.toString().length
          });
        }
      }
    }
  };

  // Restore selection
  const restoreSelection = () => {
    if (!selection || !editorRef.current) return;
    
    const charIndex = (node: Node, index: number): {node: Node, offset: number} => {
      if (node.nodeType === 3) {
        if (index <= node.textContent!.length) {
          return { node, offset: index };
        }
        index -= node.textContent!.length;
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          const result = charIndex(node.childNodes[i], index);
          if (result) {
            index = result.offset;
            if (index === 0) {
              return { node: result.node, offset: result.offset };
            }
          }
        }
      }
      return { node, offset: 0 };
    };

    try {
      if (window.getSelection && document.createRange) {
        const sel = window.getSelection();
        if (!sel) return;
        
        sel.removeAllRanges();
        const range = document.createRange();
        
        const startInfo = charIndex(editorRef.current, selection.start);
        const endInfo = charIndex(editorRef.current, selection.end);
        
        range.setStart(startInfo.node, startInfo.offset);
        range.setEnd(endInfo.node, endInfo.offset);
        
        sel.addRange(range);
        editorRef.current.focus();
      }
    } catch (e) {
      console.error("Error restoring selection:", e);
      // Fallback for selection restoration
      editorRef.current.focus();
    }
  };

  return {
    content,
    setContent,
    selection,
    editorRef,
    handleChange,
    saveSelection,
    restoreSelection
  };
};

export const useEditorCommands = (
  editorRef: React.RefObject<HTMLDivElement>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  onChange: (value: string) => void
) => {
  // Apply formatting
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
      editorRef.current.focus();
    }
  };

  // Handle link insertion
  const insertLink = (url: string, text: string) => {
    formatText('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer">${text || url}</a>`);
  };

  // Handle image insertion
  const insertImage = (url: string, alt: string) => {
    formatText('insertHTML', `<img src="${url}" alt="${alt || ''}" style="max-width: 100%;" />`);
  };

  // Clear formatting
  const clearFormatting = () => {
    formatText('removeFormat');
  };

  // Insert HTML template
  const insertTemplate = (template: string) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = template;
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  return {
    formatText,
    insertLink,
    insertImage,
    clearFormatting,
    insertTemplate
  };
};

export const useKeyboardShortcuts = (formatText: (command: string, value?: string) => void) => {
  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          formatText('bold');
          break;
        case 'i':
          e.preventDefault();
          formatText('italic');
          break;
        case 'u':
          e.preventDefault();
          formatText('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            formatText('redo');
          } else {
            formatText('undo');
          }
          break;
      }
    }
  };

  return { handleKeyDown };
};
