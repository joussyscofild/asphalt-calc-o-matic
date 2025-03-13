import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from '../RichTextEditor';

interface ContentTabProps {
  content: string;
  handleContentChange: (content: string) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ content, handleContentChange }) => {
  // Use state to keep track of editor key for remounting
  const [editorKey, setEditorKey] = useState<number>(Date.now());
  
  // Force re-initialize editor when content changes from parent
  useEffect(() => {
    console.log("ContentTab received new content, reinitializing editor");
    setEditorKey(Date.now());
  }, [content]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Content</CardTitle>
        <CardDescription>
          Write your blog post content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RichTextEditor 
          initialValue={content || ''} 
          onChange={handleContentChange}
          minHeight="500px"
          placeholder="Start writing your blog post content here..."
          key={`editor-${editorKey}`}
        />
      </CardContent>
    </Card>
  );
};

export default ContentTab;
