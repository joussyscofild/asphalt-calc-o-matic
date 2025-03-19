
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Calculator as CalcIcon, Settings, Wand2 } from 'lucide-react';
import GeneralTab from './GeneralTab';
import FieldsTab from './FieldsTab';
import AdvancedTab from './AdvancedTab';
import SEOHelper from '../SEOHelper';
import useCalculatorForm from './useCalculatorForm';
import { CalculatorEditorProps } from './types';

const CalculatorEditorForm: React.FC<CalculatorEditorProps> = ({ 
  calculator,
  onSave,
  onCancel
}) => {
  const {
    formData,
    activeTab,
    isNew,
    setActiveTab,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleRichTextChange,
    handleSEOUpdate,
    handleRelatedContentChange,
    handleExternalArticlesChange,
    addField,
    updateField,
    removeField,
    moveField,
    addOption,
    updateOption,
    removeOption,
    generateSampleFields,
    handleSubmit
  } = useCalculatorForm(calculator, onSave);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {isNew ? "Create New Calculator" : `Edit: ${calculator?.title}`}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isNew ? "Create Calculator" : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Edit size={14} />
            General
          </TabsTrigger>
          <TabsTrigger value="fields" className="flex items-center gap-1">
            <CalcIcon size={14} />
            Fields
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <Settings size={14} />
            Advanced
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-1">
            <Wand2 size={14} />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralTab 
            formData={formData}
            isNew={isNew}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleSwitchChange={handleSwitchChange}
            handleRichTextChange={handleRichTextChange}
          />
        </TabsContent>

        <TabsContent value="fields">
          <FieldsTab 
            formData={formData}
            addField={addField}
            updateField={updateField}
            removeField={removeField}
            moveField={moveField}
            addOption={addOption}
            updateOption={updateOption}
            removeOption={removeOption}
            generateSampleFields={generateSampleFields}
          />
        </TabsContent>

        <TabsContent value="advanced">
          <AdvancedTab 
            formData={formData}
            handleInputChange={handleInputChange}
            handleRelatedContentChange={handleRelatedContentChange}
            handleExternalArticlesChange={handleExternalArticlesChange}
          />
        </TabsContent>

        <TabsContent value="seo">
          <SEOHelper 
            title={formData.title || ''}
            description={formData.description || ''}
            keywords={(formData.category || '') + (formData.subCategory ? ', ' + formData.subCategory : '')}
            onUpdate={handleSEOUpdate}
          />
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default CalculatorEditorForm;
