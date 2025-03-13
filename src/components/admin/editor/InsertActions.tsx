
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Image } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InsertActionsProps {
  insertLink: (url: string, text: string) => void;
  insertImage: (url: string, alt: string) => void;
}

export const InsertActions: React.FC<InsertActionsProps> = ({ insertLink, insertImage }) => {
  return (
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
  );
};
