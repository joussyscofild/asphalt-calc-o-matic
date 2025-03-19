
import { CalculatorResults } from '@/components/calculator/CalculatorForm';
import { calculateAsphalt, calculateAsphaltThickness } from './calculatorFunctions/asphaltCalculator';
import { calculateConcreteVolume, calculateRetainingWall } from './calculatorFunctions/concreteCalculator';
import { calculatePavingCost, calculateMaterialWaste } from './calculatorFunctions/costCalculator';
import { calculateEarthworkExcavation } from './calculatorFunctions/earthworkCalculator';
import { calculateMaterialConversion, calculateSlopeGrade } from './calculatorFunctions/measurementCalculator';
import { calculateParkingLot, calculateProjectTimeline, calculateRoofingMaterial } from './calculatorFunctions/specialtyCalculator';

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
  // Asphalt calculators
  'asphalt-calculator': calculateAsphalt,
  'asphalt-tonnage': calculateAsphalt, // For backward compatibility
  'asphalt-thickness': calculateAsphaltThickness,
  
  // Concrete calculators
  'concrete-volume': calculateConcreteVolume,
  'retaining-wall': calculateRetainingWall,
  
  // Cost calculators
  'paving-cost': calculatePavingCost,
  'material-waste': calculateMaterialWaste,
  
  // Earthwork calculators
  'earthwork-excavation': calculateEarthworkExcavation,
  
  // Measurement calculators
  'material-conversion': calculateMaterialConversion,
  'slope-grade': calculateSlopeGrade,
  
  // Specialty calculators
  'parking-lot': calculateParkingLot,
  'project-timeline': calculateProjectTimeline,
  'roofing-material': calculateRoofingMaterial
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
  switch (calculatorId) {
    case 'asphalt-calculator':
    case 'asphalt-tonnage':
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
      
    case 'asphalt-thickness':
      return [
        {
          id: 'trafficLoad',
          label: 'Traffic Load',
          type: 'select',
          required: true,
          defaultValue: 'light',
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
          defaultValue: 'fair',
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
          defaultValue: 'moderate',
          options: [
            { value: 'cold', label: 'Cold (Freeze-Thaw Cycles)' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'hot', label: 'Hot (High Temperatures)' }
          ],
          helperText: 'The climate conditions of the project location'
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
          id: 'depth',
          label: 'Depth',
          type: 'number',
          placeholder: '4',
          defaultValue: 4,
          required: true,
          unit: 'inches',
          min: 1,
          step: 0.25
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
          max: 20
        }
      ];
      
    case 'retaining-wall':
      return [
        {
          id: 'length',
          label: 'Wall Length',
          type: 'number',
          placeholder: '20',
          defaultValue: 20,
          required: true,
          unit: 'feet',
          min: 1
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
          max: 6
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
      ];
      
    case 'paving-cost':
      return [
        {
          id: 'area',
          label: 'Project Area',
          type: 'number',
          placeholder: '1000',
          defaultValue: 1000,
          required: true,
          unit: 'sq ft',
          min: 100
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
      ];
      
    case 'material-waste':
      return [
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
      ];
      
    case 'earthwork-excavation':
      return [
        {
          id: 'length',
          label: 'Length',
          type: 'number',
          placeholder: '20',
          defaultValue: 20,
          required: true,
          unit: 'feet',
          min: 1
        },
        {
          id: 'width',
          label: 'Width',
          type: 'number',
          placeholder: '20',
          defaultValue: 20,
          required: true,
          unit: 'feet',
          min: 1
        },
        {
          id: 'depth',
          label: 'Depth',
          type: 'number',
          placeholder: '3',
          defaultValue: 3,
          required: true,
          unit: 'feet',
          min: 0.5,
          step: 0.5
        },
        {
          id: 'soilType',
          label: 'Soil Type',
          type: 'select',
          required: true,
          defaultValue: 'loam',
          options: [
            { value: 'sand', label: 'Sand' },
            { value: 'loam', label: 'Loam' },
            { value: 'clay', label: 'Clay' },
            { value: 'gravel', label: 'Gravel' },
            { value: 'topsoil', label: 'Topsoil' },
            { value: 'rock', label: 'Rock/Hard Pan' }
          ],
          helperText: 'Type of soil being excavated'
        },
        {
          id: 'hasSwell',
          label: 'Include Swell Factor',
          type: 'checkbox',
          defaultValue: true,
          helperText: 'Account for volume increase after excavation'
        },
        {
          id: 'hasShrink',
          label: 'Include Shrink Factor',
          type: 'checkbox',
          defaultValue: false,
          helperText: 'Account for volume decrease after compaction'
        },
        {
          id: 'needsCompaction',
          label: 'Requires Compaction',
          type: 'checkbox',
          defaultValue: false,
          helperText: 'Material will be compacted after placement'
        }
      ];
      
    case 'material-conversion':
      return [
        {
          id: 'quantity',
          label: 'Quantity',
          type: 'number',
          placeholder: '10',
          defaultValue: 10,
          required: true,
          min: 0.1,
          step: 0.1
        },
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
            { value: 'sand', label: 'Sand' },
            { value: 'topsoil', label: 'Topsoil' }
          ],
          helperText: 'Type of material to convert'
        },
        {
          id: 'fromUnit',
          label: 'From Unit',
          type: 'select',
          required: true,
          defaultValue: 'cubic_yards',
          options: [
            { value: 'cubic_yards', label: 'Cubic Yards' },
            { value: 'cubic_feet', label: 'Cubic Feet' },
            { value: 'tons', label: 'Tons' },
            { value: 'square_feet', label: 'Square Feet (area)' }
          ],
          helperText: 'Starting unit of measurement'
        },
        {
          id: 'toUnit',
          label: 'To Unit',
          type: 'select',
          required: true,
          defaultValue: 'tons',
          options: [
            { value: 'tons', label: 'Tons' },
            { value: 'cubic_yards', label: 'Cubic Yards' },
            { value: 'cubic_feet', label: 'Cubic Feet' },
            { value: 'square_feet', label: 'Square Feet (area)' }
          ],
          helperText: 'Target unit of measurement'
        }
      ];
      
    case 'slope-grade':
      return [
        {
          id: 'inputMethod',
          label: 'Input Method',
          type: 'select',
          required: true,
          defaultValue: 'rise_run',
          options: [
            { value: 'rise_run', label: 'Rise and Run' },
            { value: 'angle', label: 'Angle' },
            { value: 'percent', label: 'Percent Grade' }
          ],
          helperText: 'Choose how you want to specify the slope'
        },
        {
          id: 'rise',
          label: 'Rise (Vertical Height)',
          type: 'number',
          placeholder: '1',
          defaultValue: 1,
          required: true,
          unit: 'units',
          min: 0,
          step: 0.1,
          helperText: 'Vertical change in height'
        },
        {
          id: 'run',
          label: 'Run (Horizontal Distance)',
          type: 'number',
          placeholder: '12',
          defaultValue: 12,
          required: true,
          unit: 'units',
          min: 0.1,
          step: 0.1,
          helperText: 'Horizontal distance'
        },
        {
          id: 'angle',
          label: 'Angle',
          type: 'number',
          placeholder: '5',
          defaultValue: 5,
          required: true,
          unit: 'degrees',
          min: 0,
          max: 90,
          step: 0.1,
          helperText: 'Angle from horizontal in degrees'
        },
        {
          id: 'percent',
          label: 'Percent Grade',
          type: 'number',
          placeholder: '8.33',
          defaultValue: 8.33,
          required: true,
          unit: '%',
          min: 0,
          step: 0.01,
          helperText: 'Slope expressed as a percentage'
        },
        {
          id: 'horizontalDistance',
          label: 'Horizontal Distance',
          type: 'number',
          placeholder: '100',
          defaultValue: 100,
          required: true,
          unit: 'units',
          min: 0.1,
          helperText: 'Length of the horizontal component'
        },
        {
          id: 'applicationType',
          label: 'Application Type',
          type: 'select',
          required: false,
          defaultValue: 'general',
          options: [
            { value: 'general', label: 'General Purpose' },
            { value: 'driveway', label: 'Driveway' },
            { value: 'drainage', label: 'Drainage/Runoff' },
            { value: 'ramp', label: 'ADA Ramp' },
            { value: 'retaining', label: 'Retaining Wall' }
          ],
          helperText: 'Intended use of the slope calculation'
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
          min: 20
        },
        {
          id: 'lotWidth',
          label: 'Lot Width',
          type: 'number',
          placeholder: '50',
          defaultValue: 50,
          required: true,
          unit: 'feet',
          min: 20
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
      ];
      
    case 'project-timeline':
      return [
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
          min: 100
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
          max: 20
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
      ];
      
    case 'roofing-material':
      return [
        {
          id: 'roofLength',
          label: 'Roof Length',
          type: 'number',
          placeholder: '40',
          defaultValue: 40,
          required: true,
          unit: 'feet',
          min: 10
        },
        {
          id: 'roofWidth',
          label: 'Roof Width',
          type: 'number',
          placeholder: '30',
          defaultValue: 30,
          required: true,
          unit: 'feet',
          min: 10
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
