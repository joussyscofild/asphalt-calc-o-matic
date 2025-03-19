
import { Building, Landmark } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const concreteCalculators: Calculator[] = [
  {
    id: 'concrete-volume',
    title: 'Concrete Volume Calculator',
    description: 'Calculate the precise amount of concrete needed for your foundation, slab, column, or custom-shaped projects.',
    longDescription: 'Our concrete volume calculator helps you determine exactly how much concrete you need for your project, including foundations, slabs, footings, columns, and more. It calculates cubic feet, cubic yards, and estimates how many bags of ready-mix concrete you\'ll need for smaller projects. Avoid ordering too much or too little with our precision calculations.',
    icon: Building,
    category: 'Concrete',
    timeEstimate: '1 min',
    featured: true,
    fields: [
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
      },
      {
        id: 'wasteFactor',
        label: 'Waste Factor',
        type: 'number',
        placeholder: '5',
        defaultValue: 5,
        required: true,
        unit: '%',
        min: 0,
        max: 20,
        helperText: 'Additional concrete to account for spillage and uneven surfaces'
      }
    ]
  },
  {
    id: 'retaining-wall',
    title: 'Retaining Wall Calculator',
    description: 'Estimate materials needed for your retaining wall project, including blocks, backfill, and drainage components.',
    longDescription: 'Plan your retaining wall project with our comprehensive calculator. Determine how many blocks or stones you\'ll need, plus the required base material, backfill, and drainage components. Our calculator provides quantity estimates based on wall dimensions and your selected materials to help you budget accurately and order the right supplies.',
    icon: Landmark,
    category: 'Concrete',
    timeEstimate: '2 min',
    fields: [
      {
        id: 'length',
        label: 'Wall Length',
        type: 'number',
        placeholder: '20',
        defaultValue: 20,
        required: true,
        unit: 'feet',
        min: 1,
        helperText: 'The length of the retaining wall'
      },
      {
        id: 'height',
        label: 'Wall Height',
        type: 'number',
        placeholder: '3',
        defaultValue: 3,
        required: true,
        unit: 'feet',
        min: 1,
        max: 6,
        helperText: 'The height of the retaining wall'
      },
      {
        id: 'blockType',
        label: 'Block Type',
        type: 'select',
        required: true,
        defaultValue: 'standard',
        options: [
          { value: 'standard', label: 'Standard Block' },
          { value: 'large', label: 'Large Block' },
          { value: 'natural-stone', label: 'Natural Stone' }
        ],
        helperText: 'Type of retaining wall block to use'
      },
      {
        id: 'includeBackfill',
        label: 'Include Backfill Material',
        type: 'checkbox',
        defaultValue: true,
        helperText: 'Include drainage backfill behind wall'
      },
      {
        id: 'includeDrainage',
        label: 'Include Drainage System',
        type: 'checkbox',
        defaultValue: true,
        helperText: 'Include perforated pipe and drainage gravel'
      }
    ]
  }
];
