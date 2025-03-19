
import { useState } from 'react';
import { Calculator, CalculatorField, ExternalArticle } from '@/utils/calculatorTypes';
import { FormData } from './types';
import { useToast } from '@/components/ui/use-toast';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { Json } from '@/integrations/supabase/types';

export const useCalculatorForm = (calculator?: Calculator, onSave?: (calculator: Calculator) => void) => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();
  const isNew = !calculator?.id;

  const [formData, setFormData] = useState<FormData>({
    id: calculator?.id || '',
    title: calculator?.title || '',
    description: calculator?.description || '',
    longDescription: calculator?.longDescription || '',
    category: calculator?.category || 'Asphalt',
    timeEstimate: calculator?.timeEstimate || '1 min',
    featured: calculator?.featured || false,
    featuredImage: calculator?.featuredImage || '',
    formula: calculator?.formula || '',
    fields: calculator?.fields || [],
    icon: calculator?.icon || CalculatorIcon,
    relatedCalculators: calculator?.relatedCalculators || [],
    relatedArticles: calculator?.relatedArticles || [],
    externalArticles: calculator?.externalArticles || [],
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
    
    const keywordArray = data.keywords.split(',').map(k => k.trim());
    if (keywordArray.length > 0) {
      setFormData(prev => ({ ...prev, subCategory: keywordArray[0] }));
    }
  };

  const handleRelatedContentChange = (type: 'calculators' | 'articles', value: string) => {
    const items = value.split(',').map(s => s.trim()).filter(Boolean);
    
    if (type === 'calculators') {
      setFormData(prev => ({ ...prev, relatedCalculators: items }));
    } else {
      setFormData(prev => ({ ...prev, relatedArticles: items }));
    }
  };

  const handleExternalArticlesChange = (articles: ExternalArticle[]) => {
    setFormData(prev => ({ ...prev, externalArticles: articles }));
  };

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

  const addOption = (fieldIndex: number) => {
    const field = formData.fields?.[fieldIndex];
    if (!field) return;
    
    const currentOptions = Array.isArray(field.options) 
      ? field.options 
      : (field.options ? [] : []);
      
    const options = [...currentOptions];
    options.push({ value: `option-${options.length + 1}`, label: `Option ${options.length + 1}` });
    
    updateField(fieldIndex, { options });
  };

  const updateOption = (fieldIndex: number, optionIndex: number, value: string, label: string) => {
    const field = formData.fields?.[fieldIndex];
    if (!field || !field.options || !Array.isArray(field.options)) return;
    
    const options = [...field.options];
    options[optionIndex] = { value, label };
    
    updateField(fieldIndex, { options });
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const field = formData.fields?.[fieldIndex];
    if (!field || !field.options || !Array.isArray(field.options)) return;
    
    const options = [...field.options];
    options.splice(optionIndex, 1);
    
    updateField(fieldIndex, { options });
  };

  const generateSampleFields = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (ID, Title, Description).",
        variant: "destructive",
      });
      return;
    }

    const calculatorId = formData.id || formData.title.toLowerCase().replace(/\s+/g, '-');
    
    const completedCalculator: Calculator = {
      id: calculatorId,
      title: formData.title || '',
      description: formData.description || '',
      longDescription: formData.longDescription,
      icon: formData.icon || CalculatorIcon,
      category: formData.category || 'Asphalt',
      timeEstimate: formData.timeEstimate || '1 min',
      featured: formData.featured || false,
      featuredImage: formData.featuredImage,
      formula: formData.formula,
      fields: formData.fields,
      relatedCalculators: formData.relatedCalculators,
      relatedArticles: formData.relatedArticles,
      externalArticles: formData.externalArticles?.filter(a => a.title && a.url) || [],
    };
    
    if (onSave) {
      onSave(completedCalculator);
    }
    
    toast({
      title: isNew ? "Calculator Created" : "Calculator Updated",
      description: `Calculator "${completedCalculator.title}" has been ${isNew ? 'created' : 'updated'} successfully.`,
    });
  };

  return {
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
  };
};

export default useCalculatorForm;
