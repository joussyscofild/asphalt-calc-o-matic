
import { CalculatorResults } from '@/components/calculator/CalculatorForm';
import { calculateAsphalt } from './calculatorFunctions/asphaltCalculator';

// Default calculator function for calculators that don't have a custom implementation
export const calculateDefault = (formData: Record<string, any>): CalculatorResults => {
  console.log("Using default calculator with data:", formData);
  
  // Generic calculation that simply returns the inputs
  const results = Object.entries(formData).map(([key, value]) => {
    return {
      label: key,
      value: String(value),
      description: `Input value for ${key}`
    };
  });
  
  return {
    results,
    recommendations: [
      {
        text: 'Default calculation performed. For more accurate results, implement a specific calculator function.',
        type: 'info'
      }
    ]
  };
};

// Map calculator IDs to their respective calculation functions
export const calculatorFunctions: Record<string, (formData: Record<string, any>) => CalculatorResults> = {
  // Add custom calculator functions here
  'asphalt-calculator': calculateAsphalt,
  'asphalt-tonnage': calculateAsphalt // For backward compatibility
};

// Function to get the appropriate calculator function by ID
export const getCalculatorFunction = (calculatorId: string) => {
  console.log(`Getting calculator function for: ${calculatorId}`);
  return calculatorFunctions[calculatorId] || calculateDefault;
};

// Function to get default fields for a calculator if not defined in the calculator object
export const getDefaultFields = (calculatorId: string) => {
  console.log(`Getting default fields for: ${calculatorId}`);
  // Add default fields for specific calculators here
  if (calculatorId === 'asphalt-calculator') {
    return [
      {
        id: 'length',
        label: 'Length',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        required: true,
        unit: 'feet',
        min: 1
      },
      {
        id: 'width',
        label: 'Width',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        required: true,
        unit: 'feet',
        min: 1
      },
      {
        id: 'thickness',
        label: 'Thickness',
        type: 'number',
        placeholder: '2',
        defaultValue: 2,
        required: true,
        unit: 'inches',
        min: 0.5,
        step: 0.25
      },
      {
        id: 'density',
        label: 'Asphalt Density',
        type: 'number',
        placeholder: '145',
        defaultValue: 145,
        required: true,
        unit: 'lbs/cubic foot',
        min: 100
      },
      {
        id: 'costPerTon',
        label: 'Cost per Ton',
        type: 'number',
        placeholder: '100',
        defaultValue: 100,
        required: true,
        unit: '$',
        min: 50
      }
    ];
  }
  
  // Default fields if no specific fields are defined
  return [
    {
      id: 'input1',
      label: 'Input 1',
      type: 'number',
      required: true
    },
    {
      id: 'input2',
      label: 'Input 2',
      type: 'number',
      required: true
    }
  ];
};
