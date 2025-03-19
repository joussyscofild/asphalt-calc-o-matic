
import { TrendingUp, Percent } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const costCalculators: Calculator[] = [
  {
    id: 'paving-cost',
    title: 'Paving Cost Calculator',
    description: 'Estimate the total cost of your paving project including materials, labor, equipment, and other expenses.',
    longDescription: 'Our comprehensive paving cost calculator helps you budget for your asphalt, concrete, or pavers project. Get detailed breakdowns of material costs, labor, equipment, and site preparation expenses. Perfect for homeowners, contractors, and project managers planning driveways, parking lots, or pathways.',
    icon: TrendingUp,
    category: 'Cost Estimation',
    timeEstimate: '3 min',
    featured: true,
    fields: [
      {
        id: 'area',
        label: 'Project Area',
        type: 'number',
        placeholder: '1000',
        defaultValue: 1000,
        required: true,
        unit: 'sq ft',
        min: 100,
        helperText: 'Total area to be paved'
      },
      {
        id: 'pavingType',
        label: 'Paving Type',
        type: 'select',
        required: true,
        defaultValue: 'asphalt',
        options: [
          { value: 'asphalt', label: 'Asphalt' },
          { value: 'concrete', label: 'Concrete' },
          { value: 'pavers', label: 'Pavers' },
          { value: 'gravel', label: 'Gravel' }
        ],
        helperText: 'Type of paving material'
      },
      {
        id: 'thickness',
        label: 'Thickness',
        type: 'number',
        placeholder: '2',
        defaultValue: 2,
        required: true,
        unit: 'inches',
        min: 1,
        max: 8,
        step: 0.5,
        helperText: 'Thickness of paving material'
      },
      {
        id: 'preparationNeeded',
        label: 'Include Site Preparation',
        type: 'checkbox',
        defaultValue: true,
        helperText: 'Include clearing, grading, and compaction'
      },
      {
        id: 'includeDrainage',
        label: 'Include Drainage',
        type: 'checkbox',
        defaultValue: false,
        helperText: 'Include drainage system installation'
      },
      {
        id: 'includeEdging',
        label: 'Include Edging/Curbing',
        type: 'checkbox',
        defaultValue: false,
        helperText: 'Include perimeter edging or curbing'
      }
    ]
  },
  {
    id: 'material-waste',
    title: 'Material Waste Calculator',
    description: 'Estimate material waste percentage and adjust your order quantities to account for cutting, spills, and damage.',
    longDescription: 'Optimize your material ordering and reduce costs with our material waste calculator. It helps you determine how much extra material to order based on project complexity, material type, and installation conditions. Accounting for proper waste factors ensures you won\'t run short of materials mid-project while avoiding excessive leftover materials.',
    icon: Percent,
    category: 'Cost Estimation',
    timeEstimate: '2 min',
    fields: [
      {
        id: 'materialType',
        label: 'Material Type',
        type: 'select',
        required: true,
        defaultValue: 'asphalt',
        options: [
          { value: 'asphalt', label: 'Asphalt' },
          { value: 'concrete', label: 'Concrete' },
          { value: 'gravel', label: 'Gravel/Aggregate' },
          { value: 'brick', label: 'Brick/Pavers' },
          { value: 'lumber', label: 'Lumber' },
          { value: 'soil', label: 'Soil/Fill' }
        ],
        helperText: 'Type of construction material'
      },
      {
        id: 'quantity',
        label: 'Base Quantity',
        type: 'number',
        placeholder: '100',
        defaultValue: 100,
        required: true,
        min: 1,
        helperText: 'Amount needed without accounting for waste'
      },
      {
        id: 'unitOfMeasure',
        label: 'Unit of Measure',
        type: 'select',
        required: true,
        defaultValue: 'sq_ft',
        options: [
          { value: 'sq_ft', label: 'Square Feet' },
          { value: 'cubic_yards', label: 'Cubic Yards' },
          { value: 'tons', label: 'Tons' },
          { value: 'pieces', label: 'Pieces/Units' }
        ],
        helperText: 'Unit of measurement for the quantity'
      },
      {
        id: 'projectType',
        label: 'Project Type',
        type: 'select',
        required: true,
        defaultValue: 'standard',
        options: [
          { value: 'small', label: 'Small Project' },
          { value: 'standard', label: 'Standard Project' },
          { value: 'large', label: 'Large Project' }
        ],
        helperText: 'Size and scope of the project'
      },
      {
        id: 'cutComplexity',
        label: 'Cutting Complexity',
        type: 'select',
        required: true,
        defaultValue: 'simple',
        options: [
          { value: 'simple', label: 'Simple (Straight Cuts)' },
          { value: 'moderate', label: 'Moderate (Some Complex Cuts)' },
          { value: 'complex', label: 'Complex (Many Irregular Cuts)' }
        ],
        helperText: 'Complexity of cutting patterns required'
      },
      {
        id: 'workerExperience',
        label: 'Worker Experience',
        type: 'select',
        required: true,
        defaultValue: 'experienced',
        options: [
          { value: 'novice', label: 'Novice/DIY' },
          { value: 'somewhat', label: 'Somewhat Experienced' },
          { value: 'experienced', label: 'Experienced Professionals' }
        ],
        helperText: 'Experience level of the installation team'
      }
    ]
  }
];
