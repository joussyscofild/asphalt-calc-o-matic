
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useFooterManager } from './useFooterManager';
import LinkGroup from './LinkGroup';
import LinkForm from './LinkForm';
import GroupAdder from './GroupAdder';
import LoadingState from './LoadingState';

const FooterManager: React.FC = () => {
  const {
    linkGroups,
    activeTab,
    setActiveTab,
    editingLink,
    newLinkData,
    setNewLinkData,
    newGroupTitle,
    setNewGroupTitle,
    isAddingGroup,
    setIsAddingGroup,
    isLoading,
    handleAddGroup,
    handleDeleteGroup,
    handleAddLink,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink,
    handleCancelEdit,
    handleReorderLinks,
    handleSaveAllChanges
  } = useFooterManager();

  if (isLoading) {
    return <LoadingState />;
  }

  // Check if special groups exist
  const bottomLinksGroup = linkGroups.find(group => group.id === 'bottom-links');
  const socialMediaGroup = linkGroups.find(group => group.id === 'social-media');
  
  // Create flags for special groups
  const hasBottomLinks = !!bottomLinksGroup;
  const hasSocialMedia = !!socialMediaGroup;
  
  // Check if current tab is a special group
  const isBottomLinksGroup = activeTab === 'bottom-links';
  const isSocialGroup = activeTab === 'social-media';
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Footer Links Management</h2>
        <GroupAdder 
          isAddingGroup={isAddingGroup} 
          newGroupTitle={newGroupTitle}
          onGroupTitleChange={setNewGroupTitle}
          onAddGroup={handleAddGroup}
          onCancel={() => setIsAddingGroup(false)}
          onShowForm={() => setIsAddingGroup(true)}
        />
      </div>

      {linkGroups.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              {linkGroups.map(group => (
                <TabsTrigger key={group.id} value={group.id}>
                  {group.id === 'bottom-links' ? 'Bottom Links' : 
                   group.id === 'social-media' ? 'Social Media' : 
                   group.title}
                </TabsTrigger>
              ))}
              
              {!hasBottomLinks && (
                <TabsTrigger 
                  value="create-bottom-links"
                  onClick={() => {
                    // Create the bottom links group if it doesn't exist
                    handleAddGroup('bottom-links', 'Bottom Links');
                    // After creating, set active tab to this new group
                    setTimeout(() => setActiveTab('bottom-links'), 100);
                  }}
                >
                  Bottom Links
                </TabsTrigger>
              )}
              
              {!hasSocialMedia && (
                <TabsTrigger 
                  value="create-social-media"
                  onClick={() => {
                    // Create the social media group if it doesn't exist
                    handleAddGroup('social-media', 'Social Media');
                    // After creating, set active tab to this new group
                    setTimeout(() => setActiveTab('social-media'), 100);
                  }}
                >
                  Social Media
                </TabsTrigger>
              )}
            </TabsList>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleDeleteGroup(activeTab)}
              disabled={isBottomLinksGroup || isSocialGroup} // Prevent deletion of special groups
              className="flex items-center gap-1"
            >
              <Trash2 size={14} />
              Delete Group
            </Button>
          </div>

          {linkGroups.map(group => (
            <TabsContent key={group.id} value={group.id} className="space-y-4">
              <LinkGroup 
                links={group.links} 
                onEdit={handleEditLink}
                onDelete={handleDeleteLink}
                onReorder={handleReorderLinks}
              />

              {/* Edit/Add Link Form */}
              <LinkForm 
                editingLink={editingLink}
                newLinkData={newLinkData}
                onLinkDataChange={setNewLinkData}
                onUpdate={handleUpdateLink}
                onAdd={handleAddLink}
                onCancel={handleCancelEdit}
                isSocialGroup={group.id === 'social-media'}
                isBottomLinksGroup={group.id === 'bottom-links'}
              />
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
