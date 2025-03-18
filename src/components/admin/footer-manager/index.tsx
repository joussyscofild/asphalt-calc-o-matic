
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

  // Special group IDs
  const isSocialGroup = activeTab === 'social-media';
  const isBottomLinksGroup = activeTab === 'bottom-links';

  // Ensure Bottom Links group exists
  const bottomLinksGroup = linkGroups.find(group => group.id === 'bottom-links');
  const hasBottomLinks = !!bottomLinksGroup;

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
                  {group.id === 'bottom-links' ? 'Bottom Links' : group.title}
                </TabsTrigger>
              ))}
              
              {!hasBottomLinks && (
                <TabsTrigger 
                  value="create-bottom-links"
                  onClick={() => {
                    // Create the bottom links group if it doesn't exist
                    if (!hasBottomLinks) {
                      handleAddGroup('bottom-links', 'Bottom Links');
                      // After creating, set active tab to this new group
                      setTimeout(() => setActiveTab('bottom-links'), 100);
                    }
                  }}
                >
                  Bottom Links
                </TabsTrigger>
              )}
            </TabsList>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleDeleteGroup(activeTab)}
              disabled={isBottomLinksGroup} // Prevent deletion of bottom links group
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
