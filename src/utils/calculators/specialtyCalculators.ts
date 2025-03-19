
import { LayoutGrid, Clock, Home } from 'lucide-react';
import { Calculator } from '../calculatorTypes';

export const specialtyCalculators: Calculator[] = [
  {
    id: 'parking-lot',
    title: 'Parking Lot Calculator',
    description: 'Plan your parking lot with precise measurements for asphalt quantity, striping, and drainage requirements.',
    longDescription: 'Design efficient parking lots with our comprehensive calculator. Determine the maximum number of parking spaces based on your dimensions and space configuration. Calculate asphalt quantities, striping length, landscaping areas, and lighting requirements. Includes ADA-compliant handicap space recommendations and total cost estimates.',
    icon: LayoutGrid,
    category: 'Specialty',
    timeEstimate: '3 min',
    fields: [
      {
        id: 'lotLength',
        label: 'Lot Length',
        type: 'number',
        placeholder: '100',
        defaultValue: 100,
        required: true,
        unit: 'feet',
        min: 20,
        helperText: 'The length of the parking lot area'
      },
      {
        id: 'lotWidth',
        label: 'Lot Width',
        type: 'number',
        placeholder: '50',
        defaultValue: 50,
        required: true,
        unit: 'feet',
        min: 20,
        helperText: 'The width of the parking lot area'
      },
      {
        id: 'parkingType',
        label: 'Parking Type',
        type: 'select',
        required: true,
        defaultValue: 'standard',
        options: [
          { value: 'standard', label: 'Standard (90°)' },
          { value: 'compact', label: 'Compact' },
          { value: 'angled', label: 'Angled (45°)' }
        ],
        helperText: 'Type and orientation of parking spaces'
      },
      {
        id: 'includeHandicap',
        label: 'Include Handicap Spaces',
        type: 'checkbox',
        defaultValue: true,
        helperText: 'Include ADA-compliant accessible spaces'
      },
      {
        id: 'includeLandscaping',
        label: 'Include Landscaping',
        type: 'checkbox',
        defaultValue: true,
        helperText: 'Include landscaped areas within lot'
      },
      {
        id: 'includeLighting',
        label: 'Include Lighting',
        type: 'checkbox',
        defaultValue: false,
        helperText: 'Include lighting installation'
      }
    ]
  },
  {
    id: 'project-timeline',
    title: 'Project Timeline Estimator',
    description: 'Estimate project duration based on scope, crew size, equipment availability, and weather conditions.',
    longDescription: 'Plan your construction schedule with our project timeline estimator. Get realistic timeframes for project completion based on project type, size, crew capacity, equipment level, and seasonal factors. Our calculator breaks down the project into phases and provides calendar duration estimates to help with project planning and client communications.',
    icon: Clock,
    category: 'Specialty',
    timeEstimate: '3 min',
    fields: [
      {
        id: 'projectType',
        label: 'Project Type',
        type: 'select',
        required: true,
        defaultValue: 'parking-lot',
        options: [
          { value: 'parking-lot', label: 'Parking Lot' },
          { value: 'roadway', label: 'Roadway/Street' },
          { value: 'driveway', label: 'Driveway' },
          { value: 'sidewalk', label: 'Sidewalk' },
          { value: 'subdivision', label: 'Subdivision Development' }
        ],
        helperText: 'Type of construction project'
      },
      {
        id: 'projectSize',
        label: 'Project Size',
        type: 'number',
        placeholder: '5000',
        defaultValue: 5000,
        required: true,
        unit: 'sq ft',
        min: 100,
        helperText: 'Total area of the project'
      },
      {
        id: 'crewSize',
        label: 'Crew Size',
        type: 'number',
        placeholder: '4',
        defaultValue: 4,
        required: true,
        unit: 'workers',
        min: 1,
        max: 20,
        helperText: 'Number of workers on the crew'
      },
      {
        id: 'equipmentLevel',
        label: 'Equipment Level',
        type: 'select',
        required: true,
        defaultValue: 'standard',
        options: [
          { value: 'minimal', label: 'Minimal Equipment' },
          { value: 'standard', label: 'Standard Equipment' },
          { value: 'advanced', label: 'Advanced/Specialized Equipment' }
        ],
        helperText: 'Level of equipment available for the project'
      },
      {
        id: 'seasonalFactor',
        label: 'Seasonal Conditions',
        type: 'select',
        required: true,
        defaultValue: 'optimal',
        options: [
          { value: 'challenging', label: 'Challenging (Bad Weather)' },
          { value: 'average', label: 'Average' },
          { value: 'optimal', label: 'Optimal (Good Weather)' }
        ],
        helperText: 'Expected weather and seasonal conditions'
      },
      {
        id: 'complexityFactor',
        label: 'Project Complexity',
        type: 'select',
        required: true,
        defaultValue: 'medium',
        options: [
          { value: 'simple', label: 'Simple' },
          { value: 'medium', label: 'Medium' },
          { value: 'complex', label: 'Complex' }
        ],
        helperText: 'Complexity level of the project'
      }
    ]
  },
  {
    id: 'roofing-material',
    title: 'Roofing Material Calculator',
    description: 'Calculate the amount of shingles, underlayment, and accessories needed for your roofing project.',
    longDescription: 'Complete your roofing project with confidence using our comprehensive material calculator. Determine exact quantities of shingles, tiles, or metal panels needed based on your roof dimensions and pitch. Includes calculations for underlayment, ice barrier, drip edge, and other accessories to ensure you have all materials needed for a successful installation.',
    icon: Home,
    category: 'Specialty',
    timeEstimate: '2 min',
    fields: [
      {
        id: 'roofLength',
        label: 'Roof Length',
        type: 'number',
        placeholder: '40',
        defaultValue: 40,
        required: true,
        unit: 'feet',
        min: 10,
        helperText: 'The length of the roof area'
      },
      {
        id: 'roofWidth',
        label: 'Roof Width',
        type: 'number',
        placeholder: '30',
        defaultValue: 30,
        required: true,
        unit: 'feet',
        min: 10,
        helperText: 'The width of the roof area'
      },
      {
        id: 'pitch',
        label: 'Roof Pitch',
        type: 'number',
        placeholder: '4',
        defaultValue: 4,
        required: true,
        unit: 'in/ft',
        min: 0,
        max: 12,
        step: 0.5,
        helperText: 'Rise in inches per 12 inches of run'
      },
      {
        id: 'roofingType',
        label: 'Roofing Material',
        type: 'select',
        required: true,
        defaultValue: 'asphalt',
        options: [
          { value: 'asphalt', label: 'Asphalt Shingles' },
          { value: 'metal', label: 'Metal Panels' },
          { value: 'tile', label: 'Concrete/Clay Tiles' },
          { value: 'wood', label: 'Wood Shakes/Shingles' }
        ],
        helperText: 'Type of roofing material to use'
      },
      {
        id: 'includeIceBarrier',
        label: 'Include Ice & Water Barrier',
        type: 'checkbox',
        defaultValue: false,
        helperText: 'Include ice & water shield at eaves and valleys'
      },
      {
        id: 'hasValleys',
        label: 'Roof Has Valleys',
        type: 'checkbox',
        defaultValue: false,
        helperText: 'Roof design includes valleys'
      },
      {
        id: 'hasGables',
        label: 'Roof Has Gables',
        type: 'checkbox',
        defaultValue: true,
        helperText: 'Roof design includes gable ends'
      }
    ]
  }
];
