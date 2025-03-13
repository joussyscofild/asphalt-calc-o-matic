
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from '../RichTextEditor';

interface ContentTabProps {
  content: string;
  handleContentChange: (content: string) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({ content, handleContentChange }) => {
  // Force re-initialize editor when content changes from parent
  useEffect(() => {
    console.log("ContentTab received content:", content ? content.substring(0, 50) + "..." : "empty");
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
          key={`editor-${content ? content.length : 0}`}
        />
      </CardContent>
    </Card>
  );
};

export default ContentTab;
