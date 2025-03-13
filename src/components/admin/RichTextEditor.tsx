
import React, { useEffect, useRef, useState } from 'react';
import EditorToolbar from './editor/EditorToolbar';
import EditorContent from './editor/EditorContent';
import { useEditorCommands, useKeyboardShortcuts } from './editor/editorHooks';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface RichTextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  minHeight?: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  initialValue = '', 
  onChange,
  minHeight = '300px',
  placeholder = 'Start writing...'
}) => {
  // Local state for content
  const [content, setContent] = useState<string>(initialValue || '');
  const [selection, setSelection] = useState<{start: number, end: number} | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  
  console.log("RichTextEditor rendered with initialValue length:", initialValue?.length || 0);

  // Initialize editor with initial content
  useEffect(() => {
    console.log("RichTextEditor initialValue changed, length:", initialValue?.length || 0);
    
    // Always update content state when initialValue changes
    if (initialValue !== content) {
      setContent(initialValue || '');
      
      // Ensure the editor content is updated
      if (editorRef.current) {
        editorRef.current.innerHTML = initialValue || '';
      }
    }
  }, [initialValue]);

  // Handle content changes
  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    
    // Only update if content has actually changed
    if (newContent !== content) {
      console.log("Content changed in editor, new length:", newContent.length);
      setContent(newContent);
      onChange(newContent);
    }
  };

  // Save current selection
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
    
    try {
      if (window.getSelection && document.createRange) {
        const sel = window.getSelection();
        if (!sel) return;
        
        sel.removeAllRanges();
        const range = document.createRange();
        let charIndex = 0;
        let foundStart = false;
        let foundEnd = false;
        
        function traverseNodes(node: Node) {
          if (foundStart && foundEnd) return;
          
          if (node.nodeType === Node.TEXT_NODE) {
            const nextCharIndex = charIndex + (node.textContent?.length || 0);
            if (!foundStart && selection.start >= charIndex && selection.start <= nextCharIndex) {
              range.setStart(node, selection.start - charIndex);
              foundStart = true;
            }
            if (!foundEnd && selection.end >= charIndex && selection.end <= nextCharIndex) {
              range.setEnd(node, selection.end - charIndex);
              foundEnd = true;
            }
            charIndex = nextCharIndex;
          } else {
            for (let i = 0; i < node.childNodes.length; i++) {
              traverseNodes(node.childNodes[i]);
            }
          }
        }
        
        traverseNodes(editorRef.current);
        
        if (foundStart && foundEnd) {
          sel.addRange(range);
        } else {
          // Fallback: place cursor at the end
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          sel.addRange(range);
        }
        
        editorRef.current.focus();
      }
    } catch (e) {
      console.error("Error restoring selection:", e);
      // Fallback for selection restoration
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }
  };

  // Editor commands
  const {
    formatText,
    insertLink,
    insertImage,
    clearFormatting,
    insertTemplate
  } = useEditorCommands(editorRef, setContent, onChange);

  // Keyboard shortcuts
  const { handleKeyDown } = useKeyboardShortcuts(formatText);

  // Templates
  const templates = [
    {
      name: "Blog Post",
      content: `<h1>Blog Post Title</h1>
<p>Introduction paragraph that hooks the reader and provides an overview...</p>
<h2>First Section Heading</h2>
<p>Detailed content with supporting information...</p>
<ul>
  <li>Key point one</li>
  <li>Key point two</li>
  <li>Key point three</li>
</ul>
<h2>Second Section Heading</h2>
<p>More detailed content with examples...</p>
<blockquote>Important quote or highlight</blockquote>
<h2>Conclusion</h2>
<p>Summary of key points and call to action...</p>`
    },
    {
      name: "Calculator Guide",
      content: `<h1>How to Use the Calculator</h1>
<p>This guide will help you understand how to use this calculator effectively.</p>
<h2>Input Fields</h2>
<ul>
  <li><strong>Field 1:</strong> Description of what to enter</li>
  <li><strong>Field 2:</strong> Description of what to enter</li>
  <li><strong>Field 3:</strong> Description of what to enter</li>
</ul>
<h2>Understanding Results</h2>
<p>Explanation of how to interpret the calculator results...</p>
<h2>Tips for Accuracy</h2>
<ol>
  <li>First tip for getting accurate results</li>
  <li>Second tip for getting accurate results</li>
  <li>Third tip for getting accurate results</li>
</ol>`
    }
  ];

  // Check if content is empty to show placeholder
  const isContentEmpty = !content || content === '' || content === '<br>' || content === '<p></p>';
  
  // Handle preview
  const handlePreview = () => {
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Content Preview</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { padding: 2rem; background-color: #f9fafb; }
            .content { max-width: 800px; margin: 0 auto; padding: 2rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .content img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <div class="content prose">
            ${content || '<p>No content to preview</p>'}
          </div>
        </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  return (
    <div className="border rounded-md">
      <EditorToolbar
        formatText={formatText}
        insertLink={insertLink}
        insertImage={insertImage}
        clearFormatting={clearFormatting}
        insertTemplate={insertTemplate}
        templates={templates}
      />
      
      <EditorContent
        content={content}
        minHeight={minHeight}
        placeholder={placeholder}
        isContentEmpty={isContentEmpty}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        saveSelection={saveSelection}
        restoreSelection={restoreSelection}
        editorRef={editorRef}
      />
    </div>
  );
};

export default RichTextEditor;
