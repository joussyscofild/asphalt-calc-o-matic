
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Wand2 } from 'lucide-react';
import FieldItem from './FieldItem';
import { CalculatorField } from '@/utils/calculatorTypes';
import { FormData } from './types';

interface FieldsTabProps {
  formData: FormData;
  addField: () => void;
  updateField: (index: number, fieldData: Partial<CalculatorField>) => void;
  removeField: (index: number) => void;
  moveField: (index: number, direction: 'up' | 'down') => void;
  addOption: (fieldIndex: number) => void;
  updateOption: (fieldIndex: number, optionIndex: number, value: string, label: string) => void;
  removeOption: (fieldIndex: number, optionIndex: number) => void;
  generateSampleFields: () => void;
}

const FieldsTab: React.FC<FieldsTabProps> = ({
  formData,
  addField,
  updateField,
  removeField,
  moveField,
  addOption,
  updateOption,
  removeOption,
  generateSampleFields
}) => {
  return (
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
              <FieldItem 
                key={field.id}
                field={field}
                index={index}
                totalFields={formData.fields?.length || 0}
                updateField={updateField}
                removeField={removeField}
                moveField={moveField}
                addOption={addOption}
                updateOption={updateOption}
                removeOption={removeOption}
              />
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
  );
};

export default FieldsTab;
