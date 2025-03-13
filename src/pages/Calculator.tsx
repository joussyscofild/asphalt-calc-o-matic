import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCalculatorById } from '../utils/calculators';
import { ArrowLeft, Calculator as CalcIcon, Info } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

const Calculator = () => {
  const { id = '' } = useParams<{ id: string }>();
  const calculator = getCalculatorById(id);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [result, setResult] = useState<null | string | number>(null);
  const [showingHelp, setShowingHelp] = useState<string | null>(null);

  if (!calculator) {
    return (
      <div className="container-custom py-20 text-center">
        <CalcIcon size={48} className="mx-auto text-concrete mb-4" />
        <h1 className="text-2xl font-bold mb-4">Calculator Not Found</h1>
        <p className="mb-6">The calculator you're looking for doesn't exist or may have been moved.</p>
        <Link to="/calculators" className="btn-primary">
          Browse All Calculators
        </Link>
      </div>
    );
  }

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
    
    if (id === 'asphalt-tonnage' && calculator.fields) {
      const { length, width, thickness, density } = formData;
      if (length && width && thickness && density) {
        const thicknessInFeet = thickness / 12;
        const cubicFeet = length * width * thicknessInFeet;
        const pounds = cubicFeet * density;
        const tons = pounds / 2000;
        setResult(tons.toFixed(2));
      }
    } 
    else if (id === 'paving-cost' && calculator.fields) {
      const { area, materialCost, laborCost, additionalCosts } = formData;
      if (area && materialCost) {
        const materialTotal = area * materialCost;
        const laborTotal = laborCost ? area * laborCost : 0;
        const additional = additionalCosts || 0;
        const totalCost = materialTotal + laborTotal + additional;
        setResult(totalCost.toFixed(2));
      }
    }
    else if (id === 'concrete-volume' && calculator.fields) {
      const { length, width, thickness } = formData;
      if (length && width && thickness) {
        const thicknessInFeet = thickness / 12;
        const cubicFeet = length * width * thicknessInFeet;
        const cubicYards = cubicFeet / 27;
        setResult(cubicYards.toFixed(2));
      }
    }
    else {
      setResult("Calculator implementation coming soon");
    }
  };

  const calculatorFields = calculator.fields || (id === 'paving-cost' ? [
    {
      id: 'area',
      label: 'Area to Pave',
      type: 'number',
      placeholder: '1000',
      defaultValue: 1000,
      required: true,
      unit: 'sq. ft.',
      min: 0,
      helperText: 'Total area that needs to be paved'
    },
    {
      id: 'materialCost',
      label: 'Material Cost',
      type: 'number',
      placeholder: '2.50',
      defaultValue: 2.5,
      required: true,
      unit: '$ per sq. ft.',
      min: 0,
      step: 0.1,
      helperText: 'Cost of asphalt material per square foot'
    },
    {
      id: 'laborCost',
      label: 'Labor Cost',
      type: 'number',
      placeholder: '1.75',
      defaultValue: 1.75,
      required: false,
      unit: '$ per sq. ft.',
      min: 0,
      step: 0.1,
      helperText: 'Cost of labor per square foot (optional)'
    },
    {
      id: 'additionalCosts',
      label: 'Additional Costs',
      type: 'number',
      placeholder: '500',
      defaultValue: 500,
      required: false,
      unit: '$',
      min: 0,
      helperText: 'Any additional costs like equipment rental, permits, etc. (optional)'
    }
  ] : []);

  return (
    <div className="container-custom py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/calculators">Calculators</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{calculator.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-asphalt/10 text-asphalt mr-4">
                {React.createElement(calculator.icon, { size: 24 })}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-asphalt">{calculator.title}</h1>
                <p className="text-concrete-dark">{calculator.category}</p>
              </div>
            </div>

            <p className="mb-8 text-concrete-dark">{calculator.longDescription || calculator.description}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {calculatorFields.map((field) => (
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
                    <input
                      type={field.type}
                      id={field.id}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                      required={field.required}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      onChange={handleInputChange}
                      className="input-field w-full pr-16"
                    />
                    {field.unit && (
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
                  {id === 'asphalt-tonnage' && `${result} tons`}
                  {id === 'concrete-volume' && `${result} cubic yards`}
                  {id === 'paving-cost' && `$${result}`}
                  {!['asphalt-tonnage', 'concrete-volume', 'paving-cost'].includes(id) && result}
                </div>
                <p className="text-sm text-concrete-dark mt-2">
                  Based on your inputs. Results are estimates and may vary based on actual conditions.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Calculator Information</h2>
            
            {calculator.formula && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-asphalt mb-1">Formula Used:</h3>
                <div className="bg-gray-50 p-3 rounded text-concrete-dark font-mono text-sm">
                  {calculator.formula}
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-asphalt mb-1">Estimated Time:</h3>
              <p className="text-concrete-dark">{calculator.timeEstimate}</p>
            </div>
            
            {calculator.relatedCalculators && calculator.relatedCalculators.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-asphalt mb-1">Related Calculators:</h3>
                <ul className="space-y-1">
                  {calculator.relatedCalculators.map(calcId => {
                    const relatedCalc = getCalculatorById(calcId);
                    return relatedCalc ? (
                      <li key={calcId}>
                        <Link 
                          to={`/calculator/${calcId}`} 
                          className="text-asphalt hover:text-safety-dark text-sm flex items-center"
                        >
                          <ArrowLeft size={12} className="mr-1" />
                          {relatedCalc.title}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}

            <Link to="/calculators" className="btn-outline w-full text-center">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
