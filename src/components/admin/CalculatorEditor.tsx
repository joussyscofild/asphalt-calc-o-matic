
import React, { useState } from 'react';
import { Calculator, type CalculatorField } from '../../utils/calculators';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, MoveVertical, Calculator as CalcIcon, Edit, Settings, Wand2 } from 'lucide-react';
import SEOHelper from './SEOHelper';
import RichTextEditor from './RichTextEditor';
import { useToast } from "@/components/ui/use-toast";
import { categories } from '../../utils/calculators';

interface CalculatorEditorProps {
  calculator?: Calculator;
  onSave: (calculator: Calculator) => void;
  onCancel: () => void;
}

const CalculatorEditor: React.FC<CalculatorEditorProps> = ({ 
  calculator,
  onSave,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();
  const isNew = !calculator?.id;

  const [formData, setFormData] = useState<Partial<Calculator>>({
    id: calculator?.id || '',
    title: calculator?.title || '',
    description: calculator?.description || '',
    longDescription: calculator?.longDescription || '',
    category: calculator?.category || 'Asphalt',
    timeEstimate: calculator?.timeEstimate || '1 min',
    featured: calculator?.featured || false,
    formula: calculator?.formula || '',
    fields: calculator?.fields || [],
    icon: calculator?.icon,
    relatedCalculators: calculator?.relatedCalculators || [],
    relatedArticles: calculator?.relatedArticles || [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRichTextChange = (content: string) => {
    setFormData(prev => ({ ...prev, longDescription: content }));
  };

  const handleSEOUpdate = (data: {title: string, description: string, keywords: string}) => {
    setFormData(prev => ({ 
      ...prev, 
      title: data.title,
      description: data.description
    }));
    
    // Convert keywords to tags or related content as needed
    const keywordArray = data.keywords.split(',').map(k => k.trim());
    if (keywordArray.length > 0) {
      setFormData(prev => ({ ...prev, subCategory: keywordArray[0] }));
    }
  };

  // Field management
  const addField = () => {
    const newField: CalculatorField = {
      id: `field-${Date.now()}`,
      label: 'New Field',
      type: 'number',
      required: true
    };
    
    setFormData(prev => ({
      ...prev,
      fields: [...(prev.fields || []), newField]
    }));
  };

  const updateField = (index: number, fieldData: Partial<CalculatorField>) => {
    const updatedFields = [...(formData.fields || [])];
    updatedFields[index] = { ...updatedFields[index], ...fieldData };
    
    setFormData(prev => ({
      ...prev,
      fields: updatedFields
    }));
  };

  const removeField = (index: number) => {
    const updatedFields = [...(formData.fields || [])];
    updatedFields.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      fields: updatedFields
    }));
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    if (!formData.fields) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.fields.length) return;
    
    const updatedFields = [...formData.fields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[newIndex];
    updatedFields[newIndex] = temp;
    
    setFormData(prev => ({
      ...prev,
      fields: updatedFields
    }));
  };

  // Option management for select/radio fields
  const addOption = (fieldIndex: number) => {
    const field = formData.fields?.[fieldIndex];
    if (!field) return;
    
    const options = [...(field.options || [])];
    options.push({ value: `option-${options.length + 1}`, label: `Option ${options.length + 1}` });
    
    updateField(fieldIndex, { options });
  };

  const updateOption = (fieldIndex: number, optionIndex: number, value: string, label: string) => {
    const field = formData.fields?.[fieldIndex];
    if (!field || !field.options) return;
    
    const options = [...field.options];
    options[optionIndex] = { value, label };
    
    updateField(fieldIndex, { options });
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const field = formData.fields?.[fieldIndex];
    if (!field || !field.options) return;
    
    const options = [...field.options];
    options.splice(optionIndex, 1);
    
    updateField(fieldIndex, { options });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.id || !formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (ID, Title, Description).",
        variant: "destructive",
      });
      return;
    }

    // Generate ID from title if not provided
    const calculatorId = formData.id || formData.title.toLowerCase().replace(/\s+/g, '-');
    
    // Generate a complete calculator object
    const completedCalculator: Calculator = {
      id: calculatorId,
      title: formData.title || '',
      description: formData.description || '',
      longDescription: formData.longDescription,
      icon: formData.icon || CalcIcon,
      category: formData.category || 'Asphalt',
      timeEstimate: formData.timeEstimate || '1 min',
      featured: formData.featured || false,
      formula: formData.formula,
      fields: formData.fields,
      relatedCalculators: formData.relatedCalculators,
      relatedArticles: formData.relatedArticles,
    };
    
    onSave(completedCalculator);
    toast({
      title: isNew ? "Calculator Created" : "Calculator Updated",
      description: `Calculator "${completedCalculator.title}" has been ${isNew ? 'created' : 'updated'} successfully.`,
    });
  };

  const generateSampleFields = () => {
    // Generate appropriate fields based on category
    let sampleFields: CalculatorField[] = [];
    
    if (formData.category?.toLowerCase().includes('asphalt')) {
      sampleFields = [
        {
          id: 'length',
          label: 'Length',
          type: 'number',
          placeholder: '100',
          defaultValue: 100,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The length of the area to be paved'
        },
        {
          id: 'width',
          label: 'Width',
          type: 'number',
          placeholder: '20',
          defaultValue: 20,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The width of the area to be paved'
        },
        {
          id: 'thickness',
          label: 'Thickness',
          type: 'number',
          placeholder: '2',
          defaultValue: 2,
          required: true,
          unit: 'inches',
          min: 0,
          step: 0.25,
          helperText: 'The desired thickness of the asphalt layer'
        }
      ];
    } else if (formData.category?.toLowerCase().includes('concrete')) {
      sampleFields = [
        {
          id: 'length',
          label: 'Length',
          type: 'number',
          placeholder: '10',
          defaultValue: 10,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The length of the concrete area'
        },
        {
          id: 'width',
          label: 'Width',
          type: 'number',
          placeholder: '10',
          defaultValue: 10,
          required: true,
          unit: 'feet',
          min: 0,
          helperText: 'The width of the concrete area'
        },
        {
          id: 'depth',
          label: 'Depth',
          type: 'number',
          placeholder: '4',
          defaultValue: 4,
          required: true,
          unit: 'inches',
          min: 0,
          step: 0.25,
          helperText: 'The depth of the concrete slab'
        }
      ];
    } else if (formData.category?.toLowerCase().includes('cost')) {
      sampleFields = [
        {
          id: 'area',
          label: 'Area',
          type: 'number',
          placeholder: '1000',
          defaultValue: 1000,
          required: true,
          unit: 'sq. ft.',
          min: 0,
          helperText: 'The total area of the project'
        },
        {
          id: 'materialCost',
          label: 'Material Cost',
          type: 'number',
          placeholder: '2.5',
          defaultValue: 2.5,
          required: true,
          unit: '$ per sq. ft.',
          min: 0,
          step: 0.1,
          helperText: 'The cost of materials per square foot'
        },
        {
          id: 'laborCost',
          label: 'Labor Cost',
          type: 'number',
          placeholder: '1.75',
          defaultValue: 1.75,
          required: true,
          unit: '$ per sq. ft.',
          min: 0,
          step: 0.1,
          helperText: 'The cost of labor per square foot'
        }
      ];
    } else {
      // Default fields
      sampleFields = [
        {
          id: 'input1',
          label: 'Input 1',
          type: 'number',
          required: true,
          helperText: 'First input value'
        },
        {
          id: 'input2',
          label: 'Input 2',
          type: 'number',
          required: true,
          helperText: 'Second input value'
        }
      ];
    }
    
    setFormData(prev => ({
      ...prev,
      fields: sampleFields
    }));
    
    toast({
      title: "Sample Fields Generated",
      description: "Sample calculator fields have been generated based on the category.",
    });
  };

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

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  General information about the calculator
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id">ID (URL Slug) {isNew && <span className="text-red-500">*</span>}</Label>
                  <Input 
                    id="id" 
                    name="id"
                    value={formData.id} 
                    onChange={handleInputChange}
                    placeholder="calculator-id-slug"
                    disabled={!isNew}
                  />
                  <p className="text-sm text-muted-foreground">
                    Unique identifier, used in URLs. Auto-generated from title if left blank.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={formData.title} 
                    onChange={handleInputChange}
                    placeholder="Calculator Title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={formData.description} 
                    onChange={handleInputChange}
                    placeholder="Brief description of what the calculator does"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    defaultValue={formData.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.label}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeEstimate">Time Estimate</Label>
                  <Select 
                    defaultValue={formData.timeEstimate} 
                    onValueChange={(value) => handleSelectChange('timeEstimate', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Time to complete" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 sec">30 seconds</SelectItem>
                      <SelectItem value="1 min">1 minute</SelectItem>
                      <SelectItem value="2 min">2 minutes</SelectItem>
                      <SelectItem value="3 min">3 minutes</SelectItem>
                      <SelectItem value="5 min">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Featured Calculator</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Long Description</CardTitle>
                <CardDescription>
                  Detailed description that will be shown on the calculator page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RichTextEditor 
                  initialValue={formData.longDescription || ''} 
                  onChange={handleRichTextChange}
                  minHeight="200px"
                  placeholder="Enter detailed description of how to use the calculator..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fields" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Calculator Fields</CardTitle>
                <CardDescription>
                  Define the input fields for your calculator
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateSampleFields}
                  className="text-xs flex items-center gap-1"
                >
                  <Wand2 size={14} />
                  Generate Sample Fields
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={addField}
                  className="text-xs flex items-center gap-1"
                >
                  <PlusCircle size={14} />
                  Add Field
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {formData.fields && formData.fields.length > 0 ? (
                <div className="space-y-4">
                  {formData.fields.map((field, index) => (
                    <Card key={field.id} className="border-dashed">
                      <CardHeader className="flex flex-row items-start justify-between py-3">
                        <div className="flex items-center">
                          <CardTitle className="text-base flex items-center">
                            Field: {field.label} 
                            {field.required && (
                              <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                            )}
                          </CardTitle>
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => moveField(index, 'up')}
                            disabled={index === 0}
                            className="h-7 w-7 p-0"
                          >
                            <MoveVertical size={14} className="rotate-180" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => moveField(index, 'down')}
                            disabled={index === (formData.fields?.length || 0) - 1}
                            className="h-7 w-7 p-0"
                          >
                            <MoveVertical size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeField(index)}
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Field ID</Label>
                            <Input 
                              value={field.id} 
                              onChange={(e) => updateField(index, { id: e.target.value })}
                              placeholder="field-id"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Label</Label>
                            <Input 
                              value={field.label} 
                              onChange={(e) => updateField(index, { label: e.target.value })}
                              placeholder="Field Label"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Select 
                              defaultValue={field.type} 
                              onValueChange={(value) => updateField(index, { 
                                type: value as 'number' | 'select' | 'radio' | 'checkbox'
                              })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Field type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="select">Select (Dropdown)</SelectItem>
                                <SelectItem value="radio">Radio Buttons</SelectItem>
                                <SelectItem value="checkbox">Checkbox</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Unit (if applicable)</Label>
                            <Input 
                              value={field.unit || ''} 
                              onChange={(e) => updateField(index, { unit: e.target.value })}
                              placeholder="e.g., feet, inches, etc."
                            />
                          </div>
                        </div>

                        {(field.type === 'number') && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label>Default Value</Label>
                              <Input 
                                type="number"
                                value={field.defaultValue || ''} 
                                onChange={(e) => updateField(index, { 
                                  defaultValue: e.target.value ? Number(e.target.value) : undefined 
                                })}
                                placeholder="Default value"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Min Value</Label>
                              <Input 
                                type="number"
                                value={field.min || ''} 
                                onChange={(e) => updateField(index, { 
                                  min: e.target.value ? Number(e.target.value) : undefined 
                                })}
                                placeholder="Minimum value"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Max Value</Label>
                              <Input 
                                type="number"
                                value={field.max || ''} 
                                onChange={(e) => updateField(index, { 
                                  max: e.target.value ? Number(e.target.value) : undefined 
                                })}
                                placeholder="Maximum value"
                              />
                            </div>
                          </div>
                        )}

                        {(field.type === 'select' || field.type === 'radio') && (
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center">
                              <Label>Options</Label>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => addOption(index)}
                                className="text-xs"
                              >
                                Add Option
                              </Button>
                            </div>
                            {field.options && field.options.length > 0 ? (
                              <div className="space-y-2 mt-2">
                                {field.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex space-x-2 items-center">
                                    <Input 
                                      value={option.value} 
                                      onChange={(e) => updateOption(
                                        index, 
                                        optIndex, 
                                        e.target.value, 
                                        option.label
                                      )}
                                      placeholder="Value"
                                      className="w-1/3"
                                    />
                                    <Input 
                                      value={option.label} 
                                      onChange={(e) => updateOption(
                                        index, 
                                        optIndex, 
                                        option.value, 
                                        e.target.value
                                      )}
                                      placeholder="Label"
                                      className="w-2/3"
                                    />
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => removeOption(index, optIndex)}
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No options added yet</p>
                            )}
                          </div>
                        )}

                        <div className="mt-4 space-y-2">
                          <Label>Helper Text</Label>
                          <Textarea 
                            value={field.helperText || ''} 
                            onChange={(e) => updateField(index, { helperText: e.target.value })}
                            placeholder="Explanation text to help users understand this field"
                          />
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                          <Switch 
                            id={`${field.id}-required`}
                            checked={field.required}
                            onCheckedChange={(checked) => updateField(index, { required: checked })}
                          />
                          <Label htmlFor={`${field.id}-required`}>Required Field</Label>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <p className="text-muted-foreground mb-4">No fields added yet</p>
                  <Button onClick={addField} variant="outline">
                    Add Your First Field
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Formula</CardTitle>
                <CardDescription>
                  The mathematical formula used by this calculator
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Textarea 
                    id="formula" 
                    name="formula"
                    value={formData.formula || ''} 
                    onChange={handleInputChange}
                    placeholder="e.g., Area = Length × Width"
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    This will be displayed to users for reference
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Content</CardTitle>
                <CardDescription>
                  Link to other calculators and blog posts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Related Calculators (comma separated IDs)</Label>
                  <Input 
                    name="relatedCalculators"
                    value={formData.relatedCalculators?.join(', ') || ''} 
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      relatedCalculators: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                    }))}
                    placeholder="calculator-id-1, calculator-id-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Related Articles (comma separated IDs)</Label>
                  <Input 
                    name="relatedArticles"
                    value={formData.relatedArticles?.join(', ') || ''} 
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      relatedArticles: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                    }))}
                    placeholder="article-id-1, article-id-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
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

export default CalculatorEditor;
