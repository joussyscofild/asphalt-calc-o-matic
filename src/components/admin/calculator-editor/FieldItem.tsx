
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoveVertical, Trash2 } from 'lucide-react';
import { CalculatorField } from '@/utils/calculatorTypes';

interface FieldItemProps {
  field: CalculatorField;
  index: number;
  totalFields: number;
  updateField: (index: number, fieldData: Partial<CalculatorField>) => void;
  removeField: (index: number) => void;
  moveField: (index: number, direction: 'up' | 'down') => void;
  addOption: (fieldIndex: number) => void;
  updateOption: (fieldIndex: number, optionIndex: number, value: string, label: string) => void;
  removeOption: (fieldIndex: number, optionIndex: number) => void;
}

const FieldItem: React.FC<FieldItemProps> = ({
  field,
  index,
  totalFields,
  updateField,
  removeField,
  moveField,
  addOption,
  updateOption,
  removeOption
}) => {
  return (
    <Card className="border-dashed">
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
            disabled={index === totalFields - 1}
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
                value={typeof field.defaultValue === 'number' ? field.defaultValue : ''}
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

        {(field.type === 'select' || field.type === 'radio') ? (
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
            {field.options && Array.isArray(field.options) && field.options.length > 0 ? (
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
        ) : null}

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
            checked={!!field.required}
            onCheckedChange={(checked) => updateField(index, { required: checked })}
          />
          <Label htmlFor={`${field.id}-required`}>Required Field</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldItem;
