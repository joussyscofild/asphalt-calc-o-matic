
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from '../RichTextEditor';

interface ContentTabProps {
  content: string;
  handleContentChange: (content: string) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ content, handleContentChange }) => {
  // Log the content prop when it changes to verify it's being passed correctly
  useEffect(() => {
    console.log("Content Tab received content:", content);
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
          initialValue={content} 
          onChange={handleContentChange}
          minHeight="500px"
          placeholder="Start writing your blog post content here..."
          key={`editor-${content?.length || 0}-${Date.now()}`} // Force re-render on content changes
        />
      </CardContent>
    </Card>
  );
};

export default ContentTab;
