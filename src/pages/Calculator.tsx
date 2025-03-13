
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calculator as CalcIcon, Info } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { fetchCalculators } from '@/utils/calculatorService';
import { Calculator as CalculatorType } from '@/utils/calculatorTypes';
import { useToast } from '@/hooks/use-toast';

const Calculator = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [calculator, setCalculator] = useState<CalculatorType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [result, setResult] = useState<null | string | number>(null);
  const [showingHelp, setShowingHelp] = useState<string | null>(null);
  const { toast } = useToast();

  // Load calculator details from Supabase
  useEffect(() => {
    const loadCalculator = async () => {
      setIsLoading(true);
      try {
        const calculators = await fetchCalculators();
        const found = calculators.find(calc => calc.id === id);
        
        if (found) {
          setCalculator(found);
          
          // Initialize form data with default values
          if (found.fields) {
            const initialFormData: Record<string, any> = {};
            found.fields.forEach(field => {
              if (field.defaultValue !== undefined) {
                initialFormData[field.id] = field.defaultValue;
              }
            });
            setFormData(initialFormData);
          }
        }
      } catch (error) {
        console.error('Error loading calculator:', error);
        toast({
          title: 'Error Loading Calculator',
          description: 'Could not load the calculator. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCalculator();
  }, [id, toast]);

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

  const calculateResult = () => {
    if (!calculator) return null;
    
    switch (id) {
      case 'asphalt-tonnage':
        const { length, width, thickness, density } = formData;
        if (length && width && thickness && density) {
          const thicknessInFeet = thickness / 12;
          const cubicFeet = length * width * thicknessInFeet;
          const pounds = cubicFeet * density;
          const tons = pounds / 2000;
          return tons.toFixed(2);
        }
        break;
        
      case 'paving-cost':
        const { area, materialCost, laborCost, additionalCosts } = formData;
        if (area && materialCost) {
          const materialTotal = area * materialCost;
          const laborTotal = laborCost ? area * laborCost : 0;
          const additional = additionalCosts || 0;
          const totalCost = materialTotal + laborTotal + additional;
          return totalCost.toFixed(2);
        }
        break;
        
      case 'concrete-volume':
        const concreteLength = formData.length;
        const concreteWidth = formData.width; 
        const concreteDepth = formData.depth;
        if (concreteLength && concreteWidth && concreteDepth) {
          const depthInFeet = concreteDepth / 12;
          const cubicFeet = concreteLength * concreteWidth * depthInFeet;
          const cubicYards = cubicFeet / 27;
          return cubicYards.toFixed(2);
        }
        break;
      
      case 'material-conversion':
        // Simple unit conversion from cubic yards to tons (assuming average material density)
        const { cubicYards, materialType } = formData;
        if (cubicYards && materialType) {
          // Different density factors based on material
          const densityFactors: Record<string, number> = {
            'asphalt': 2.025, // tons per cubic yard
            'concrete': 2.025,
            'gravel': 1.35,
            'sand': 1.35,
            'dirt': 1.1,
          };
          const factor = densityFactors[materialType] || 1.5; // default factor
          return (cubicYards * factor).toFixed(2);
        }
        break;
        
      case 'slope-grade':
        const { rise, run } = formData;
        if (rise && run) {
          const slopePercent = (rise / run) * 100;
          const slopeDegrees = Math.atan(rise / run) * (180 / Math.PI);
          const slopeRatio = `1:${(run / rise).toFixed(1)}`;
          return `${slopePercent.toFixed(1)}% (${slopeDegrees.toFixed(1)}°, ${slopeRatio})`;
        }
        break;
        
      case 'retaining-wall':
        const { wallLength, wallHeight, blockType } = formData;
        if (wallLength && wallHeight && blockType) {
          // Block sizes in square feet (face area)
          const blockSizes: Record<string, number> = {
            'standard': 0.5, // 8" x 9" face
            'large': 0.75,  // 12" x 9" face
            'jumbo': 1.0,   // 12" x 12" face
          };
          const blockSize = blockSizes[blockType] || 0.5;
          const wallArea = wallLength * wallHeight;
          const numberOfBlocks = Math.ceil(wallArea / blockSize);
          return numberOfBlocks.toString();
        }
        break;

      case 'parking-lot':
        const { lotLength, lotWidth, spaceType } = formData;
        if (lotLength && lotWidth && spaceType) {
          const lotArea = lotLength * lotWidth;
          // Space sizes (including driving lanes)
          const spaceAreas: Record<string, number> = {
            'standard': 300, // sq ft per car (includes driving space)
            'compact': 250,
            'accessible': 400,
          };
          const spaceArea = spaceAreas[spaceType] || 300;
          const spaces = Math.floor(lotArea / spaceArea);
          return spaces.toString();
        }
        break;

      case 'material-waste':
        const { quantity, wastePercent } = formData;
        if (quantity && wastePercent) {
          const totalNeeded = quantity * (1 + wastePercent / 100);
          const wasteMaterial = totalNeeded - quantity;
          return `${totalNeeded.toFixed(2)} (Waste: ${wasteMaterial.toFixed(2)})`;
        }
        break;
        
      default:
        return "Calculator implementation coming soon";
    }
    
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedResult = calculateResult();
    setResult(calculatedResult);
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12 text-center">
        <CalcIcon size={48} className="mx-auto animate-spin text-muted-foreground mb-4" />
        <p>Loading calculator...</p>
      </div>
    );
  }

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

  // Get default fields based on calculator type if not defined in the database
  const getDefaultFields = () => {
    switch (id) {
      case 'asphalt-tonnage':
        return [
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
          },
          {
            id: 'density',
            label: 'Unit Weight (Density)',
            type: 'number',
            placeholder: '145',
            defaultValue: 145,
            required: true,
            unit: 'lb/ft³',
            min: 100,
            max: 200,
            helperText: 'Standard hot-mix asphalt is typically 145-150 lb/ft³'
          }
        ];
      case 'paving-cost':
        return [
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
        ];
      case 'concrete-volume':
        return [
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
      case 'material-conversion':
        return [
          {
            id: 'cubicYards',
            label: 'Cubic Yards',
            type: 'number',
            placeholder: '10',
            defaultValue: 10,
            required: true,
            unit: 'yd³',
            min: 0,
            helperText: 'Volume in cubic yards'
          },
          {
            id: 'materialType',
            label: 'Material Type',
            type: 'select',
            required: true,
            options: [
              { value: 'asphalt', label: 'Asphalt' },
              { value: 'concrete', label: 'Concrete' },
              { value: 'gravel', label: 'Gravel' },
              { value: 'sand', label: 'Sand' },
              { value: 'dirt', label: 'Dirt' }
            ],
            helperText: 'Type of material for density calculation'
          }
        ];
      case 'slope-grade':
        return [
          {
            id: 'rise',
            label: 'Rise (Vertical Height)',
            type: 'number',
            placeholder: '10',
            defaultValue: 10,
            required: true,
            unit: 'feet',
            min: 0,
            helperText: 'The vertical distance from bottom to top'
          },
          {
            id: 'run',
            label: 'Run (Horizontal Distance)',
            type: 'number',
            placeholder: '100',
            defaultValue: 100,
            required: true,
            unit: 'feet',
            min: 0,
            helperText: 'The horizontal distance from start to end'
          }
        ];
      case 'retaining-wall':
        return [
          {
            id: 'wallLength',
            label: 'Wall Length',
            type: 'number',
            placeholder: '20',
            defaultValue: 20,
            required: true,
            unit: 'feet',
            min: 0,
            helperText: 'The length of the retaining wall'
          },
          {
            id: 'wallHeight',
            label: 'Wall Height',
            type: 'number',
            placeholder: '4',
            defaultValue: 4,
            required: true,
            unit: 'feet',
            min: 0,
            helperText: 'The height of the retaining wall'
          },
          {
            id: 'blockType',
            label: 'Block Type',
            type: 'select',
            required: true,
            options: [
              { value: 'standard', label: 'Standard (8" x 9")' },
              { value: 'large', label: 'Large (12" x 9")' },
              { value: 'jumbo', label: 'Jumbo (12" x 12")' }
            ],
            helperText: 'The size of retaining wall blocks'
          }
        ];
      case 'parking-lot':
        return [
          {
            id: 'lotLength',
            label: 'Lot Length',
            type: 'number',
            placeholder: '100',
            defaultValue: 100,
            required: true,
            unit: 'feet',
            min: 0,
            helperText: 'The length of the parking lot'
          },
          {
            id: 'lotWidth',
            label: 'Lot Width',
            type: 'number',
            placeholder: '75',
            defaultValue: 75,
            required: true,
            unit: 'feet',
            min: 0,
            helperText: 'The width of the parking lot'
          },
          {
            id: 'spaceType',
            label: 'Parking Space Type',
            type: 'select',
            required: true,
            options: [
              { value: 'standard', label: 'Standard' },
              { value: 'compact', label: 'Compact' },
              { value: 'accessible', label: 'Accessible/ADA' }
            ],
            helperText: 'The type of parking spaces'
          }
        ];
      case 'material-waste':
        return [
          {
            id: 'quantity',
            label: 'Base Quantity',
            type: 'number',
            placeholder: '100',
            defaultValue: 100,
            required: true,
            unit: 'units',
            min: 0,
            helperText: 'The calculated amount needed without waste'
          },
          {
            id: 'wastePercent',
            label: 'Waste Percentage',
            type: 'number',
            placeholder: '10',
            defaultValue: 10,
            required: true,
            unit: '%',
            min: 0,
            max: 100,
            helperText: 'Percentage to add for waste (typically 5-15%)'
          }
        ];
      default:
        return [];
    }
  };

  // Default fields for calculators that don't have them defined yet
  const calculatorFields = calculator.fields?.length ? calculator.fields : getDefaultFields();

  // Create a formatted result label based on calculator type
  const getFormattedResult = () => {
    if (result === null) return null;
    
    switch (id) {
      case 'asphalt-tonnage':
        return `${result} tons`;
      case 'concrete-volume':
        return `${result} cubic yards`;
      case 'paving-cost':
        return `$${result}`;
      case 'material-conversion':
        return `${result} tons`;
      case 'slope-grade':
        return result;
      case 'retaining-wall':
        return `${result} blocks`;
      case 'parking-lot':
        return `${result} spaces`;
      case 'material-waste':
        return result;
      default:
        return result;
    }
  };

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
                  {getFormattedResult()}
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
                    return (
                      <li key={calcId}>
                        <Link 
                          to={`/calculator/${calcId}`} 
                          className="text-asphalt hover:text-safety-dark text-sm flex items-center"
                        >
                          <ArrowLeft size={12} className="mr-1" />
                          {calcId}
                        </Link>
                      </li>
                    );
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
