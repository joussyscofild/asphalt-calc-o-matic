
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, 
  Image, Heading1, Heading2, Quote, Code, Undo, Redo,
  PanelLeft, Trash2, FileText, Palette
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

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
  const [content, setContent] = useState(initialValue);
  const [selection, setSelection] = useState<{start: number, end: number} | null>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);

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
    
    if (window.getSelection && document.createRange) {
      const sel = window.getSelection();
      if (!sel) return;
      
      sel.removeAllRanges();
      const range = document.createRange();
      range.setStart(editorRef.current, 0);
      range.collapse(true);
      sel.addRange(range);
      
      // This is a simplified version - in a real implementation, 
      // you'd need to find the correct text node based on offsets
    }
  };

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
    formatText('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
  };

  // Handle image insertion
  const insertImage = (url: string, alt: string) => {
    formatText('insertHTML', `<img src="${url}" alt="${alt}" style="max-width: 100%;" />`);
  };

  // Clear formatting
  const clearFormatting = () => {
    formatText('removeFormat');
  };

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

  // Insert HTML template
  const insertTemplate = (template: string) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = template;
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

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
      <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
        <div className="flex items-center space-x-1 mr-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('underline')}
            className="h-8 w-8 p-0"
          >
            <Underline size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-1 mr-2 border-l pl-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('formatBlock', '<h1>')}
            className="h-8 w-8 p-0"
          >
            <Heading1 size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('formatBlock', '<h2>')}
            className="h-8 w-8 p-0"
          >
            <Heading2 size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('formatBlock', '<blockquote>')}
            className="h-8 w-8 p-0"
          >
            <Quote size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('formatBlock', '<pre>')}
            className="h-8 w-8 p-0"
          >
            <Code size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-1 mr-2 border-l pl-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('insertUnorderedList')}
            className="h-8 w-8 p-0"
          >
            <List size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('insertOrderedList')}
            className="h-8 w-8 p-0"
          >
            <ListOrdered size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-1 mr-2 border-l pl-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('justifyLeft')}
            className="h-8 w-8 p-0"
          >
            <AlignLeft size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('justifyCenter')}
            className="h-8 w-8 p-0"
          >
            <AlignCenter size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('justifyRight')}
            className="h-8 w-8 p-0"
          >
            <AlignRight size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-1 mr-2 border-l pl-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <LinkIcon size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Insert Link</h4>
                  <p className="text-sm text-muted-foreground">
                    Add a hyperlink to your content.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link-text" className="text-right">
                      Text
                    </Label>
                    <Input id="link-text" className="col-span-3" placeholder="Link text" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link-url" className="text-right">
                      URL
                    </Label>
                    <Input id="link-url" className="col-span-3" placeholder="https://example.com" />
                  </div>
                  <Button className="ml-auto" onClick={() => {
                    const text = (document.getElementById('link-text') as HTMLInputElement)?.value;
                    const url = (document.getElementById('link-url') as HTMLInputElement)?.value;
                    if (url) insertLink(url, text || url);
                  }}>
                    Insert Link
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Image size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Insert Image</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an image to your content.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image-url" className="text-right">
                      URL
                    </Label>
                    <Input id="image-url" className="col-span-3" placeholder="https://example.com/image.jpg" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image-alt" className="text-right">
                      Alt Text
                    </Label>
                    <Input id="image-alt" className="col-span-3" placeholder="Image description" />
                  </div>
                  <Button className="ml-auto" onClick={() => {
                    const url = (document.getElementById('image-url') as HTMLInputElement)?.value;
                    const alt = (document.getElementById('image-alt') as HTMLInputElement)?.value;
                    if (url) insertImage(url, alt || '');
                  }}>
                    Insert Image
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-1 mr-2 border-l pl-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('undo')}
            className="h-8 w-8 p-0"
          >
            <Undo size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => formatText('redo')}
            className="h-8 w-8 p-0"
          >
            <Redo size={16} />
          </Button>
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center space-x-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                <FileText size={14} className="mr-1" />
                Templates
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <Tabs defaultValue="blog">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="blog">Blog</TabsTrigger>
                  <TabsTrigger value="calculator">Calculator</TabsTrigger>
                </TabsList>
                <TabsContent value="blog" className="p-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 mb-1"
                    onClick={() => {
                      insertTemplate(templates[0].content);
                      toast({
                        title: "Template applied",
                        description: "Blog post template has been inserted.",
                      });
                    }}
                  >
                    <div>
                      <div className="font-medium">Blog Post Template</div>
                      <div className="text-xs text-muted-foreground">Standard blog structure with headings</div>
                    </div>
                  </Button>
                </TabsContent>
                <TabsContent value="calculator" className="p-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => {
                      insertTemplate(templates[1].content);
                      toast({
                        title: "Template applied",
                        description: "Calculator guide template has been inserted.",
                      });
                    }}
                  >
                    <div>
                      <div className="font-medium">Calculator Guide</div>
                      <div className="text-xs text-muted-foreground">How-to guide for calculator usage</div>
                    </div>
                  </Button>
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFormatting}
            className="h-8 text-xs"
          >
            <Trash2 size={14} className="mr-1" />
            Clear Format
          </Button>
        </div>
      </div>

      <div
        ref={editorRef}
        className={`p-4 outline-none ${isContentEmpty ? 'relative' : ''}`}
        style={{ minHeight }}
        contentEditable
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        onClick={saveSelection}
        onKeyUp={saveSelection}
        onFocus={restoreSelection}
        dangerouslySetInnerHTML={{ __html: content }}
        data-placeholder={placeholder}
      >
      </div>
      {isContentEmpty && (
        <div className="absolute pointer-events-none text-gray-400 p-4" style={{top: 0, left: 0, right: 0}}>
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
