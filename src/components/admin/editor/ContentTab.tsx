
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from '../RichTextEditor';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface ContentTabProps {
  content: string;
  handleContentChange: (content: string) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ content, handleContentChange }) => {
  const [editorKey, setEditorKey] = useState(Date.now());
  const contentRef = useRef(content);
  
  // Force re-initialize editor when content from parent changes significantly
  useEffect(() => {
    console.log("ContentTab received content:", content ? 
      `${content.substring(0, 50)}... (${content.length} chars)` : 
      "empty");
    
    // Check if content has changed from our last known value
    if (content !== contentRef.current) {
      console.log("Content changed significantly, reinitializing editor");
      contentRef.current = content;
      setEditorKey(Date.now());
    }
  }, [content]);
  
  const handleOpenPreview = () => {
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Post Content</CardTitle>
          <CardDescription>
            Write your blog post content
          </CardDescription>
        </div>
        <Button variant="outline" onClick={handleOpenPreview} className="flex items-center gap-1">
          <Eye size={16} />
          Preview
        </Button>
      </CardHeader>
      <CardContent>
        <RichTextEditor 
          initialValue={content} 
          onChange={handleContentChange}
          minHeight="600px"
          placeholder="Start writing your blog post content here..."
          key={`editor-${editorKey}`}
        />
      </CardContent>
    </Card>
  );
};

export default ContentTab;
