
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { FooterLink, NewLinkData } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Globe, AlertCircle, FileText, ShieldCheck } from 'lucide-react';

interface LinkFormProps {
  editingLink: FooterLink | null;
  newLinkData: NewLinkData;
  onLinkDataChange: (data: NewLinkData) => void;
  onUpdate: () => void;
  onAdd: () => void;
  onCancel: () => void;
  isSocialGroup?: boolean;
  isBottomLinksGroup?: boolean;
}

const socialNetworks = [
  { value: 'Twitter', label: 'Twitter / X' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Pinterest', label: 'Pinterest' },
];

const bottomLinkTypes = [
  { value: 'Privacy Policy', label: 'Privacy Policy', icon: <ShieldCheck size={14} /> },
  { value: 'Terms of Service', label: 'Terms of Service', icon: <FileText size={14} /> },
  { value: 'Contact', label: 'Contact', icon: <Mail size={14} /> },
  { value: 'Sitemap', label: 'Sitemap', icon: <Globe size={14} /> },
  { value: 'Custom', label: 'Custom Link', icon: <AlertCircle size={14} /> },
];

const LinkForm: React.FC<LinkFormProps> = ({
  editingLink,
  newLinkData,
  onLinkDataChange,
  onUpdate,
  onAdd,
  onCancel,
  isSocialGroup = false,
  isBottomLinksGroup = false
}) => {
  const handleSocialNetworkSelect = (value: string) => {
    onLinkDataChange({
      ...newLinkData,
      label: value,
      isExternal: true // Social media links are always external
    });
  };

  const handleBottomLinkSelect = (value: string) => {
    let url = '';
    let isExternal = false;
    
    // Set default URLs based on link type
    switch(value) {
      case 'Privacy Policy':
        url = '/page/privacy';
        break;
      case 'Terms of Service':
        url = '/page/terms';
        break;
      case 'Contact':
        url = 'mailto:info@asphaltcalculator.co';
        isExternal = true;
        break;
      case 'Sitemap':
        url = '/sitemap';
        break;
      default:
        url = '';
    }
    
    onLinkDataChange({
      ...newLinkData,
      label: value,
      url,
      isExternal
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">
          {editingLink ? "Edit Link" : "Add New Link"}
        </h3>
        <div className="space-y-4">
          {isSocialGroup ? (
            <div>
              <Label htmlFor="social-network">Social Network</Label>
              <Select value={newLinkData.label} onValueChange={handleSocialNetworkSelect}>
                <SelectTrigger id="social-network" className="mt-1">
                  <SelectValue placeholder="Select social network" />
                </SelectTrigger>
                <SelectContent>
                  {socialNetworks.map(network => (
                    <SelectItem key={network.value} value={network.value}>
                      {network.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : isBottomLinksGroup ? (
            <div>
              <Label htmlFor="bottom-link-type">Link Type</Label>
              <Select 
                value={newLinkData.label === 'Privacy Policy' || 
                       newLinkData.label === 'Terms of Service' || 
                       newLinkData.label === 'Contact' || 
                       newLinkData.label === 'Sitemap' ? 
                       newLinkData.label : 'Custom'} 
                onValueChange={handleBottomLinkSelect}
              >
                <SelectTrigger id="bottom-link-type" className="mt-1">
                  <SelectValue placeholder="Select link type" />
                </SelectTrigger>
                <SelectContent>
                  {bottomLinkTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        {type.icon}
                        <span className="ml-2">{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {newLinkData.label !== 'Privacy Policy' && 
               newLinkData.label !== 'Terms of Service' && 
               newLinkData.label !== 'Contact' && 
               newLinkData.label !== 'Sitemap' && (
                <div className="mt-2">
                  <Label htmlFor="custom-link-label">Custom Link Label</Label>
                  <Input
                    id="custom-link-label"
                    value={newLinkData.label}
                    onChange={(e) => onLinkDataChange({...newLinkData, label: e.target.value})}
                    placeholder="Custom Link"
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              <Label htmlFor="link-label">Link Label</Label>
              <Input
                id="link-label"
                value={newLinkData.label}
                onChange={(e) => onLinkDataChange({...newLinkData, label: e.target.value})}
                placeholder="About Us"
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              value={newLinkData.url}
              onChange={(e) => onLinkDataChange({...newLinkData, url: e.target.value})}
              placeholder={
                isSocialGroup ? 
                  "https://twitter.com/yourusername" : 
                isBottomLinksGroup ? 
                  (newLinkData.isExternal ? "https://example.com" : "/page/example") :
                  (newLinkData.isExternal ? "https://example.com" : "/about-us")
              }
              className="mt-1"
            />
            {!newLinkData.isExternal && !isSocialGroup && (
              <p className="text-xs text-muted-foreground mt-1">
                Enter URLs exactly as they should appear (e.g., /page/contact-us or page/contact-us)
              </p>
            )}
          </div>
          
          {!isSocialGroup && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="external-link"
                checked={newLinkData.isExternal}
                onChange={(e) => onLinkDataChange({...newLinkData, isExternal: e.target.checked})}
                className="rounded border-gray-300"
              />
              <Label htmlFor="external-link">External Link</Label>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            {editingLink && (
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
            )}
            <Button onClick={editingLink ? onUpdate : onAdd}>
              {editingLink ? "Update Link" : "Add Link"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkForm;
