
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Link, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define footer link types
type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

type FooterLink = {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
};

// Mock data for initial footer links
const initialLinkGroups: FooterLinkGroup[] = [
  {
    id: 'quick-links',
    title: 'Quick Links',
    links: [
      { id: 'calculators', label: 'Calculators', url: '/calculators', isExternal: false },
      { id: 'blog', label: 'Blog', url: '/blog', isExternal: false },
      { id: 'about', label: 'About Us', url: '/about', isExternal: false },
      { id: 'contact', label: 'Contact', url: '/contact', isExternal: false },
    ]
  },
  {
    id: 'calc-categories',
    title: 'Calculator Categories',
    links: [
      { id: 'asphalt', label: 'Asphalt Calculators', url: '/calculators/asphalt', isExternal: false },
      { id: 'concrete', label: 'Concrete Calculators', url: '/calculators/concrete', isExternal: false },
      { id: 'cost', label: 'Cost Estimators', url: '/calculators/cost', isExternal: false },
      { id: 'measurement', label: 'Measurement Tools', url: '/calculators/measurement', isExternal: false },
    ]
  },
  {
    id: 'social',
    title: 'Social Links',
    links: [
      { id: 'twitter', label: 'Twitter', url: 'https://twitter.com', isExternal: true },
      { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com', isExternal: true },
      { id: 'facebook', label: 'Facebook', url: 'https://facebook.com', isExternal: true },
    ]
  }
];

const FooterManager: React.FC = () => {
  const { toast } = useToast();
  const [linkGroups, setLinkGroups] = useState<FooterLinkGroup[]>(initialLinkGroups);
  const [activeTab, setActiveTab] = useState('quick-links');
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [newLinkData, setNewLinkData] = useState<Omit<FooterLink, 'id'>>({
    label: '',
    url: '',
    isExternal: false
  });
  
  // For adding new group
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [isAddingGroup, setIsAddingGroup] = useState(false);

  const handleAddGroup = () => {
    if (!newGroupTitle.trim()) {
      toast({
        title: "Validation Error",
        description: "Group title cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newId = newGroupTitle.toLowerCase().replace(/\s+/g, '-');
    
    // Check if ID already exists
    if (linkGroups.some(group => group.id === newId)) {
      toast({
        title: "Validation Error",
        description: "A group with a similar name already exists",
        variant: "destructive"
      });
      return;
    }

    const newGroup: FooterLinkGroup = {
      id: newId,
      title: newGroupTitle,
      links: []
    };

    setLinkGroups([...linkGroups, newGroup]);
    setActiveTab(newId);
    setNewGroupTitle('');
    setIsAddingGroup(false);
    
    toast({
      title: "Group Added",
      description: `"${newGroupTitle}" group has been added`
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    const updatedGroups = linkGroups.filter(group => group.id !== groupId);
    setLinkGroups(updatedGroups);
    
    // Set active tab to first group or empty if no groups
    if (updatedGroups.length > 0) {
      setActiveTab(updatedGroups[0].id);
    } else {
      setActiveTab('');
    }
    
    toast({
      title: "Group Deleted",
      description: "The link group has been deleted"
    });
  };

  const handleAddLink = () => {
    if (!newLinkData.label.trim() || !newLinkData.url.trim()) {
      toast({
        title: "Validation Error",
        description: "Link label and URL cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const currentGroup = linkGroups.find(group => group.id === activeTab);
    if (!currentGroup) return;
    
    const newLink: FooterLink = {
      id: `${activeTab}-${Date.now()}`,
      ...newLinkData
    };

    const updatedGroups = linkGroups.map(group => {
      if (group.id === activeTab) {
        return {
          ...group,
          links: [...group.links, newLink]
        };
      }
      return group;
    });

    setLinkGroups(updatedGroups);
    setNewLinkData({
      label: '',
      url: '',
      isExternal: false
    });
    
    toast({
      title: "Link Added",
      description: `"${newLink.label}" has been added to ${currentGroup.title}`
    });
  };

  const handleEditLink = (link: FooterLink) => {
    setEditingLink(link);
    setNewLinkData({
      label: link.label,
      url: link.url,
      isExternal: link.isExternal
    });
  };

  const handleUpdateLink = () => {
    if (!editingLink) return;
    
    if (!newLinkData.label.trim() || !newLinkData.url.trim()) {
      toast({
        title: "Validation Error",
        description: "Link label and URL cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const updatedGroups = linkGroups.map(group => {
      if (group.id === activeTab) {
        return {
          ...group,
          links: group.links.map(link => {
            if (link.id === editingLink.id) {
              return {
                ...link,
                label: newLinkData.label,
                url: newLinkData.url,
                isExternal: newLinkData.isExternal
              };
            }
            return link;
          })
        };
      }
      return group;
    });

    setLinkGroups(updatedGroups);
    setEditingLink(null);
    setNewLinkData({
      label: '',
      url: '',
      isExternal: false
    });
    
    toast({
      title: "Link Updated",
      description: `"${newLinkData.label}" has been updated`
    });
  };

  const handleDeleteLink = (linkId: string) => {
    const updatedGroups = linkGroups.map(group => {
      if (group.id === activeTab) {
        return {
          ...group,
          links: group.links.filter(link => link.id !== linkId)
        };
      }
      return group;
    });

    setLinkGroups(updatedGroups);
    
    toast({
      title: "Link Deleted",
      description: "The link has been deleted"
    });
  };

  const handleCancelEdit = () => {
    setEditingLink(null);
    setNewLinkData({
      label: '',
      url: '',
      isExternal: false
    });
  };

  const handleSaveAllChanges = () => {
    // In a real application, this would save to a database or API
    localStorage.setItem('footerLinks', JSON.stringify(linkGroups));
    
    toast({
      title: "Changes Saved",
      description: "All footer link changes have been saved"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Footer Links Management</h2>
        <div className="flex gap-2">
          {isAddingGroup ? (
            <>
              <Input
                value={newGroupTitle}
                onChange={(e) => setNewGroupTitle(e.target.value)}
                placeholder="New group name"
                className="w-48"
              />
              <Button onClick={handleAddGroup}>Add</Button>
              <Button variant="outline" onClick={() => setIsAddingGroup(false)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsAddingGroup(true)} className="flex items-center gap-2">
              <Plus size={16} />
              Add Link Group
            </Button>
          )}
        </div>
      </div>

      {linkGroups.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              {linkGroups.map(group => (
                <TabsTrigger key={group.id} value={group.id}>{group.title}</TabsTrigger>
              ))}
            </TabsList>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleDeleteGroup(activeTab)}
              className="flex items-center gap-1"
            >
              <Trash2 size={14} />
              Delete Group
            </Button>
          </div>

          {linkGroups.map(group => (
            <TabsContent key={group.id} value={group.id} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {group.links.map(link => (
                  <Card key={link.id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {link.isExternal ? (
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Link className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div>
                          <div className="font-medium">{link.label}</div>
                          <div className="text-sm text-muted-foreground">{link.url}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditLink(link)}
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteLink(link.id)}
                          className="flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Edit/Add Link Form */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">
                      {editingLink ? "Edit Link" : "Add New Link"}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="link-label">Link Label</Label>
                          <Input
                            id="link-label"
                            value={newLinkData.label}
                            onChange={(e) => setNewLinkData({...newLinkData, label: e.target.value})}
                            placeholder="About Us"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="link-url">URL</Label>
                          <Input
                            id="link-url"
                            value={newLinkData.url}
                            onChange={(e) => setNewLinkData({...newLinkData, url: e.target.value})}
                            placeholder="/about or https://example.com"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="external-link"
                          checked={newLinkData.isExternal}
                          onChange={(e) => setNewLinkData({...newLinkData, isExternal: e.target.checked})}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="external-link">External Link</Label>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        {editingLink && (
                          <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                        )}
                        <Button onClick={editingLink ? handleUpdateLink : handleAddLink}>
                          {editingLink ? "Update Link" : "Add Link"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No link groups found. Add a new group to get started.</p>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button onClick={handleSaveAllChanges}>Save All Changes</Button>
      </div>
    </div>
  );
};

export default FooterManager;
