
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Copy, Printer, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { CalculatorField } from '@/utils/calculatorTypes';
import { getCalculatorFunction } from '@/utils/calculatorFunctions';
import { parseUnits } from '@/utils/unitConversion';

export interface CalculatorResultItem {
  label: string;
  value: string;
  description?: string;
  highlight?: boolean;
}

export interface CalculatorRecommendation {
  text: string;
  type: 'info' | 'warning' | 'error' | 'tip';
}

export interface CalculatorResults {
  results: CalculatorResultItem[];
  recommendations?: CalculatorRecommendation[];
}

interface CalculatorFormProps {
  calculatorId: string;
  fields: CalculatorField[];
  initialFormData?: Record<string, any>;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  calculatorId,
  fields,
  initialFormData = {}
}) => {
  const [calculationResults, setCalculationResults] = useState<CalculatorResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const form = useForm({
    defaultValues: initialFormData
  });
  
  const { handleSubmit, setValue, getValues, reset, watch } = form;
  
  // Setup form with initial values
  useEffect(() => {
    fields.forEach(field => {
      if (field.defaultValue !== undefined && initialFormData[field.id] === undefined) {
        setValue(field.id, field.defaultValue);
      }
    });
  }, [fields, initialFormData, setValue]);
  
  // Watch form values for changes
  const formValues = watch();
  
  const onSubmit = async (data: Record<string, any>) => {
    setIsCalculating(true);
    
    try {
      console.log("Calculating with data:", data);
      
      // Get the appropriate calculation function for this calculator
      const calculateFunction = getCalculatorFunction(calculatorId);
      
      // Calculate results
      const results = calculateFunction(data);
      setCalculationResults(results);
      
      console.log("Calculation results:", results);
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("Error calculating results. Please check your inputs and try again.");
    } finally {
      setIsCalculating(false);
    }
  };
  
  const handlePrint = () => {
    window.print();
    toast.success("Printing calculation results");
  };
  
  const handleShare = () => {
    // Create URL with current calculator and form values
    const url = new URL(window.location.href);
    
    // Add form values as query parameters
    Object.entries(getValues()).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    
    // Copy to clipboard
    navigator.clipboard.writeText(url.toString())
      .then(() => {
        toast.success("Link copied to clipboard! Share it with others to show this calculation.");
      })
      .catch(error => {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link to clipboard");
      });
  };
  
  const handleReset = () => {
    // Reset to default values from fields
    const defaultValues: Record<string, any> = {};
    
    fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        defaultValues[field.id] = field.defaultValue;
      }
    });
    
    reset(defaultValues);
    setCalculationResults(null);
    toast.info("Calculator has been reset to default values");
  };
  
  const renderFieldByType = (field: CalculatorField) => {
    const { id, label, type, placeholder, required, options, unit, min, max, step, helperText } = field;
    
    switch (type) {
      case 'number':
        return (
          <FormField
            key={id}
            name={id}
            control={form.control}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{label} {unit ? `(${unit})` : ''}</FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    value={formField.value || ''}
                    onChange={e => {
                      const value = e.target.value === '' ? '' : parseFloat(e.target.value);
                      formField.onChange(value);
                    }}
                    type="number"
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={step}
                    required={required}
                  />
                </FormControl>
                {helperText && <FormDescription>{helperText}</FormDescription>}
              </FormItem>
            )}
          />
        );
        
      case 'select':
        return (
          <FormField
            key={id}
            name={id}
            control={form.control}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={String(formField.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder || `Select ${label}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options && Array.isArray(options) && options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {helperText && <FormDescription>{helperText}</FormDescription>}
              </FormItem>
            )}
          />
        );
        
      case 'radio':
        return (
          <FormField
            key={id}
            name={id}
            control={form.control}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={String(formField.value)}
                    className="flex flex-col space-y-1"
                  >
                    {options && Array.isArray(options) && options.map(option => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${id}-${option.value}`} />
                        <FormLabel htmlFor={`${id}-${option.value}`} className="font-normal">
                          {option.label}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                {helperText && <FormDescription>{helperText}</FormDescription>}
              </FormItem>
            )}
          />
        );
        
      case 'checkbox':
        return (
          <FormField
            key={id}
            name={id}
            control={form.control}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                <FormControl>
                  <Checkbox
                    checked={formField.value || false}
                    onCheckedChange={formField.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{label}</FormLabel>
                  {helperText && <FormDescription>{helperText}</FormDescription>}
                </div>
              </FormItem>
            )}
          />
        );
        
      default:
        return <div key={id}>Unsupported field type: {type}</div>;
    }
  };
  
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(field => renderFieldByType(field))}
          </div>
          
          <div className="flex justify-center pt-4">
            <Button type="submit" className="px-8" disabled={isCalculating}>
              {isCalculating ? 'Calculating...' : 'Calculate'}
              {!isCalculating && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
      
      {calculationResults && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <Card className="bg-asphalt/5 border border-asphalt/10">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Calculation Results</h3>
              
              <div className="space-y-4">
                {calculationResults.results.map((result, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="text-asphalt-dark font-medium">{result.label}</div>
                      {result.description && (
                        <div className="text-sm text-concrete-dark">{result.description}</div>
                      )}
                    </div>
                    <div className={`text-xl font-bold ${result.highlight ? 'text-safety-dark' : 'text-asphalt'}`}>
                      {result.value}
                    </div>
                  </div>
                ))}
              </div>
              
              {calculationResults.recommendations && calculationResults.recommendations.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="space-y-2">
                    {calculationResults.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-safety mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-concrete-dark">{recommendation.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset Calculator
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-1 h-4 w-4" /> Print Results
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-1 h-4 w-4" /> Share Calculation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;
