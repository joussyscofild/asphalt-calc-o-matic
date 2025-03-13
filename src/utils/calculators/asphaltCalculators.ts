import { Navigation, Ruler } from 'lucide-react';
import { Calculator } from '@/utils/calculatorTypes';
import { HardHat } from 'lucide-react';

export const asphaltCalculators: Calculator[] = [
  {
    id: 'asphalt-tonnage',
    title: 'Asphalt Tonnage Calculator',
    description: 'Calculate the exact tonnage needed for your asphalt paving project with adjustments for density and temperature.',
    longDescription: 'Our asphalt tonnage calculator helps you determine precisely how much asphalt material is required for your paving project. It takes into account dimensions, thickness, and density to provide accurate estimates that can save you time and money by reducing waste and ensuring you order the right amount of material.',
    icon: Navigation,
    category: 'Asphalt',
    timeEstimate: '1 min',
    featured: true,
    formula: 'Tonnage = (Length × Width × Thickness × Density) ÷ 2000',
    fields: [
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
      },
      {
        id: 'costPerTon',
        label: 'Cost per Ton',
        type: 'number',
        placeholder: '100',
        defaultValue: 100,
        required: false,
        unit: '$',
        min: 0,
        helperText: 'The cost of asphalt material per ton'
      },
      {
        id: 'unitSystem',
        label: 'Unit System',
        type: 'select',
        defaultValue: 'imperial',
        required: false,
        options: [
          { value: 'imperial', label: 'Imperial (feet, inches)' },
          { value: 'metric', label: 'Metric (meters, cm)' }
        ],
        helperText: 'Choose your preferred unit system'
      }
    ],
    relatedCalculators: ['asphalt-thickness', 'paving-cost'],
    relatedArticles: ['understanding-asphalt-density', 'minimizing-material-waste']
  },
  {
    id: 'asphalt-thickness',
    title: 'Asphalt Thickness Estimator',
    description: 'Determine the optimal asphalt thickness based on traffic load, subgrade conditions, and climate factors.',
    icon: Ruler,
    category: 'Asphalt',
    timeEstimate: '2 min',
    fields: [
      {
        id: 'trafficLoad',
        label: 'Traffic Load',
        type: 'select',
        required: true,
        options: [
          { value: 'light', label: 'Light (Residential)' },
          { value: 'medium', label: 'Medium (Commercial)' },
          { value: 'heavy', label: 'Heavy (Industrial)' }
        ],
        helperText: 'The expected traffic volume and weight'
      },
      {
        id: 'subgradeType',
        label: 'Subgrade Type',
        type: 'select',
        required: true,
        options: [
          { value: 'poor', label: 'Poor (Clay, Silt)' },
          { value: 'fair', label: 'Fair (Sandy Clay)' },
          { value: 'good', label: 'Good (Gravel, Sand)' }
        ],
        helperText: 'The type of soil beneath the pavement'
      },
      {
        id: 'climate',
        label: 'Climate Zone',
        type: 'select',
        required: true,
        options: [
          { value: 'cold', label: 'Cold (Freeze-Thaw Cycles)' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'hot', label: 'Hot (High Temperatures)' }
        ],
        helperText: 'The climate conditions of the project location'
      }
    ]
  },
  {
    id: 'asphalt-calculator',
    title: 'Asphalt Tonnage Calculator',
    description: 'Calculate the amount of asphalt needed for your paving project in tons, and estimate costs.',
    longDescription: 'This calculator helps you determine the amount of asphalt needed for your paving project in tons, cubic feet, or cubic yards. It also estimates the cost based on the current price per ton of asphalt in your area. Perfect for contractors, project managers, and DIY enthusiasts planning paving projects.',
    icon: HardHat,
    category: 'Asphalt',
    subCategory: 'Tonnage',
    timeEstimate: '1 min',
    featured: true,
    formula: 'Volume (cu ft) = Length (ft) × Width (ft) × Thickness (in) ÷ 12\nWeight (tons) = Volume (cu ft) × Density (lb/cu ft) ÷ 2000\nCost = Weight (tons) × Cost per ton',
    fields: [
      {
        id: 'length',
        label: 'Length',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        required: true,
        unit: 'feet',
        min: 1,
        helperText: 'The length of the area to be paved'
      },
      {
        id: 'width',
        label: 'Width',
        type: 'number',
        placeholder: '10',
        defaultValue: 10,
        required: true,
        unit: 'feet',
        min: 1,
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
        min: 0.5,
        max: 8,
        step: 0.25,
        helperText: 'The thickness of the asphalt layer'
      },
      {
        id: 'density',
        label: 'Asphalt Density',
        type: 'number',
        placeholder: '145',
        defaultValue: 145,
        required: true,
        unit: 'lbs/cubic foot',
        min: 100,
        max: 170,
        helperText: 'The density of the asphalt mix (typically 140-150 lbs/cubic foot)'
      },
      {
        id: 'costPerTon',
        label: 'Cost per Ton',
        type: 'number',
        placeholder: '100',
        defaultValue: 100,
        required: true,
        unit: '$',
        min: 50,
        max: 300,
        step: 5,
        helperText: 'The cost of asphalt per ton in your area'
      }
    ],
    tags: ['asphalt', 'tonnage', 'paving', 'quantity', 'cost'],
    relatedCalculators: ['asphalt-volume', 'asphalt-coverage']
  }
];
