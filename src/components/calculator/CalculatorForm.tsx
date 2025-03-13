
import React, { useState } from 'react';
import { CalculatorField } from '@/utils/calculatorTypes';
import { Info } from 'lucide-react';
import { calculateResult, formatCalculatorResult } from '@/utils/calculatorFunctions';

interface CalculatorFormProps {
  calculatorId: string;
  fields: CalculatorField[];
  initialFormData: Record<string, any>;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ 
  calculatorId, 
  fields, 
  initialFormData 
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
  const [result, setResult] = useState<null | string | number>(null);
  const [showingHelp, setShowingHelp] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    let parsedValue: string | number = value;
    
    if (type === 'number' && value) {
      parsedValue = parseFloat(value);
    }
    
    setFormData({
      ...formData,
      [id]: parsedValue
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedResult = calculateResult(calculatorId, formData);
    setResult(calculatedResult);
  };

  // Convert result to string to ensure it's compatible with formatCalculatorResult
  const formattedResult = result !== null ? formatCalculatorResult(String(result), calculatorId) : null;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.id} className="relative">
            <div className="flex justify-between mb-1">
              <label htmlFor={field.id} className="block text-sm font-medium text-asphalt">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.helperText && (
                <button 
                  type="button" 
                  onClick={() => setShowingHelp(showingHelp === field.id ? null : field.id)}
                  className="text-concrete hover:text-asphalt"
                  aria-label="Show help text"
                >
                  <Info size={16} />
                </button>
              )}
            </div>
            
            {showingHelp === field.id && (
              <div className="text-sm text-concrete-dark mb-2 p-2 bg-gray-50 rounded">
                {field.helperText}
              </div>
            )}

            <div className="relative">
              {field.type === 'select' ? (
                <select
                  id={field.id}
                  value={formData[field.id] || ''}
                  required={field.required}
                  onChange={handleInputChange}
                  className="input-field w-full"
                >
                  <option value="">Select {field.label}</option>
                  {Array.isArray(field.options) && field.options.map(option => (
                    <option 
                      key={option.value} 
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id] !== undefined ? formData[field.id] : ''}
                  required={field.required}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  onChange={handleInputChange}
                  className="input-field w-full pr-16"
                />
              )}
              {field.unit && field.type !== 'select' && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-concrete pointer-events-none">
                  {field.unit}
                </div>
              )}
            </div>
          </div>
        ))}

        <button type="submit" className="btn-primary w-full">
          Calculate
        </button>
      </form>

      {result !== null && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-asphalt mb-2">Result:</h3>
          <div className="text-3xl font-bold text-safety-dark">
            {formattedResult}
          </div>
          <p className="text-sm text-concrete-dark mt-2">
            Based on your inputs. Results are estimates and may vary based on actual conditions.
          </p>
        </div>
      )}
    </>
  );
};

export default CalculatorForm;
