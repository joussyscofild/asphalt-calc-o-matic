
import { Road, Ruler, Building, TrendingUp, LayoutGrid, Truck, Scale, Target, CornerUpRight, Percent, Clock, Home, Landmark, Warehouse, Gauge } from 'lucide-react';

export interface Calculator {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: any; // This is a Lucide icon component
  category: string;
  subCategory?: string;
  timeEstimate: string;
  featured?: boolean;
  formula?: string;
  fields?: CalculatorField[];
  relatedCalculators?: string[];
  relatedArticles?: string[];
}

export interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'radio' | 'checkbox';
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  options?: { value: string; label: string }[];
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
}

export const categories = [
  { id: 'asphalt', label: 'Asphalt', icon: Road },
  { id: 'concrete', label: 'Concrete', icon: Building },
  { id: 'earthwork', label: 'Earthwork', icon: Truck },
  { id: 'cost', label: 'Cost Estimation', icon: TrendingUp },
  { id: 'measurement', label: 'Measurement', icon: Ruler },
  { id: 'specialty', label: 'Specialty', icon: Target },
];

export const calculators: Calculator[] = [
  {
    id: 'asphalt-tonnage',
    title: 'Asphalt Tonnage Calculator',
    description: 'Calculate the exact tonnage needed for your asphalt paving project with adjustments for density and temperature.',
    longDescription: 'Our asphalt tonnage calculator helps you determine precisely how much asphalt material is required for your paving project. It takes into account dimensions, thickness, and density to provide accurate estimates that can save you time and money by reducing waste and ensuring you order the right amount of material.',
    icon: Road,
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
    id: 'concrete-volume',
    title: 'Concrete Volume Calculator',
    description: 'Calculate the precise amount of concrete needed for your foundation, slab, column, or custom-shaped projects.',
    icon: Building,
    category: 'Concrete',
    timeEstimate: '1 min'
  },
  {
    id: 'paving-cost',
    title: 'Paving Cost Calculator',
    description: 'Estimate the total cost of your paving project including materials, labor, equipment, and other expenses.',
    icon: TrendingUp,
    category: 'Cost Estimation',
    timeEstimate: '3 min',
    featured: true
  },
  {
    id: 'parking-lot',
    title: 'Parking Lot Calculator',
    description: 'Plan your parking lot with precise measurements for asphalt quantity, striping, and drainage requirements.',
    icon: LayoutGrid,
    category: 'Specialty',
    timeEstimate: '3 min'
  },
  {
    id: 'earthwork-excavation',
    title: 'Earthwork Excavation Calculator',
    description: 'Calculate cut and fill volumes for site preparation with adjustments for soil type and compaction.',
    icon: Truck,
    category: 'Earthwork',
    timeEstimate: '2 min'
  },
  {
    id: 'material-conversion',
    title: 'Material Conversion Calculator',
    description: 'Convert between different units and measurements for construction materials including weight, volume, and area.',
    icon: Scale,
    category: 'Measurement',
    timeEstimate: '1 min'
  },
  {
    id: 'slope-grade',
    title: 'Slope & Grade Calculator',
    description: 'Calculate slope percentage, angle, and ratio for drainage systems, ramps, and road design.',
    icon: CornerUpRight,
    category: 'Measurement',
    timeEstimate: '1 min'
  },
  {
    id: 'material-waste',
    title: 'Material Waste Calculator',
    description: 'Estimate material waste percentage and adjust your order quantities to account for cutting, spills, and damage.',
    icon: Percent,
    category: 'Cost Estimation',
    timeEstimate: '2 min'
  },
  {
    id: 'project-timeline',
    title: 'Project Timeline Estimator',
    description: 'Estimate project duration based on scope, crew size, equipment availability, and weather conditions.',
    icon: Clock,
    category: 'Specialty',
    timeEstimate: '3 min'
  },
  {
    id: 'roofing-material',
    title: 'Roofing Material Calculator',
    description: 'Calculate the amount of shingles, underlayment, and accessories needed for your roofing project.',
    icon: Home,
    category: 'Specialty',
    timeEstimate: '2 min'
  },
  {
    id: 'retaining-wall',
    title: 'Retaining Wall Calculator',
    description: 'Estimate materials needed for your retaining wall project, including blocks, backfill, and drainage components.',
    icon: Landmark,
    category: 'Concrete',
    timeEstimate: '2 min'
  }
];

export const getCalculatorById = (id: string): Calculator | undefined => {
  return calculators.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (categoryId: string): Calculator[] => {
  return calculators.filter(calc => calc.category.toLowerCase() === categoryId.toLowerCase());
};

export const getFeaturedCalculators = (): Calculator[] => {
  return calculators.filter(calc => calc.featured);
};
