
import React, { useEffect } from 'react';
import EditorToolbar from './editor/EditorToolbar';
import EditorContent from './editor/EditorContent';
import { useEditorState, useEditorCommands, useKeyboardShortcuts } from './editor/editorHooks';

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
  // Editor state and basic handlers
  const {
    content,
    setContent,
    editorRef,
    handleChange,
    saveSelection,
    restoreSelection
  } = useEditorState(initialValue, onChange);

  // Update content when initialValue changes (e.g., when switching between posts)
  useEffect(() => {
    if (initialValue !== content) {
      console.log("RichTextEditor initialValue changed:", initialValue);
      setContent(initialValue || '');
      
      // Ensure the editor's innerHTML is synchronized
      if (editorRef.current) {
        editorRef.current.innerHTML = initialValue || '';
      }
    }
  }, [initialValue, setContent]);

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
  const isContentEmpty = content === '' || content === '<br>' || content === '<p></p>';

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
